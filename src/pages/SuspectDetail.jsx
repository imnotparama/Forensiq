import { useParams } from "react-router-dom";

const SuspectDetail = () => {
  const { id } = useParams();

  const suspect = {
    id,
    name: "Ravi Kumar",
    alias: "Chain Snatcher",
    status: "Wanted",
    age: 32,
    gender: "Male",
    height: "172 cm",
    location: "Chennai",
    lastSeen: "T. Nagar, Chennai",
    photo: "https://via.placeholder.com/420",
    crimes: [
      "Chain Snatching – 2022",
      "Robbery – 2023",
      "Attempted Theft – 2021"
    ]
  };

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
        background: "linear-gradient(180deg, #f1f5f9, #e2e8f0)",
        padding: "40px"
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
        }}
      >
        {/* TOP */}
        <div style={{ display: "flex", gap: "40px", marginBottom: "40px" }}>
          <img
            src={suspect.photo}
            alt={suspect.name}
            style={{
              width: "420px",
              height: "420px",
              objectFit: "cover",
              borderRadius: "16px",
              border: "3px solid #e5e7eb"
            }}
          />

          <div>
            <h1 style={{ color: "#020617", marginBottom: "8px" }}>
              {suspect.name}
            </h1>

            <p style={{ fontSize: "18px", color: "#475569" }}>
              Alias: <strong>{suspect.alias}</strong>
            </p>

            <span
              style={{
                ...statusStyle(suspect.status),
                padding: "10px 18px",
                borderRadius: "999px",
                fontWeight: "bold",
                display: "inline-block",
                marginTop: "10px"
              }}
            >
              {suspect.status}
            </span>

            <div style={{ marginTop: "30px", color: "#334155" }}>
              <p><strong>Age:</strong> {suspect.age}</p>
              <p><strong>Gender:</strong> {suspect.gender}</p>
              <p><strong>Height:</strong> {suspect.height}</p>
              <p><strong>Location:</strong> {suspect.location}</p>
              <p><strong>Last Seen:</strong> {suspect.lastSeen}</p>
            </div>
          </div>
        </div>

        {/* CRIMES */}
        <div
          style={{
            background: "#f8fafc",
            padding: "25px",
            borderRadius: "14px"
          }}
        >
          <h2 style={{ color: "#020617" }}>Known Crimes</h2>
          <ul style={{ marginTop: "15px" }}>
            {suspect.crimes.map((crime, index) => (
              <li key={index} style={{ marginBottom: "10px", color: "#334155" }}>
                {crime}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuspectDetail;
