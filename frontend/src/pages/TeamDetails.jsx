import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamsdetailsbyid, getMatchesofTeam } from "../services/api.js";
import MatchList from "../components/matches/MatchList.jsx";
import TeamCard from "../components/teams/TeamCard.jsx";

function TeamDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [team, setTeam] = useState({});
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState("TIMED");
  const [activeView, setActiveView] = useState("matches");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const rowTeam = await getTeamsdetailsbyid(id);
        const rowMatches = await getMatchesofTeam(id, status);

        setTeam(rowTeam);
        setMatches(rowMatches);
      } catch (err) {
        setError("Unable to load team data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, status]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        {team?.crest && (
          <img
            src={team.crest}
            alt={team.name}
            style={{ width: "72px", height: "72px", objectFit: "contain" }}
          />
        )}

        <div>
          <h1 style={{ margin: 0, color: "#3f556b" }}>{team?.name}</h1>
          <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
            {team?.competition}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={() => setActiveView("matches")}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #3f556b",
            backgroundColor:
              activeView === "matches" ? "#3f556b" : "transparent",
            color: activeView === "matches" ? "#ffffff" : "#3f556b",
            cursor: "pointer",
          }}
        >
          Upcoming matches
        </button>

        <button
          type="button"
          onClick={() => setActiveView("details")}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #3f556b",
            backgroundColor:
              activeView === "details" ? "#3f556b" : "transparent",
            color: activeView === "details" ? "#ffffff" : "#3f556b",
            cursor: "pointer",
          }}
        >
          Team details
        </button>
      </div>

      {activeView === "matches" ? (
        <div>
          <MatchList matches={matches} status={status} setStatus={setStatus} />
        </div>
      ) : (
        <TeamCard team={team} />
      )}
    </div>
  );
}

export default TeamDetails;
