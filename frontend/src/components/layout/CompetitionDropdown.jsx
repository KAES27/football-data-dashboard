import { Link } from "react-router-dom";



function CompetitionDropdown({ code, label, emblem, isOpen, onToggle, onClose }) {

  const items = [
    { name: "Standings", path: "standings" },
    { name: "Matches", path: "matches" },
    { name: "Scorers", path: "scorers" },
    { name: "Teams", path: "teams" },
  ];

  return (
    <div style={{ position: "relative", marginRight: "12px" }}>
      <button
        type="button"
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 10px",
          cursor: "pointer",
          border: "1px solid #ccc",
          background: "#fff",
          borderRadius: "6px",
          width:"130px",
          height:"40px"
        }}
      >
        <img
          src={emblem}
          alt={`${label} emblem`}
          style={{
            width: "20px",
            height: "20px",
            objectFit: "contain",
            flexShrink: 0,
          }}
        />
        {label}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "38px",
            left: 0,
            width: "120px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            background: "#fff",
            padding: "6px",
            zIndex: 10,
          }}
        >
          {items.map((item) => (
            <Link
              key={item.path}
              to={`/competitions/${code}/${item.path}`}
              onClick={onClose}
              style={{
                display: "block",
                padding: "8px",
                textDecoration: "none",
                color: "#222",
                borderRadius: "4px",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompetitionDropdown;
