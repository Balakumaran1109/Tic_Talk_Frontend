import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import Room from "./Room";
import Leaderboard from "./Leadboard";
import Stats from "./Stats";
import History from "./History";
import ticTacToe_Img from "../assets/Tic_Tac_Toe.png";
import { IoIosLogOut } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { TbTicTac } from "react-icons/tb";

function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const navigate = useNavigate();

  const avatarUrl = `https://ui-avatars.com/api/?name=${user?.username}`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const userResponse = await api.get("/profile", {});

      setUser(userResponse.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-8xl min-h-screen flex flex-col items-center gap-6">
      {/* NAVBAR */}
      <div className="w-full flex items-center justify-between py-3 px-4 bg-white border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 hidden md:flex">
          <TbTicTac size={30} />
          <h1 className="font-bold text-4xl">
            <span className="text-orange-500">TIC</span>
            <span className="text-black"> TALK</span>
          </h1>
        </div>
        <div>
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
            <span className="text-orange-500">Welcome back, </span>
            <span className="text-black">{user?.username}!</span>
          </h1>
        </div>
        <div>
          <button className="hidden md:flex items-center gap-2 bg-orange-500 border rounded-md text-orange-500 px-3 py-1 font-bold text-lg hover:bg-black text-white transition-all duration-300 cursor-pointer">
            <TbLogout />
            Logout
          </button>
        </div>
      </div>

      {/* Room and Stats component */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-10 px-5">
        <Room />
        <Stats />
      </div>

      {/* Leaderboard and History component */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-10 px-5 mb-5">
        <Leaderboard />
        <History />
      </div>
    </div>
  );
}

export default Profile;
