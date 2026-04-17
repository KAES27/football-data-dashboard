import CardMatch from "./CardMatch";
import "./matches.css";


function MatchList({matches,onToggle,isOpen,onFiltre,day,changeinput}){
    return(
        <div className="matches-wrap">
            <div className="filter-controls">
            <div className="filter-wrap">
            <button
            type="button"
            onClick={onToggle}
            className="filter-button"
            >filtre</button>
            
            {isOpen && (
        <div
          className="filter-dropdown"
        >
          <button type="button" onClick={() => onFiltre(undefined)} className="filter-option">all</button>
          <button type="button" onClick={() => onFiltre("FINISHED")} className="filter-option">finished</button>
          <button type="button" onClick={() => onFiltre("TIMED")} className="filter-option">timed</button>
        </div>
        
      )}
      </div>
        <input 
        type="text"
        className="filter-day"
        placeholder="Journee ex: 10"
        value={day}
        onChange={changeinput}></input>
      </div>
        <CardMatch matches={matches}
            dayfiltre={day}/>
        </div>
        
       
    );
}
export default MatchList;
