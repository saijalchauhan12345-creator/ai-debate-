import { useEffect, useRef } from "react";

function About() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px) scale(1)";
          }, i * 200);
        }
      });
    }, { threshold: 0.1 });

    cardsRef.current.forEach(card => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, []);

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
        @keyframes slideInUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatCard { 0% { transform: translateY(0px); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0px); } }
        @keyframes glowPulse { 0% { box-shadow: 0 0 20px var(--primary-color)33; } 50% { box-shadow: 0 0 40px var(--primary-color)77; } 100% { box-shadow: 0 0 20px var(--primary-color)33; } }
        @keyframes floatOrb { from { transform: translateY(0px) scale(1); } to { transform: translateY(-40px) scale(1.1); } }
      `}</style>

      {/* Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          borderRadius: "50%",
          background: `radial-gradient(circle, var(--primary-color), transparent)`,
          opacity: "var(--orb-opacity)",
          width: `${60 + i * 30}px`,
          height: `${60 + i * 30}px`,
          top: `${15 + i * 15}%`,
          left: i % 2 === 0 ? `${5 + i * 5}%` : `${70 + i * 3}%`,
          animation: `floatOrb ${3 + i}s ease-in-out infinite alternate`,
          filter: "blur(3px)",
          pointerEvents: "none"
        }}/>
      ))}

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 20px" }}>

        {/* Sliding Title */}
        <p style={{
          color: "var(--secondary-color)",
          letterSpacing: "4px",
          fontSize: "14px",
          fontWeight: "600",
          animation: "slideInLeft 0.8s ease forwards"
        }}>ABOUT US</p>

        <h1 style={{
          fontSize: "48px",
          fontWeight: "900",
          margin: "16px 0 24px",
          animation: "slideInRight 1s ease forwards",
          textShadow: "0 0 40px var(--primary-color), 0 0 80px var(--card-shadow)"
        }}>
          About <span style={{color: "var(--secondary-color)"}}>AI Debate</span>
        </h1>

        <p style={{
          color: "var(--muted-text)",
          fontSize: "17px",
          lineHeight: "1.9",
          marginBottom: "60px",
          animation: "slideInUp 1.2s ease forwards"
        }}>
          AI Debate is a platform designed to help users improve their critical thinking
          and argumentation skills by debating with an intelligent AI. Whether you're a
          student, professional, or curious mind — we help you think better.
        </p>

        {/* 3D Floating Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px"
        }}>
          {[
            {icon: "⚡", title: "Fast & Smart", desc: "AI responds instantly with well-structured arguments"},
            {icon: "🔒", title: "Safe Space", desc: "Debate freely without judgment in a secure environment"},
            {icon: "🌍", title: "Any Topic", desc: "From politics to science — debate anything you want"},
          ].map((card, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-20px) scale(1.05) rotateX(5deg)";
                e.currentTarget.style.boxShadow = "0 20px 60px var(--primary-color)88";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0px) scale(1) rotateX(0deg)";
                e.currentTarget.style.boxShadow = "0 8px 32px var(--card-shadow)";
              }}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "20px",
                padding: "32px 24px",
                textAlign: "center",
                opacity: "0",
                transform: "translateY(60px) scale(0.9)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease, opacity 0.4s ease",
                animation: `floatCard ${3 + i * 0.7}s ease-in-out ${i * 0.3}s infinite`,
                boxShadow: "0 8px 32px var(--card-shadow)",
                backdropFilter: "blur(10px)",
                perspective: "1000px"
              }}>
              <div style={{fontSize: "40px", marginBottom: "16px"}}>{card.icon}</div>
              <h3 style={{color: "var(--secondary-color)", marginBottom: "12px", fontSize: "18px"}}>{card.title}</h3>
              <p style={{color: "var(--muted-text)", fontSize: "14px", lineHeight: "1.6"}}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Sliding Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "60px",
          animation: "slideInUp 1.5s ease forwards"
        }}>
          {[
            {num: "10K+", label: "Debates Done"},
            {num: "95%", label: "Satisfaction"},
            {num: "50+", label: "Topics"},
          ].map((stat, i) => (
            <div key={i} style={{
              textAlign: "center",
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 15px var(--card-shadow)",
              animation: `glowPulse ${2 + i * 0.5}s ease-in-out infinite`
            }}>
              <div style={{fontSize: "32px", fontWeight: "900", color: "var(--secondary-color)"}}>{stat.num}</div>
              <div style={{color: "var(--muted-text)", fontSize: "13px", marginTop: "8px"}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;