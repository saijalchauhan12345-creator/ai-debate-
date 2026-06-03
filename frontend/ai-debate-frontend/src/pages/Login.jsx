import { useEffect, useRef, useState } from "react";
import { loginUser } from "../api";

function Login() {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.opacity = "1";
        titleRef.current.style.transform = "translateY(0px)";
      }
    }, 200);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.style.opacity = "1";
        formRef.current.style.transform = "translateY(0px) scale(1) rotateX(0deg)";
      }
    }, 500);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setMessage("");
    if (!formData.email || !formData.password) {
      setMessage("⚠️ Please fill all fields!");
      return;
    }
    setLoading(true);
    try {
      const data = await loginUser(formData.email, formData.password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess(true);
        setMessage("🎉 Login successful! Redirecting...");
        setTimeout(() => { window.location.href = "/debate"; }, 1500);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Cannot connect to server!");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      color: "white",
      fontFamily: "sans-serif",
      overflow: "hidden",
      position: "relative"
    }}>

      <style>{`
        @keyframes floatOrb { from { transform: translateY(0px); } to { transform: translateY(-40px); } }
        @keyframes glowPulse { 0% { box-shadow: 0 0 20px #7c3aed44; } 50% { box-shadow: 0 0 60px #7c3aed99; } 100% { box-shadow: 0 0 20px #7c3aed44; } }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-80px); } to { opacity: 1; transform: translateX(0); } }
        input:focus { outline: none; border-color: #7c3aed !important; box-shadow: 0 0 20px #7c3aed55; }
        input::placeholder { color: #7c5aaa; }
      `}</style>

      {/* Floating Orbs */}
      {[...Array(7)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          background: `radial-gradient(circle, #7c3aed44, transparent)`,
          width: `${50 + i * 30}px`, height: `${50 + i * 30}px`,
          top: `${8 + i * 13}%`,
          left: i % 2 === 0 ? `${2 + i * 4}%` : `${68 + i * 4}%`,
          animation: `floatOrb ${3 + i}s ease-in-out infinite alternate`,
          filter: "blur(4px)", pointerEvents: "none"
        }}/>
      ))}

      {/* Spinning Rings */}
      <div style={{
        position: "absolute", top: "10%", right: "5%",
        width: "200px", height: "200px", borderRadius: "50%",
        border: "2px solid #7c3aed33",
        animation: "spinSlow 12s linear infinite", pointerEvents: "none"
      }}/>
      <div style={{
        position: "absolute", bottom: "10%", left: "5%",
        width: "150px", height: "150px", borderRadius: "50%",
        border: "2px solid #7c3aed44",
        animation: "spinSlow 8s linear infinite reverse", pointerEvents: "none"
      }}/>

      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "80px 20px" }}>

        {/* Title */}
        <div ref={titleRef} style={{
          textAlign: "center", opacity: "0",
          transform: "translateY(-40px)",
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          marginBottom: "40px"
        }}>
          <div style={{fontSize: "50px", marginBottom: "12px"}}>🔐</div>
          <p style={{color: "#a78bfa", letterSpacing: "4px", fontSize: "13px", marginBottom: "10px"}}>WELCOME BACK</p>
          <h1 style={{fontSize: "42px", fontWeight: "900", textShadow: "0 0 40px #7c3aed"}}>
            Login to <span style={{color: "#a78bfa"}}>Arena</span>
          </h1>
        </div>

        {/* Form */}
        <div ref={formRef} style={{
          background: "rgba(124,58,237,0.12)",
          border: "1px solid #7c3aed77",
          borderRadius: "24px", padding: "40px",
          opacity: "0",
          transform: "translateY(80px) scale(0.9) rotateX(10deg)",
          transition: "all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)",
          animation: "glowPulse 3s ease-in-out infinite",
          backdropFilter: "blur(10px)"
        }}>

          {[
            {label: "EMAIL ADDRESS", placeholder: "Enter your email", type: "email", name: "email"},
            {label: "PASSWORD", placeholder: "Enter your password", type: "password", name: "password"},
          ].map((field, i) => (
            <div key={i} style={{marginBottom: "24px"}}>
              <label style={{color: "#a78bfa", fontSize: "11px", letterSpacing: "2px", display: "block", marginBottom: "8px"}}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                style={{
                  width: "100%", padding: "14px 16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid #7c3aed44",
                  borderRadius: "12px", color: "white",
                  fontSize: "15px", boxSizing: "border-box",
                  transition: "border-color 0.3s, box-shadow 0.3s"
                }}
              />
            </div>
          ))}

          {message && (
            <div style={{
              padding: "12px 16px", borderRadius: "10px", marginBottom: "16px",
              background: success ? "rgba(0,255,100,0.1)" : "rgba(255,50,50,0.1)",
              border: `1px solid ${success ? "#00ff6444" : "#ff323244"}`,
              color: success ? "#00ff64" : "#ff6464",
              fontSize: "14px", textAlign: "center"
            }}>{message}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            onMouseEnter={e => { e.target.style.transform = "translateY(-4px) scale(1.03)"; e.target.style.boxShadow = "0 0 60px #7c3aed"; }}
            onMouseLeave={e => { e.target.style.transform = "translateY(0px) scale(1)"; e.target.style.boxShadow = "0 0 30px #7c3aed88"; }}
            style={{
              width: "100%",
              background: loading ? "#4a2890" : "linear-gradient(90deg, #7c3aed, #9d5cf6)",
              color: "white", border: "none",
              padding: "16px", borderRadius: "30px",
              fontSize: "16px", cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold", marginTop: "12px",
              boxShadow: "0 0 30px #7c3aed88",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}>
            {loading ? "Logging in... ⏳" : "Enter Arena 🚀"}
          </button>

          <p style={{textAlign: "center", color: "#7c5aaa", fontSize: "14px", marginTop: "20px"}}>
            Don't have an account?{" "}
            <span
              onClick={() => window.location.href = "/register"}
              style={{color: "#a78bfa", cursor: "pointer", textDecoration: "underline"}}>
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;