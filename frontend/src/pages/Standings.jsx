import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStandings, getcompetitionBycode } from "../services/api.js";
import StandingsTable from "../components/standings/StandingsTable.jsx";

function Standings() {
  const { code } = useParams();

  const [standings, setStandings] = useState([]);
  const [competition, setCompetition] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const competitionData = await getcompetitionBycode(code);
        const standingsData = await getStandings(code);

        setCompetition(competitionData[0]);
        setStandings(standingsData);
      } catch (err) {
        setError("Impossible de charger les données");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [code]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 style={{
        marginTop:"30px",
        color:" #3f556b"
      }}>{competition?.name} Standings</h1>
     <StandingsTable standings={standings} />
    </div>
  );
}

export default Standings;