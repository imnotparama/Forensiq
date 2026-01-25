import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

const SuspectList = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

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
      alias: "Pickpocket King",
      status: "High Risk",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 3,
      name: "Rohit Singh",
      alias: "Night Burglar",
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
      alias: "Digital Fraudster",
      status: "Released",
      photo: "https://via.placeholder.com/80"
    }
  ];

  //  FILTER LOGIC
  const filteredSuspects = suspects.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.alias.toLowerCase().includes(query.toLowerCase())
  );

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
        background: "#23415e",
        padding: "40px"
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#ffffff" , fontSize: "70px"}}>
         Suspect Database
      </h1>

      {/*  SEARCH BAR */}
      <SearchBar query={query} setQuery={setQuery} />

      {filteredSuspects.map((s) => (
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
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
          }}
        >
          <img
            src={s.photo}
            alt={s.name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "10px",
              objectFit: "cover"
            }}
          />

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: "0 0 6px 0" }}>{s.name}</h3>
            <p style={{ margin: 0, color: "#060d15" }}>
              Alias: {s.alias}
            </p>
          </div>

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
