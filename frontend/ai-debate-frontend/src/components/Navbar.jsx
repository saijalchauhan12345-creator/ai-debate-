import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-brand"
        onClick={() => handleNav("/")}
        style={{
          textShadow: theme === "dark" ? "0 0 15px rgba(124, 58, 237, 0.6)" : "none"
        }}
      >
        ⚡ AI Debate
      </div>

      <button
        className={`navbar-toggle ${menuOpen ? "open" : ""}`}
        type="button"
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <div className="navbar-links">
          <button
            type="button"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => handleNav("/")}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
            onClick={() => handleNav("/about")}
          >
            About
          </button>
          <button
            type="button"
            className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
            onClick={() => handleNav("/contact")}
          >
            Contact
          </button>
          {user && (
            <button
              type="button"
              className={`nav-link ${location.pathname === "/debate" ? "active" : ""}`}
              onClick={() => handleNav("/debate")}
            >
              Debate Arena 🚀
            </button>
          )}
        </div>

        <div className="navbar-actions">
          <button
            type="button"
            className="theme-button"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            onClick={toggleTheme}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {user ? (
            <div className="user-section">
              <span className="user-welcome">
                Welcome, <strong className="user-name">{user.name}</strong>
              </span>
              <button type="button" className="nav-primary" onClick={handleLogout}>
                Logout 🚪
              </button>
            </div>
          ) : (
            <button type="button" className="nav-primary" onClick={() => handleNav("/login")}> 
              Login 🔑
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
