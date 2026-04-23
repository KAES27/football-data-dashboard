import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import {
  getcompetitionBycode,
  getTeamsByCompetition,
} from "../services/api.js";
import TeamList from "../components/teams/TeamList.jsx";

function Teams() {
  const { code } = useParams();
  const [competition, setCompetition] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [competitionData, teamsData] = await Promise.all([
          getcompetitionBycode(code),
          getTeamsByCompetition(code),
        ]);

        setCompetition(competitionData[0]);
        setTeams(teamsData);
      } catch (err) {
        setError("Unable to load teams.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [code]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "24px", color: "#3f556b" }}>
        {competition?.name} Teams
      </h1>

      <TeamList teams={teams}/>
    </div>
  );
}

export default Teams;
