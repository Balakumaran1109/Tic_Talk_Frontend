import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { ImStatsBars } from "react-icons/im";
import { IoGameControllerOutline } from "react-icons/io5";
import { BsTrophy } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi2";
import { BsFire } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { RiPieChartLine } from "react-icons/ri";



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
    <div className="w-full flex flex-col items-center justify-center border border-gray-300 p-5 rounded-md shadow-md">
      <div className="w-full flex flex-1 items-center justify-center gap-2 mb-4">
        <ImStatsBars className="text-orange-500" size={30} />
        <h1 className="text-black font-extrabold text-2xl">Player Stats</h1>
      </div>

      <div className="max-w-lg w-full flex flex-col md:flex-row items-center justify-between xl:justify-center gap-4 flex-wrap mt-3">

        {/* Total matches */}
        <div className="min-w-[220px] flex items-center pl-6 border border-gray-300 shadow-md rounded-md px-3 py-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div>
            <IoGameControllerOutline size={35} className="text-orange-500"/>
          </div>
          <div className="w-full flex flex-col items-center text-center">
            <p className="text-black font-bold text-md">Total Matches</p>
            <p className="font-bold text-xl">{stats.total_matches}</p>
          </div>
        </div>

        {/* Wins */}
        <div className="min-w-[220px] flex items-center pl-6 border border-gray-300 shadow-md rounded-md px-3 py-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div>
            <BsTrophy size={35} className="text-orange-500"/>
          </div>
          <div className="w-full flex flex-col items-center text-center">
            <p className="text-black font-bold text-md">Wins</p>
            <p className="font-bold text-xl">{stats.wins}</p>
          </div>
        </div>

        {/* Losses */}
        <div className="min-w-[220px] flex items-center pl-6 border border-gray-300 shadow-md rounded-md px-3 py-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div>
            <HiOutlineUser size={35} className="text-orange-500"/>
          </div>
          <div className="w-full flex flex-col items-center text-center">
            <p className="text-black font-bold text-md">Losses</p>
            <p className="font-bold text-xl">{stats.losses}</p>
          </div>
        </div>

        {/* Win rate */}
        <div className="min-w-[220px] flex items-center pl-6 border border-gray-300 shadow-md rounded-md px-3 py-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div>
            <RiPieChartLine size={35} className="text-orange-500"/>
          </div>
          <div className="w-full flex flex-col items-center text-center">
            <p className="text-black font-bold text-md">Win rate</p>
            <p className="font-bold text-xl">{(stats.wins/stats.total_matches*100).toFixed()}%</p>
          </div>
        </div>

        {/* Current streak */}
        <div className="min-w-[220px] flex items-center pl-6 border border-gray-300 shadow-md rounded-md px-3 py-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div>
            <BsFire size={35} className="text-orange-500"/>
          </div>
          <div className="w-full flex flex-col items-center text-center">
            <p className="text-black font-bold text-md">Current streak</p>
            <p className="font-bold text-xl">0</p>
          </div>
        </div>

         {/* Best streak */}
        <div className="min-w-[220px] flex items-center pl-6 border border-gray-300 shadow-md rounded-md px-3 py-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div>
            <FaRegStar size={35} className="text-orange-500"/>
          </div>
          <div className="w-full flex flex-col items-center text-center">
            <p className="text-black font-bold text-md">Best streak</p>
            <p className="font-bold text-xl">0</p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Stats;
