import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

function Register() {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(formData.name, formData.email, formData.password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/debate");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-gradient)",
      color: "var(--text-color)",
      fontFamily: "sans-serif",
      overflowY: "auto",
      position: "relative"
    }}>

      <style>{`
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-80px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes floatOrb { from { transform: translateY(0px) scale(1); } to { transform: translateY(-40px) scale(1.1); } }
        @keyframes glowPulse { 0% { box-shadow: 0 0 20px var(--primary-color)33; } 50% { box-shadow: 0 0 60px var(--primary-color)77; } 100% { box-shadow: 0 0 20px var(--primary-color)33; } }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input:focus { outline: none; border-color: var(--primary-color) !important; box-shadow: 0 0 20px var(--primary-color)55; }
        input::placeholder { color: var(--muted-text); opacity: 0.6; }
      `}</style>

      {/* Floating Orbs */}
      {[...Array(7)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          borderRadius: "50%",
          background: `radial-gradient(circle, var(--primary-color), transparent)`,
          opacity: "var(--orb-opacity)",
          width: `${50 + i * 30}px`,
          height: `${50 + i * 30}px`,
          top: `${8 + i * 13}%`,
          left: i % 2 === 0 ? `${2 + i * 4}%` : `${68 + i * 4}%`,
          animation: `floatOrb ${3 + i}s ease-in-out infinite alternate`,
          filter: "blur(4px)",
          pointerEvents: "none"
        }}/>
      ))}

      {/* Spinning Ring Decoration */}
      <div style={{
        position: "absolute",
        top: "10%",
        right: "5%",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        border: "2px solid var(--card-border)",
        animation: "spinSlow 12s linear infinite",
        pointerEvents: "none"
      }}/>
      <div style={{
        position: "absolute",
        bottom: "10%",
        left: "5%",
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        border: "2px solid var(--card-border)",
        animation: "spinSlow 8s linear infinite reverse",
        pointerEvents: "none"
      }}/>

      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "60px 20px" }}>

        {/* Sliding Title */}
        <div ref={titleRef} style={{
          textAlign: "center",
          opacity: "0",
          transform: "translateY(-40px)",
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          marginBottom: "40px"
        }}>
          <div style={{fontSize: "50px", marginBottom: "12px"}}>⚡</div>
          <p style={{color: "var(--secondary-color)", letterSpacing: "4px", fontSize: "13px", marginBottom: "10px", fontWeight: "600"}}>JOIN THE ARENA</p>
          <h1 style={{
            fontSize: "42px",
            fontWeight: "900",
            textShadow: "0 0 40px var(--primary-color), 0 0 80px var(--card-shadow)"
          }}>
            Create <span style={{color: "var(--secondary-color)"}}>Account</span>
          </h1>
        </div>

        {/* 3D Form Card */}
        <div
          ref={formRef}
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "24px",
            padding: "40px",
            opacity: "0",
            transform: "translateY(80px) scale(0.9) rotateX(10deg)",
            transition: "all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)",
            animation: "glowPulse 3s ease-in-out infinite",
            backdropFilter: "blur(10px)",
            perspective: "1000px"
          }}>
          
          <form onSubmit={handleRegister}>
            {error && (
              <div style={{ 
                color: "#ff6464", 
                background: "rgba(255,100,100,0.1)", 
                padding: "10px", 
                borderRadius: "8px", 
                marginBottom: "20px",
                textAlign: "center",
                fontWeight: "bold"
              }}>
                {error}
              </div>
            )}

            {[
              {label: "FULL NAME", placeholder: "Enter your full name", type: "text", name: "name"},
              {label: "EMAIL ADDRESS", placeholder: "Enter your email", type: "email", name: "email"},
              {label: "PASSWORD", placeholder: "Create a password", type: "password", name: "password"},
              {label: "CONFIRM PASSWORD", placeholder: "Confirm your password", type: "password", name: "confirmPassword"},
            ].map((field, i) => (
              <div key={i} style={{marginBottom: "20px", animation: `slideInLeft ${0.6 + i * 0.15}s ease forwards`}}>
                <label style={{
                  color: "var(--secondary-color)",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600"
                }}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    borderRadius: "12px",
                    color: "var(--input-text)",
                    fontSize: "15px",
                    boxSizing: "border-box",
                    transition: "border-color 0.3s, box-shadow 0.3s"
                  }}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              onMouseEnter={e => {
                if (!loading) {
                  e.target.style.transform = "translateY(-4px) scale(1.03)";
                  e.target.style.boxShadow = "0 0 60px var(--primary-color)";
                }
              }}
              onMouseLeave={e => {
                if (!loading) {
                  e.target.style.transform = "translateY(0px) scale(1)";
                  e.target.style.boxShadow = "0 0 30px var(--card-shadow)";
                }
              }}
              style={{
                width: "100%",
                background: "linear-gradient(90deg, var(--primary-color), var(--secondary-color))",
                color: "white",
                border: "none",
                padding: "16px",
                borderRadius: "30px",
                fontSize: "16px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "bold",
                marginTop: "12px",
                boxShadow: "0 0 30px var(--card-shadow)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                opacity: loading ? 0.7 : 1
              }}>
              {loading ? "Joining... ⏳" : "Join AI Debate 🚀"}
            </button>
          </form>

          <p style={{
            textAlign: "center",
            color: "var(--muted-text)",
            fontSize: "14px",
            marginTop: "20px"
          }}>
            Already have an account?{" "}
            <span 
              onClick={() => navigate("/login")}
              style={{color: "var(--secondary-color)", cursor: "pointer", textDecoration: "underline", fontWeight: "600"}}>
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;