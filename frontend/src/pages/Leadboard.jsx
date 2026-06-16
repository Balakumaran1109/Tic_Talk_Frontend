import React, { useEffect, useState } from "react";
import { api } from "../api/api";

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);

      const response = await api.get("/leaderboard");

      setPlayers(response.data);
    } catch (err) {
      console.error(err);

      setError("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return <h2>Loading leaderboard...</h2>;
  }

  // Error State
  if (error) {
    return <h2>{error}</h2>;
  }

  // Empty State
  if (players.length === 0) {
    return <h2>No leaderboard data found</h2>;
  }

  return (
    <div>
      <h1 className="text-center text-orange-500 font-extrabold text-2xl mb-5">
        Leaderboard
      </h1>

      <div>
        <table className="border border-collapse w-full">
          <thead>
            <tr>
              <th className="border px-4 p-2">Username</th>
              <th className="border px-4 p-2">Wins</th>
              <th className="border px-4 p-2">Losses</th>
              <th className="border px-4 p-2">Total Matches</th>
              <th className="border px-4 p-2">Win Rate</th>
            </tr>
          </thead>
          {players.map((player) => (
              <tbody key={player.user_id}>
                <tr>
                  <td className="border px-4 p-2">{player.username}</td>
                  <td className="border px-4 p-2">{player.wins}</td>
                  <td className="border px-4 p-2">{player.losses}</td>
                  <td className="border px-4 p-2">{player.total_matches}</td>
                  <td className="border px-4 p-2">{player.win_rate}</td>
                </tr>
              </tbody>
          ))}{" "}
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
