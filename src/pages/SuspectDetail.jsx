import { useParams } from "react-router-dom";

const SuspectDetail = () => {
  const { id } = useParams();

  //  ALL SUSPECT DATA IN ONE PLACE
  const suspects = {
    "1": {
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
    },
    "2": {
      name: "Amit Sharma",
      alias: "Pickpocket King",
      status: "High Risk",
      age: 29,
      gender: "Male",
      height: "168 cm",
      location: "Bengaluru",
      lastSeen: "Majestic Bus Stand",
      photo: "https://via.placeholder.com/420",
      crimes: [
        "Pickpocketing – 2021",
        "Mobile Theft – 2022",
        "Repeat Offender (10+ cases)"
      ]
    },
    "3": {
      name: "Rohit Singh",
      alias: "Night Burglar",
      status: "Under Surveillance",
      age: 35,
      gender: "Male",
      height: "175 cm",
      location: "Hyderabad",
      lastSeen: "Kukatpally",
      photo: "https://via.placeholder.com/420",
      crimes: [
        "House Burglary – 2020",
        "Attempted Burglary – 2022"
      ]
    },
    "4": {
      name: "Vikram Rao",
      alias: "Armed Robber",
      status: "Arrested",
      age: 41,
      gender: "Male",
      height: "178 cm",
      location: "Mumbai",
      lastSeen: "In Police Custody",
      photo: "https://via.placeholder.com/420",
      crimes: [
        "Armed Robbery – 2018",
        "Bank Robbery – 2020",
        "Illegal Arms Possession – 2021"
      ]
    },
    "5": {
      name: "Suresh Nair",
      alias: "Digital Fraudster",
      status: "Released",
      age: 38,
      gender: "Male",
      height: "170 cm",
      location: "Kochi",
      lastSeen: "Released on Bail",
      photo: "https://via.placeholder.com/420",
      crimes: [
        "Online Banking Fraud – 2019",
        "Identity Theft – 2020"
      ]
    }
  };

  const suspect = suspects[id];

  //  IF INVALID ID
  if (!suspect) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Suspect Not Found</h2>
      </div>
    );
  }

  //  STATUS COLOR
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
        {/* TOP SECTION */}
        <div style={{ display: "flex", gap: "40px", marginBottom: "40px" }}>
          {/* IMAGE */}
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

          {/* BASIC INFO */}
          <div>
            <h1 style={{ marginBottom: "8px", color: "#020617" }}>
              {suspect.name}
            </h1>

            <p style={{ fontSize: "18px", color: "#000000" }}>
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

            <div style={{ marginTop: "30px", color: "#000000" }}>
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
            background: "#23415e",
            padding: "25px",
            borderRadius: "14px"
          }}
        >
          <h2 style={{ color: "#020617" }}>Known Crimes</h2>
          <ul style={{ marginTop: "15px" }}>
            {suspect.crimes.map((crime, index) => (
              <li key={index} style={{ marginBottom: "10px", color: "#ffffff" }}>
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
