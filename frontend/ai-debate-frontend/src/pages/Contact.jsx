import { useEffect, useRef } from "react";

function Contact() {
  const formRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.style.opacity = "1";
        formRef.current.style.transform = "translateY(0px) scale(1)";
      }
    }, 300);
  }, []);

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
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-80px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes floatOrb { from { transform: translateY(0px); } to { transform: translateY(-40px); } }
        @keyframes glowPulse { 0% { box-shadow: 0 0 20px #7c3aed44; } 50% { box-shadow: 0 0 50px #7c3aed99; } 100% { box-shadow: 0 0 20px #7c3aed44; } }
        input:focus, textarea:focus { outline: none; border-color: #7c3aed !important; box-shadow: 0 0 20px #7c3aed55; }
        input::placeholder, textarea::placeholder { color: #7c5aaa; }
      `}</style>

      {/* Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          borderRadius: "50%",
          background: `radial-gradient(circle, #7c3aed55, transparent)`,
          width: `${50 + i * 35}px`,
          height: `${50 + i * 35}px`,
          top: `${10 + i * 15}%`,
          left: i % 2 === 0 ? `${3 + i * 4}%` : `${72 + i * 3}%`,
          animation: `floatOrb ${3 + i}s ease-in-out infinite alternate`,
          filter: "blur(4px)",
          pointerEvents: "none"
        }}/>
      ))}

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 20px" }}>

        <p style={{
          color: "#a78bfa",
          letterSpacing: "4px",
          fontSize: "14px",
          animation: "slideInLeft 0.8s ease forwards"
        }}>GET IN TOUCH</p>

        <h1 style={{
          fontSize: "48px",
          fontWeight: "900",
          margin: "16px 0 40px",
          animation: "slideInRight 1s ease forwards",
          textShadow: "0 0 40px #7c3aed"
        }}>
          Contact <span style={{color: "#a78bfa"}}>Us</span>
        </h1>

        {/* 3D Form Card */}
        <div
          ref={formRef}
          style={{
            background: "rgba(124,58,237,0.12)",
            border: "1px solid #7c3aed77",
            borderRadius: "24px",
            padding: "40px",
            opacity: "0",
            transform: "translateY(60px) scale(0.95)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            animation: "glowPulse 3s ease-in-out infinite",
            backdropFilter: "blur(10px)",
            perspective: "1000px"
          }}>

          {[
            {label: "YOUR NAME", placeholder: "Enter your name", type: "text"},
            {label: "EMAIL ADDRESS", placeholder: "Enter your email", type: "email"},
          ].map((field, i) => (
            <div key={i} style={{marginBottom: "24px"}}>
              <label style={{
                color: "#a78bfa",
                fontSize: "12px",
                letterSpacing: "2px",
                display: "block",
                marginBottom: "8px"
              }}>{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid #7c3aed44",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  transition: "border-color 0.3s, box-shadow 0.3s"
                }}
              />
            </div>
          ))}

          <div style={{marginBottom: "32px"}}>
            <label style={{
              color: "#a78bfa",
              fontSize: "12px",
              letterSpacing: "2px",
              display: "block",
              marginBottom: "8px"
            }}>MESSAGE</label>
            <textarea
              placeholder="Write your message..."
              rows="5"
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid #7c3aed44",
                borderRadius: "12px",
                color: "white",
                fontSize: "15px",
                boxSizing: "border-box",
                resize: "none",
                transition: "border-color 0.3s, box-shadow 0.3s"
              }}
            />
          </div>

          <button
            onMouseEnter={e => {
              e.target.style.transform = "translateY(-4px) scale(1.03)";
              e.target.style.boxShadow = "0 0 50px #7c3aed";
            }}
            onMouseLeave={e => {
              e.target.style.transform = "translateY(0px) scale(1)";
              e.target.style.boxShadow = "0 0 30px #7c3aed88";
            }}
            style={{
              width: "100%",
              background: "linear-gradient(90deg, #7c3aed, #9d5cf6)",
              color: "white",
              border: "none",
              padding: "16px",
              borderRadius: "30px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 0 30px #7c3aed88",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}>
            Send Message 🚀
          </button>
        </div>

        {/* Sliding Info Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginTop: "32px"
        }}>
          {[
            {icon: "📧", label: "Email Us"},
            {icon: "💬", label: "Live Chat"},
            {icon: "📞", label: "Call Us"},
          ].map((item, i) => (
            <div
              key={i}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0px)"}
              style={{
                textAlign: "center",
                background: "rgba(124,58,237,0.1)",
                border: "1px solid #7c3aed44",
                borderRadius: "14px",
                padding: "20px",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                animation: `slideInLeft ${0.8 + i * 0.2}s ease forwards`
              }}>
              <div style={{fontSize: "28px"}}>{item.icon}</div>
              <div style={{color: "#a78bfa", fontSize: "13px", marginTop: "8px"}}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;