import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../api/api";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/game_history");

      setHistory(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border p-5">
      <h1>
        <span className="text-orange-500 font-extrabold text-2xl">Match</span>
        <span className="text-black font-extrabold text-2xl"> History</span>{" "}
      </h1>

      <div className="mt-5">
        {history.map((match, index) => {
          return (
            <div key={index} className="border m-2 p-2">
              {/* LEFT */}
              <div>
                <h2>vs {match.opponent}</h2>

                <p>{new Date(match.time).toLocaleString()}</p>
              </div>

              {/* RIGHT */}
              <div>
                <h2></h2>
              </div>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
