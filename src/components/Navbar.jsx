import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        background: "#0f172a",
        padding: "15px",
        display: "flex",
        gap: "20px"
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Home
      </Link>

      <Link to="/suspects" style={{ color: "white", textDecoration: "none" }}>
        Suspects
      </Link>

      <Link to="/search" style={{ color: "white", textDecoration: "none" }}>
        Search
      </Link>
    </nav>
  );
};

export default Navbar;
