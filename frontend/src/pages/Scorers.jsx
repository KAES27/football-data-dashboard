import { useEffect, useState } from "react";
import { getsocers, getcompetitionBycode } from "../services/api.js";
import { useParams } from "react-router-dom";
import ScorersTable from "../components/scorers/ScorersTable.jsx"

function Scorers(){
    const [scorers,setScorers]=useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [competition,setCompetition]=useState(null);
    const {code}=useParams();

    useEffect(()=>{
        async function loadData(){
            try{
                const row_competiton = await getcompetitionBycode(code);
                const top_scorers = await getsocers(code);
                setCompetition(row_competiton[0]);
                setScorers(top_scorers);
            }catch(err){
                setError("Impossible de charger les données");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    },[code])
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 style={{
        marginTop:"30px",
        color:" #3f556b"
      }}>{competition?.name} TOP SCORERS</h1>
      <ScorersTable scorers={scorers}/>
    </div>
  );
}

export default Scorers;
