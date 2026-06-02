import { useState, useEffect, useRef } from "react";
import { startDebate, sendMessage, getHistory } from "../api";

function Debate() {
  const [user, setUser] = useState(null);
  const [topic, setTopic] = useState("");
  const [debateId, setDebateId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!u || !token) { window.location.href = "/login"; return; }
    setUser(u);
    loadHistory(token);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadHistory = async (token) => {
    const data = await getHistory(token);
    if (Array.isArray(data)) setHistory(data);
  };

  const handleStart = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    const data = await startDebate(topic, token);
    if (data._id) {
      setDebateId(data._id);
      setStarted(true);
      setMessages([]);
    }
    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    const token = localStorage.getItem("token");
    const data = await sendMessage(debateId, userMsg, token);
    if (data.aiReply) {
      setMessages(prev => [...prev, { role: "ai", content: data.aiReply }]);
    }
    setLoading(false);
  };

  const handleEnd = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/debate/end", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ debateId })
    });
    const data = await res.json();
    setScore(data.score);
    setFeedback(data.feedback);
    setEnded(true);
    setLoading(false);
    loadHistory(token);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-gradient)",
      color: "var(--text-color)",
      fontFamily: "sans-serif"
    }}>

      <style>{`
        @keyframes floatOrb { from { transform: translateY(0px); } to { transform: translateY(-30px); } }
        @keyframes floatCard { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        .glass-float-panel {
          animation: floatCard 6s ease-in-out infinite;
          backdrop-filter: blur(15px);
          background: var(--card-bg) !important;
          border: 1px solid var(--card-border) !important;
          box-shadow: 0 20px 50px var(--card-shadow) !important;
          transition: all 0.3s ease;
        }
        .glass-float-panel:hover {
          box-shadow: 0 25px 60px var(--card-shadow) !important;
        }
      `}</style>

      {/* Floating Orbs */}
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{
          position: "fixed", borderRadius: "50%",
          background: `radial-gradient(circle, var(--primary-color), transparent)`,
          opacity: "var(--orb-opacity)",
          width: `${60 + i * 30}px`, height: `${60 + i * 30}px`,
          top: `${10 + i * 18}%`,
          left: i % 2 === 0 ? `${2 + i * 3}%` : `${80 + i * 3}%`,
          animation: `floatOrb ${3 + i}s ease-in-out infinite alternate`,
          filter: "blur(4px)", pointerEvents: "none", zIndex: 0
        }}/>
      ))}

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "900", textShadow: "0 0 20px var(--primary-color)" }}>
              ⚡ Debate <span style={{ color: "var(--secondary-color)" }}>Arena</span>
            </h1>
            <p style={{ color: "var(--muted-text)", fontSize: "14px", fontWeight: "600" }}>Welcome, {user?.name}!</p>
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            style={{
              background: "var(--card-bg)", color: "var(--secondary-color)",
              border: "1px solid var(--primary-color)", padding: "10px 20px",
              borderRadius: "20px", cursor: "pointer", fontWeight: "bold",
              boxShadow: "0 4px 10px var(--card-shadow)"
            }}>
            📜 History ({history.length})
          </button>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div style={{
            background: "var(--card-bg)", border: "1px solid var(--card-border)",
            borderRadius: "16px", padding: "20px", marginBottom: "24px",
            animation: "slideIn 0.4s ease",
            boxShadow: "0 10px 25px var(--card-shadow)"
          }}>
            <h3 style={{ color: "var(--secondary-color)", marginBottom: "16px", fontWeight: "bold" }}>📜 Debate History</h3>
            {history.length === 0 ? (
              <p style={{ color: "var(--muted-text)" }}>No debates yet!</p>
            ) : (
              history.map((d, i) => (
                <div key={i} style={{
                  background: "var(--card-bg)", borderRadius: "12px",
                  padding: "12px 16px", marginBottom: "10px",
                  border: "1px solid var(--card-border)",
                  display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                  <div>
                    <p style={{ fontWeight: "bold", marginBottom: "4px", color: "var(--text-color)" }}>{d.topic}</p>
                    <p style={{ color: "var(--muted-text)", fontSize: "13px" }}>{new Date(d.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ color: "var(--secondary-color)", fontWeight: "bold" }}>Score: {d.score}</p>
                    <p style={{ color: d.status === "completed" ? "#10b981" : "#ffaa00", fontSize: "12px", fontWeight: "bold" }}>{d.status}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Topic Input */}
        {!started && (
          <div style={{
            background: "var(--card-bg)", border: "1px solid var(--card-border)",
            borderRadius: "24px", padding: "40px",
            animation: "slideIn 0.6s ease",
            boxShadow: "0 10px 30px var(--card-shadow)"
          }}>
            <h2 style={{ textAlign: "center", marginBottom: "24px", fontSize: "24px", color: "var(--text-color)", fontWeight: "900" }}>
              Choose Your <span style={{ color: "var(--secondary-color)" }}>Debate Topic</span>
            </h2>

            {/* Suggested Topics */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px", justifyContent: "center" }}>
              {["AI will replace humans", "Social media is harmful", "Climate change is urgent", "Space exploration is worth it"].map((t, i) => (
                <button 
                  key={i} 
                  onClick={() => setTopic(t)} 
                  style={{
                    background: topic === t ? "var(--primary-color)" : "var(--card-bg)",
                    color: topic === t ? "white" : "var(--secondary-color)", 
                    border: "1px solid var(--primary-color)",
                    padding: "8px 16px", borderRadius: "20px",
                    cursor: "pointer", fontSize: "13px", transition: "all 0.3s"
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            <input
              placeholder="Or type your own topic..."
              value={topic}
              onChange={e => setTopic(e.target.value)}
              style={{
                width: "100%", padding: "14px 16px",
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)", borderRadius: "12px",
                color: "var(--input-text)", fontSize: "15px", boxSizing: "border-box",
                marginBottom: "20px"
              }}
            />

            <button
              onClick={handleStart}
              disabled={loading || !topic.trim()}
              style={{
                width: "100%", background: "linear-gradient(90deg, var(--primary-color), var(--secondary-color))",
                color: "white", border: "none", padding: "16px",
                borderRadius: "30px", fontSize: "16px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "bold", boxShadow: "0 0 30px var(--card-shadow)"
              }}>
              {loading ? "Starting... ⏳" : "Start Debate 🚀"}
            </button>
          </div>
        )}

        {/* Chat Area */}
        {started && !ended && (
          <div className="glass-float-panel" style={{ 
            animation: "slideIn 0.6s ease",
            borderRadius: "24px",
            padding: "24px",
            marginBottom: "24px"
          }}>
            <div style={{
              background: "var(--card-bg)", border: "1px solid var(--card-border)",
              borderRadius: "16px", padding: "14px 20px", marginBottom: "20px",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <p style={{ color: "var(--muted-text)", margin: 0, fontSize: "15px" }}>Topic: <strong style={{ color: "var(--text-color)", fontSize: "16px" }}>{topic}</strong></p>
              <button onClick={handleEnd} style={{
                background: "linear-gradient(90deg, #ef4444, #b91c1c)", color: "white",
                border: "none", padding: "10px 20px",
                borderRadius: "20px", cursor: "pointer", fontWeight: "bold",
                boxShadow: "0 0 15px rgba(239, 68, 68, 0.4)",
                transition: "transform 0.2s"
              }}
              onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}>End Debate</button>
            </div>

            {/* Messages */}
            <div style={{
              background: "var(--input-bg)", border: "1px solid var(--card-border)",
              borderRadius: "20px", padding: "20px",
              height: "400px", overflowY: "auto", marginBottom: "20px",
              boxShadow: "inset 0 4px 20px rgba(0, 0, 0, 0.2)"
            }}>
              {messages.length === 0 && (
                <p style={{ color: "var(--muted-text)", textAlign: "center", marginTop: "160px" }}>
                  Start the debate — make your first argument! 💬
                </p>
              )}
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: "16px", animation: "slideIn 0.3s ease"
                }}>
                  <div style={{
                    maxWidth: "75%", padding: "14px 20px",
                    borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                    background: msg.role === "user" ? "linear-gradient(135deg, var(--primary-color), var(--secondary-color))" : "var(--card-bg)",
                    border: msg.role === "user" ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid var(--card-border)",
                    boxShadow: msg.role === "user" ? "0 10px 25px var(--card-shadow), 0 4px 10px var(--card-shadow)" : "0 10px 30px rgba(0, 0, 0, 0.1)",
                    fontSize: "14px", lineHeight: "1.6"
                  }}>
                    <p style={{ color: msg.role === "user" ? "#e2d9f3" : "var(--secondary-color)", fontSize: "11px", marginBottom: "6px", fontWeight: "bold" }}>
                      {msg.role === "user" ? "👤 You" : "🤖 AI"}
                    </p>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "16px" }}>
                  <div style={{
                    padding: "12px 16px", borderRadius: "16px",
                    background: "var(--card-bg)", border: "1px solid var(--card-border)",
                    animation: "pulse 1s infinite", color: "var(--muted-text)"
                  }}>🤖 AI is thinking...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ display: "flex", gap: "12px" }}>
              <input
                placeholder="Type your argument..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleSend()}
                style={{
                  flex: 1, padding: "14px 16px",
                  background: "var(--input-bg)",
                  border: "1px solid var(--input-border)", borderRadius: "12px",
                  color: "var(--input-text)", fontSize: "15px"
                }}
              />
              <button
                onClick={handleSend}
                disabled={loading}
                style={{
                  background: "linear-gradient(90deg, var(--primary-color), var(--secondary-color))",
                  color: "white", border: "none",
                  padding: "14px 24px", borderRadius: "12px",
                  cursor: "pointer", fontWeight: "bold", fontSize: "16px"
                }}>🚀</button>
            </div>
          </div>
        )}

        {/* Result */}
        {ended && (
          <div style={{
            background: "var(--card-bg)", border: "1px solid var(--primary-color)",
            borderRadius: "24px", padding: "40px", textAlign: "center",
            animation: "slideIn 0.6s ease",
            boxShadow: "0 15px 40px var(--card-shadow)"
          }}>
            <div style={{ fontSize: "60px", marginBottom: "16px" }}>
              {score > 70 ? "🏆" : score > 40 ? "👍" : "📚"}
            </div>
            <h2 style={{ fontSize: "32px", fontWeight: "900", marginBottom: "8px", color: "var(--text-color)" }}>
              Debate <span style={{ color: "var(--secondary-color)" }}>Complete!</span>
            </h2>
            <div style={{
              fontSize: "64px", fontWeight: "900", color: "var(--secondary-color)",
              textShadow: "0 0 30px var(--primary-color)", margin: "20px 0"
            }}>{score}<span style={{ fontSize: "24px" }}>/100</span></div>
            <p style={{ color: "var(--muted-text)", fontSize: "18px", marginBottom: "32px" }}>{feedback}</p>
            <button
              onClick={() => { setStarted(false); setEnded(false); setTopic(""); setMessages([]); setScore(null); }}
              style={{
                background: "linear-gradient(90deg, var(--primary-color), var(--secondary-color))",
                color: "white", border: "none", padding: "16px 40px",
                borderRadius: "30px", fontSize: "16px",
                cursor: "pointer", fontWeight: "bold",
                boxShadow: "0 0 30px var(--card-shadow)"
              }}>
              New Debate 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Debate;