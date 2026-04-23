import { useState } from "react";
import CardMatch from "./CardMatch";
import "./matches.css";

function MatchList({ matches, status, setStatus }) {
  const [openDropdownCode, setOpenDropdownCode] = useState(false);
  const [query, setQuery] = useState("");

  function onToggle() {
    setOpenDropdownCode((prev) => !prev);
  }

  function onFiltre(filtre) {
    setStatus(filtre);
    setOpenDropdownCode(false);
  }

  function changeinput(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="matches-wrap">
      <div className="filter-controls">
        <div className="filter-wrap">
          <button
            type="button"
            onClick={onToggle}
            className="filter-button"
          >
            filter
          </button>

          {openDropdownCode && (
            <div className="filter-dropdown">
              <button
                type="button"
                onClick={() => onFiltre(undefined)}
                className="filter-option"
              >
                all
              </button>

              <button
                type="button"
                onClick={() => onFiltre("FINISHED")}
                className="filter-option"
              >
                finished
              </button>

              <button
                type="button"
                onClick={() => onFiltre("TIMED")}
                className="filter-option"
              >
                timed
              </button>
            </div>
          )}
        </div>

        <input
          type="text"
          className="filter-day"
          placeholder="Matchday e.g. 10"
          value={query}
          onChange={changeinput}
        />
      </div>

      <CardMatch matches={matches} dayfiltre={query} />
    </div>
  );
}

export default MatchList;
