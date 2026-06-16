import React, { useEffect, useState } from "react";
import { api } from "../api/api";

function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const token = sessionStorage.getItem("token");

      const response = await api.get("/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data);
    } catch (err) {
      console.error(err);

      setError("Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return <h2>Loading stats...</h2>;
  }

  // Error State
  if (error) {
    return <h2>{error}</h2>;
  }

  // Empty State
  if (!stats) {
    return <h2>No stats found</h2>;
  }

  return (
    <div>
      <h1 className="text-center text-orange-500 font-extrabold text-2xl mb-5">
        Player Stats
      </h1>

      <table className="border border-collapse w-full">
        <thead>
          <tr>
            <th className="border px-4 p-2">Username</th>
            <th className="border px-4 p-2">Total matches</th>
            <th className="border px-4 p-2">Wins</th>
            <th className="border px-4 p-2">Losses</th>
            <th className="border px-4 p-2">Win Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 p-2">{stats.username}</td>
            <td className="border px-4 p-2">{stats.total_matches}</td>
            <td className="border px-4 p-2">{stats.wins}</td>
            <td className="border px-4 p-2">{stats.losses}</td>
            <td className="border px-4 p-2">{stats.win_rate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Stats;
