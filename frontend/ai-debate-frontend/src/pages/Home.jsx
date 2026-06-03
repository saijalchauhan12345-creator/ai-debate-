import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      if (containerRef.current) {
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      color: "white",
      fontFamily: "sans-serif",
      overflow: "hidden",
      position: "relative",
      perspective: "1000px"
    }}>

      {/* Floating Orbs */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="orb"
          style={{
            position: "absolute",
            borderRadius: "50%",
            background: `radial-gradient(circle, #7c3aed88, transparent)`,
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            top: `${10 + i * 12}%`,
            left: `${5 + i * 13}%`,
            animation: `float${i % 3} ${3 + i}s ease-in-out infinite alternate`,
            filter: "blur(2px)",
            pointerEvents: "none"
          }}
        />
      ))}

      <style>{`
        @keyframes float0 { from { transform: translateY(0px) scale(1); } to { transform: translateY(-30px) scale(1.1); } }
        @keyframes float1 { from { transform: translateY(0px) rotate(0deg); } to { transform: translateY(-20px) rotate(20deg); } }
        @keyframes float2 { from { transform: translateY(0px) scale(1.1); } to { transform: translateY(-40px) scale(0.9); } }
        @keyframes cardFloat { from { transform: translateY(0px); } to { transform: translateY(-10px); } }
      `}</style>

      {/* Main 3D Content */}
      <div ref={containerRef} style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "80px 20px",
        textAlign: "center",
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out"
      }}>

        <p style={{color: "#a78bfa", letterSpacing: "4px", fontSize: "14px", marginBottom: "16px", transform: "translateZ(40px)"}}>
          WELCOME TO THE FUTURE
        </p>

        <h1 style={{
          fontSize: "60px",
          fontWeight: "900",
          marginBottom: "24px",
          lineHeight: "1.2",
          transform: "translateZ(60px)",
          textShadow: "0 0 40px #7c3aed, 0 0 80px #7c3aed55"
        }}>
          AI Debate <span style={{color: "#a78bfa"}}>Arena</span>
        </h1>

        <p style={{
          fontSize: "18px",
          color: "#c4b5fd",
          marginBottom: "40px",
          lineHeight: "1.8",
          transform: "translateZ(30px)"
        }}>
          Practice debates with AI, improve your thinking,<br/>
          and challenge ideas in a structured way.
        </p>

        <div style={{display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", transform: "translateZ(50px)"}}>
          <button
            style={{
              background: "#7c3aed",
              color: "white",
              border: "none",
              padding: "14px 36px",
              borderRadius: "30px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 0 30px #7c3aed, 0 0 60px #7c3aed55",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onClick={() => navigate("/debate")}
            onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >
            🚀 Start Debate
          </button>
          <button
            style={{
              background: "transparent",
              color: "#a78bfa",
              border: "2px solid #7c3aed",
              padding: "14px 36px",
              borderRadius: "30px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "transform 0.2s"
            }}
            onClick={() => navigate("/about")}
            onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >
            Learn More
          </button>
        </div>

        {/* 3D Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
          marginTop: "80px",
          transform: "translateZ(20px)"
        }}>
          {[
            {icon: "🧠", title: "Debate AI", desc: "Engage in structured debates with intelligent AI opponents"},
            {icon: "📈", title: "Improve Thinking", desc: "Sharpen your logic, reasoning and critical thinking skills"},
            {icon: "🎯", title: "Get Feedback", desc: "Understand your strengths and areas to improve"},
          ].map((card, i) => (
            <div key={i}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-15px) scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0px) scale(1)"}
              style={{
                background: "rgba(124,58,237,0.15)",
                border: "1px solid #7c3aed88",
                borderRadius: "16px",
                padding: "32px 24px",
                textAlign: "center",
                animation: `cardFloat ${2 + i * 0.5}s ease-in-out infinite alternate`,
                transition: "transform 0.3s ease, box-shadow 0.3s",
                boxShadow: "0 8px 32px #7c3aed33",
                backdropFilter: "blur(10px)"
              }}>
              <div style={{fontSize: "40px", marginBottom: "16px"}}>{card.icon}</div>
              <h3 style={{color: "#a78bfa", marginBottom: "12px", fontSize: "18px"}}>{card.title}</h3>
              <p style={{color: "#c4b5fd", fontSize: "14px", lineHeight: "1.6"}}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;