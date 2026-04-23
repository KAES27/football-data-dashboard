import { useEffect, useState } from "react";
import { getMatchesofcompetitions, getcompetitionBycode } from "../services/api.js";
import { useParams } from "react-router-dom";
import MatchList from "../components/matches/MatchList.jsx";

function Matches() {
  const { code } = useParams();
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState("TIMED");
  const [competition, setCompetition] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const data_competition = await getcompetitionBycode(code);
        const data_matches = await getMatchesofcompetitions(code, status);

        setCompetition(data_competition[0]);
        setMatches(data_matches);
      } catch (err) {
        setError("Impossible de charger les données");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [code, status]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{competition?.name} Programme</h1>

      <MatchList
        matches={matches}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
}

export default Matches;