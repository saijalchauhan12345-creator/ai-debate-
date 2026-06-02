import { useEffect, useRef, useState } from "react";

function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.style.opacity = "1";
        formRef.current.style.transform = "translateY(0px) scale(1)";
      }
    }, 300);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-gradient)",
      color: "var(--text-color)",
      fontFamily: "sans-serif",
      overflow: "hidden",
      position: "relative"
    }}>

      <style>{`
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-80px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes floatOrb { from { transform: translateY(0px); } to { transform: translateY(-40px); } }
        @keyframes glowPulse { 0% { box-shadow: 0 0 20px var(--primary-color)33; } 50% { box-shadow: 0 0 50px var(--primary-color)77; } 100% { box-shadow: 0 0 20px var(--primary-color)33; } }
        @keyframes floatModal { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        input:focus, textarea:focus { outline: none; border-color: var(--primary-color) !important; box-shadow: 0 0 20px var(--primary-color)55; }
        input::placeholder, textarea::placeholder { color: var(--muted-text); opacity: 0.6; }
      `}</style>

      {/* Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          borderRadius: "50%",
          background: `radial-gradient(circle, var(--primary-color), transparent)`,
          opacity: "var(--orb-opacity)",
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
          color: "var(--secondary-color)",
          letterSpacing: "4px",
          fontSize: "14px",
          fontWeight: "600",
          animation: "slideInLeft 0.8s ease forwards"
        }}>GET IN TOUCH</p>

        <h1 style={{
          fontSize: "48px",
          fontWeight: "900",
          margin: "16px 0 40px",
          animation: "slideInRight 1s ease forwards",
          textShadow: "0 0 40px var(--primary-color)"
        }}>
          Contact <span style={{color: "var(--secondary-color)"}}>Us</span>
        </h1>

        {/* Success Modal Overlay */}
        {submitted && (
          <div style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "2px solid #10b981",
            borderRadius: "16px",
            padding: "16px 20px",
            color: "#10b981",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "24px",
            animation: "floatModal 0.4s ease forwards",
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.2)",
            backdropFilter: "blur(5px)"
          }}>
            🚀 Message sent successfully! We will get back to you soon.
          </div>
        )}

        {/* 3D Form Card */}
        <div
          ref={formRef}
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "24px",
            padding: "40px",
            opacity: "0",
            transform: "translateY(60px) scale(0.95)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            animation: "glowPulse 3s ease-in-out infinite",
            backdropFilter: "blur(10px)",
            perspective: "1000px"
          }}>

          <form onSubmit={handleSubmit}>
            {[
              {label: "YOUR NAME", placeholder: "Enter your name", type: "text", name: "name"},
              {label: "EMAIL ADDRESS", placeholder: "Enter your email", type: "email", name: "email"},
            ].map((field, i) => (
              <div key={i} style={{marginBottom: "24px"}}>
                <label style={{
                  color: "var(--secondary-color)",
                  fontSize: "12px",
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

            <div style={{marginBottom: "32px"}}>
              <label style={{
                color: "var(--secondary-color)",
                fontSize: "12px",
                letterSpacing: "2px",
                display: "block",
                marginBottom: "8px",
                fontWeight: "600"
              }}>MESSAGE</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="5"
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
                  resize: "none",
                  transition: "border-color 0.3s, box-shadow 0.3s"
                }}
              />
            </div>

            <button
              type="submit"
              onMouseEnter={e => {
                e.target.style.transform = "translateY(-4px) scale(1.03)";
                e.target.style.boxShadow = "0 0 50px var(--primary-color)";
              }}
              onMouseLeave={e => {
                e.target.style.transform = "translateY(0px) scale(1)";
                e.target.style.boxShadow = "0 0 30px var(--card-shadow)";
              }}
              style={{
                width: "100%",
                background: "linear-gradient(90deg, var(--primary-color), var(--secondary-color))",
                color: "white",
                border: "none",
                padding: "16px",
                borderRadius: "30px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 0 30px var(--card-shadow)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
            >
              Send Message 🚀
            </button>
          </form>
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
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 10px 20px var(--primary-color)33";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "none";
              }}
              style={{
                textAlign: "center",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "14px",
                padding: "20px",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                animation: `slideInLeft ${0.8 + i * 0.2}s ease forwards`
              }}>
              <div style={{fontSize: "28px"}}>{item.icon}</div>
              <div style={{color: "var(--secondary-color)", fontSize: "13px", marginTop: "8px", fontWeight: "600"}}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;