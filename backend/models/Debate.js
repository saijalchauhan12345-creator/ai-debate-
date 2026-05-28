const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'ai'], required: true },
  content: { type: String, required: true },
});

const DebateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String, required: true },
  messages: [MessageSchema],
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  score: { type: Number },
  feedback: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Debate', DebateSchema);
