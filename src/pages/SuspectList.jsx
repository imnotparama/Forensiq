import { useNavigate } from "react-router-dom";

const SuspectList = () => {
  const navigate = useNavigate();

  const suspects = [
    {
      id: 1,
      name: "Ravi Kumar",
      alias: "Chain Snatcher",
      status: "Wanted",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 2,
      name: "Amit Sharma",
      alias: "Pickpocket",
      status: "High Risk",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 3,
      name: "Rohit Singh",
      alias: "Burglar",
      status: "Under Surveillance",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 4,
      name: "Vikram Rao",
      alias: "Armed Robber",
      status: "Arrested",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 5,
      name: "Suresh Nair",
      alias: "Fraudster",
      status: "Released",
      photo: "https://via.placeholder.com/80"
    }
  ];

  const statusStyle = (status) => {
    switch (status) {
      case "Wanted":
        return { background: "#fee2e2", color: "#991b1b" };
      case "High Risk":
        return { background: "#ffedd5", color: "#9a3412" };
      case "Under Surveillance":
        return { background: "#fef9c3", color: "#854d0e" };
      case "Arrested":
        return { background: "#dcfce7", color: "#166534" };
      case "Released":
        return { background: "#e5e7eb", color: "#374151" };
      default:
        return {};
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "40px"
      }}
    >
      <h1 style={{ marginBottom: "25px", color: "#0f172a" }}>
         SUSPECT DATABASE 
      </h1>

      {suspects.map((s) => (
        <div
          key={s.id}
          onClick={() => navigate(`/suspects/${s.id}`)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            background: "#ffffff",
            padding: "16px",
            marginBottom: "16px",
            borderRadius: "14px",
            cursor: "pointer",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            transition: "transform 0.15s ease"
          }}
        >
          {/* PHOTO */}
          <img
            src={s.photo}
            alt={s.name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "10px",
              objectFit: "cover",
              border: "2px solid #e5e7eb"
            }}
          />

          {/* TEXT */}
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: "0 0 6px 0", color: "#020617" }}>
              {s.name}
            </h3>
            <p style={{ margin: 0, color: "#475569" }}>
              Alias: {s.alias}
            </p>
          </div>

          {/* STATUS */}
          <span
            style={{
              ...statusStyle(s.status),
              padding: "8px 14px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "bold"
            }}
          >
            {s.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SuspectList;
