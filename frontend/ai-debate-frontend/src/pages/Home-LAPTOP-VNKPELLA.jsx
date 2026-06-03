import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

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
    <div className="home-hero">

      {/* Floating Orbs */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="orb" aria-hidden="true" style={{
          position: "absolute",
          borderRadius: "50%",
          background: `radial-gradient(circle, var(--primary-color), transparent)`,
          opacity: "var(--orb-opacity)",
          width: `${80 + i * 40}px`,
          height: `${80 + i * 40}px`,
          top: `${10 + i * 12}%`,
          left: `${5 + i * 13}%`,
          animation: `float${i % 3} ${3 + i}s ease-in-out infinite alternate`,
          filter: "blur(2px)",
          pointerEvents: "none"
        }}/>
      ))}

      <style>{`
        @keyframes float0 { from { transform: translateY(0px) scale(1); } to { transform: translateY(-30px) scale(1.1); } }
        @keyframes float1 { from { transform: translateY(0px) rotate(0deg); } to { transform: translateY(-20px) rotate(20deg); } }
        @keyframes float2 { from { transform: translateY(0px) scale(1.1); } to { transform: translateY(-40px) scale(0.9); } }
        @keyframes cardFloat { from { transform: translateY(0px); } to { transform: translateY(-10px); } }
      `}</style>

      <div ref={containerRef} className="hero-content">
        <p className="hero-subheading">WELCOME TO THE FUTURE</p>

        <h1 className="hero-heading">
          AI Debate <span style={{color: "var(--secondary-color)"}}>Arena</span>
        </h1>

        <p className="hero-description">
          Practice debates with AI, improve your thinking,<br/>
          and challenge ideas in a structured way.
        </p>

        <div className="hero-actions">
          <button 
            onClick={() => navigate("/debate")}
            className="hero-button primary"
            onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >
            🚀 Start Debate
          </button>
          <button 
            onClick={() => navigate("/about")}
            className="hero-button secondary"
            onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >
            Learn More
          </button>
        </div>

        <div className="hero-cards">
          {[
            {icon: "🧠", title: "Debate AI", desc: "Engage in structured debates with intelligent AI opponents"},
            {icon: "📈", title: "Improve Thinking", desc: "Sharpen your logic, reasoning and critical thinking skills"},
            {icon: "🎯", title: "Get Feedback", desc: "Understand your strengths and areas to improve"},
          ].map((card, i) => (
            <div key={i}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-15px) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 15px 40px var(--primary-color)44";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0px) scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 32px var(--card-shadow)";
              }}
              className="hero-card"
            >
              <div className="hero-card-icon">{card.icon}</div>
              <h3 className="hero-card-title">{card.title}</h3>
              <p className="hero-card-text">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;