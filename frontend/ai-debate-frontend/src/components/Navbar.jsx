import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav style={{ background: "linear-gradient(90deg, #0f0c29, #302b63, #24243e)", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #7c3aed" }}>
      <h1 onClick={() => navigate("/")} style={{ color: "#a78bfa", fontSize: "24px", fontWeight: "bold", letterSpacing: "2px", cursor: "pointer" }}>
        ⚡ AI Debate
      </h1>

      <div style={{ display: "flex", gap: "30px" }}>
        <button type="button" onClick={() => navigate("/")} style={{ background: "transparent", border: "none", color: "#e2d9f3", textDecoration: "none", fontWeight: "500", cursor: "pointer" }}>
          Home
        </button>
        <button type="button" onClick={() => navigate("/about")} style={{ background: "transparent", border: "none", color: "#e2d9f3", textDecoration: "none", fontWeight: "500", cursor: "pointer" }}>
          About
        </button>
        <button type="button" onClick={() => navigate("/contact")} style={{ background: "transparent", border: "none", color: "#e2d9f3", textDecoration: "none", fontWeight: "500", cursor: "pointer" }}>
          Contact
        </button>
      </div>

      <button
        onClick={() => navigate("/login")}
        style={{ background: "#7c3aed", color: "white", border: "none", padding: "10px 24px", borderRadius: "25px", cursor: "pointer", fontWeight: "bold" }}
      >
        Login
      </button>
    </nav>
  );
}

export default Navbar;