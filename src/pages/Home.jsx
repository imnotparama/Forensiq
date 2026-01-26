import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f172a, #1e293b)",
        padding: "50px",
        color: "white"
      }}
    >
      {/* HEADER */}
      <h1 style={{ marginBottom: "10px" }}>
         CRIME INTEL SYSTEM
      </h1>
      <p style={{ marginBottom: "40px", color: "#cbd5f5" }}>
        Select a module to continue
      </p>

      {/* TABS SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          maxWidth: "800px"
        }}
      >
        {/* SUSPECT TAB */}
        <div
          onClick={() => navigate("/suspects")}
          style={{
            background: "#ffffff",
            color: "#020617",
            padding: "30px",
            borderRadius: "16px",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            transition: "transform 0.2s ease"
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>👤 Suspects</h2>
          <p style={{ color: "#475569" }}>
            View criminal and suspect records
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
