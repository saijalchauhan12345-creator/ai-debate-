import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Auth Session Check
    const token = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (token && u) {
      setUser(JSON.parse(u));
    } else {
      setUser(null);
    }
  }, [location]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav style={{
      background: "var(--nav-bg)",
      backdropFilter: "blur(12px)",
      padding: "16px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid var(--nav-border)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      fontFamily: "sans-serif"
    }}>
      <div 
        onClick={() => navigate("/")} 
        style={{
          color: "var(--secondary-color)", 
          fontSize: "24px", 
          fontWeight: "bold", 
          letterSpacing: "2px", 
          cursor: "pointer", 
          display: "flex", 
          alignItems: "center", 
          gap: "8px",
          textShadow: theme === "dark" ? "0 0 15px rgba(124, 58, 237, 0.6)" : "none"
        }}
      >
        ⚡ AI Debate
      </div>
      <div style={{display: "flex", gap: "30px", alignItems: "center"}}>
        <span 
          onClick={() => navigate("/")} 
          style={{color: location.pathname === "/" ? "var(--active-link)" : "var(--text-color)", textDecoration: "none", fontWeight: "500", cursor: "pointer"}}
        >
          Home
        </span>
        <span 
          onClick={() => navigate("/about")} 
          style={{color: location.pathname === "/about" ? "var(--active-link)" : "var(--text-color)", textDecoration: "none", fontWeight: "500", cursor: "pointer"}}
        >
          About
        </span>
        <span 
          onClick={() => navigate("/contact")} 
          style={{color: location.pathname === "/contact" ? "var(--active-link)" : "var(--text-color)", textDecoration: "none", fontWeight: "500", cursor: "pointer"}}
        >
          Contact
        </span>
        {user && (
          <span 
            onClick={() => navigate("/debate")} 
            style={{
              color: location.pathname === "/debate" ? "var(--active-link)" : "var(--text-color)", 
              textDecoration: "none", 
              fontWeight: "700", 
              cursor: "pointer", 
              textShadow: theme === "dark" ? "0 0 10px var(--primary-color)" : "none"
            }}
          >
            Debate Arena 🚀
          </span>
        )}
      </div>
      
      <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
        {/* Sleek Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          onMouseEnter={e => {
            e.target.style.transform = "scale(1.15) rotate(15deg)";
            e.target.style.background = "rgba(124, 58, 237, 0.25)";
          }}
          onMouseLeave={e => {
            e.target.style.transform = "scale(1) rotate(0deg)";
            e.target.style.background = "rgba(124, 58, 237, 0.15)";
          }}
          style={{
            background: "rgba(124, 58, 237, 0.15)",
            border: "1px solid var(--card-border)",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease"
          }}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {user ? (
          <div style={{display: "flex", alignItems: "center", gap: "16px"}}>
            <span style={{color: "var(--muted-text)", fontSize: "14px", fontWeight: "600"}}>
              Welcome, <strong style={{color: "var(--text-color)"}}>{user.name}</strong>
            </span>
            <button 
              onClick={handleLogout}
              onMouseEnter={e => {
                e.target.style.transform = "translateY(-2px) scale(1.05)";
                e.target.style.boxShadow = "0 6px 20px rgba(239, 68, 68, 0.5)";
              }}
              onMouseLeave={e => {
                e.target.style.transform = "translateY(0px) scale(1)";
                e.target.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.3)";
              }}
              style={{
                background: "linear-gradient(90deg, #ef4444, #b91c1c)",
                color: "white",
                border: "none",
                padding: "10px 24px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                transition: "all 0.3s ease"
              }}
            >
              Logout 🚪
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate("/login")}
            onMouseEnter={e => {
              e.target.style.transform = "translateY(-2px) scale(1.05)";
              e.target.style.boxShadow = "0 6px 20px var(--card-shadow)";
            }}
            onMouseLeave={e => {
              e.target.style.transform = "translateY(0px) scale(1)";
              e.target.style.boxShadow = "0 4px 12px var(--card-shadow)";
            }}
            style={{
              background: "linear-gradient(90deg, var(--primary-color), var(--secondary-color))",
              color: "white",
              border: "none",
              padding: "10px 24px",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 12px var(--card-shadow)",
              transition: "all 0.3s ease"
            }}
          >
            Login 🔑
          </button>
        )}
      </div>
    </nav>
  );
}
export default Navbar;