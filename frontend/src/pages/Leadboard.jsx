import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { FaTrophy } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);

      const response = await api.get("/leaderboard");

      const res = await api.get("/profile");

      setPlayers(response.data);
      setUserName(res.data.username);
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
    <div className="w-full border border-gray-300 rounded-md shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaTrophy size={25} className="text-orange-500" />
          <h1 className="text-black font-bold text-2xl">Leaderboard</h1>
        </div>
        <button className="flex items-center gap-2 p-2 font-bold cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-500">
          <p>View leaderboard</p>
          <FaArrowRightLong />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 p-2">Rank</th>
              <th className="border border-gray-300 px-4 p-2">Player</th>
              <th className="border border-gray-300 px-4 p-2">Wins</th>
              <th className="border border-gray-300 px-4 p-2">Losses</th>
              <th className="border border-gray-300 px-4 p-2">Total Matches</th>
              <th className="border border-gray-300 px-4 p-2">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {players?.map((player, index) => (
              <tr
                className={
                  player.username == userName
                    ? "border-l-4 border-orange-500 bg-orange-50 text-center"
                    : "text-center hover:bg-orange-100 transition-colors duration-200"
                }
                key={player.user_id}
              >
                <td className="border border-gray-300 px-4 p-2">{index + 1}</td>
                <td
                  className={
                      "border border-gray-300 px-4 p-2"
                  }
                >
                  {player.username}
                </td>
                <td className="border border-gray-300 px-4 p-2">
                  {player.wins}
                </td>
                <td className="border border-gray-300 px-4 p-2">
                  {player.losses}
                </td>
                <td className="border border-gray-300 px-4 p-2">
                  {player.total_matches}
                </td>
                <td className="border border-gray-300 px-4 p-2">
                  {player.win_rate}
                </td>
              </tr>
            ))}{" "}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
