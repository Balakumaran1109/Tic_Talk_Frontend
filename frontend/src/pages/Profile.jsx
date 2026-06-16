import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import Room from "./Room";
import Leaderboard from "./Leadboard";
import Stats from "./Stats";
import History from "./History";

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
    <div className="min-h-screen flex flex-col items-center justify-around m-5">
      {/* User Info */}
      <div className="flex">
        <h1>
          <span className="text-orange-500 font-extrabold text-5xl">
            Welcome!{" "}
          </span>
          <span className="text-black-500 font-extrabold text-5xl">
            {user?.username}
          </span>
        </h1>
      </div>
      {/* Room component */}
      <div className="flex items-center justify-center gap-50 mt-5">
        <Room />
        <History />
      </div>

      <div className="flex items-center justify-center gap-30 mt-5">
        <Leaderboard />
        <Stats />
      </div>
    </div>
  );
}

export default Profile;
