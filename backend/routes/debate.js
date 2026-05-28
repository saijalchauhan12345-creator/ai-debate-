const express = require('express');
const router = express.Router();
const Debate = require('../models/Debate');
const auth = require('../middleware/auth');

router.post('/start', auth, async (req, res) => {
  try {
    const { topic } = req.body;
    const debate = new Debate({ userId: req.user.id, topic, messages: [] });
    await debate.save();
    res.status(201).json(debate);
  } catch (err) {
    res.status(500).json({ message: 'Server error!' });
  }
});

router.post('/message', auth, async (req, res) => {
  try {
    const { debateId, message } = req.body;
    const debate = await Debate.findById(debateId);
    if (!debate) return res.status(404).json({ message: 'Not found!' });
    debate.messages.push({ role: 'user', content: message });
    
    let aiReply = "Interesting point, but I need more evidence.";
    if (process.env.GEMINI_API_KEY) {
      try {
        const { GoogleGenAI } = require('@google/genai');
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        let promptStr = `You are a friendly but challenging debate opponent. The topic is "${debate.topic}". Keep your responses very short and easy to understand (1-2 sentences max). Use very simple English, and use Hinglish (a casual mix of Hindi and English) like how people chat in India. Absolutely avoid any tough, complex, or heavy vocabulary. Speak naturally and casually. Here is the conversation so far:\n`;
        debate.messages.forEach(msg => {
          promptStr += `${msg.role === 'user' ? 'Human' : 'AI'}: ${msg.content}\n`;
        });
        promptStr += `AI:`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: promptStr
        });
        aiReply = response.text;
      } catch (e) {
        console.error("Gemini API Error:", e);
        aiReply = "AI error. Please check backend logs or API Key.";
      }
    } else {
      aiReply = "[Setup Required]: Add GEMINI_API_KEY to your backend/.env to debate a real AI! For now: Interesting point, but you need more evidence.";
    }

    debate.messages.push({ role: 'ai', content: aiReply });
    await debate.save();
    res.json({ aiReply, debate });
  } catch (err) {
    res.status(500).json({ message: 'Server error!' });
  }
});

router.post('/end', auth, async (req, res) => {
  try {
    const { debateId } = req.body;
    const debate = await Debate.findById(debateId);
    if (!debate) return res.status(404).json({ message: 'Not found!' });
    const userMessages = debate.messages.filter(m => m.role === 'user');
    const score = Math.min(100, userMessages.length * 10 + 20);
    const feedback = score > 70 ? '🌟 Excellent!' : score > 40 ? '👍 Good effort!' : '📚 Keep practicing!';
    debate.status = 'completed';
    debate.score = score;
    debate.feedback = feedback;
    await debate.save();
    res.json({ score, feedback, debate });
  } catch (err) {
    res.status(500).json({ message: 'Server error!' });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const debates = await Debate.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(debates);
  } catch (err) {
    res.status(500).json({ message: 'Server error!' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const debate = await Debate.findById(req.params.id);
    res.json(debate);
  } catch (err) {
    res.status(500).json({ message: 'Server error!' });
  }
});

module.exports = router;