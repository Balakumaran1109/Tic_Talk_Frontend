import React, { useState } from "react";
import { api } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import ticTacToe_Img from "../assets/Tic_Tac_Toe.png";
import { LuBrain } from "react-icons/lu";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { GiTrophy } from "react-icons/gi";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    if (!userData.email || !userData.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/login", userData);

      const token = response?.data?.access_token;

      sessionStorage.setItem("token", token);

      setSuccess(response.data.message);

      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center gap-5 mx-5 text-center">
        <div className="flex flex-col items-center w-full lg:w-2/5">
          {/* Heading */}
          <div className="w-full max-w-md text-start">
            <h1>
              <span className="text-orange-500 font-extrabold text-5xl">
                TIC{" "}
              </span>
              <span className="text-black-500 font-extrabold text-5xl">
                TALK
              </span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Login to continue your game journey
            </p>
          </div>

          {/* Login inputs */}
          <div className="flex flex-col justify-center gap-5 mt-10 w-full max-w-md">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="outline outline-gray-300 rounded-xl p-4 "
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="outline outline-gray-300 rounded-xl p-4 "
              onChange={handleInputChange}
            />
            <button
              disabled={loading}
              onClick={handleLogin}
              className="bg-orange-500 text-white text-lg font-bold p-4 rounded-xl hover:bg-orange-600 transition-all duration-300 cursor-pointer"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
            {error ? <p className="text-red-500 font-bold">{error}</p> : null}
            {success ? (
              <p className="text-green-500 font-bold">{success}</p>
            ) : null}

            <p className="text-gray-600 text-md">
              New here?
              <Link
                to={"/register"}
                className="text-orange-500 hover:underline font-medium"
              >
                {" "}
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* LEFT SIDE */}
        <div className="border rounded-lg w-full lg:w-3/5 hidden md:block m-5 py-5">
          {/* FEATURES */}
          <div className="p-5">
            {/* Heading */}
            <h1 className="text-5xl font-extrabold mb-10">
              <span>PLAY. </span>
              <span className="text-orange-500">CHAT. </span>
              <span>WIN</span>
            </h1>
            <div className="flex items-center justify-center gap-15">
              <div>
                {/* Feature 1 */}
                <div className="flex items-center justify-center gap-5 mt-5">
                  <LuBrain
                    size={45}
                    color="orange"
                    className="border border-white shadow-gray-400 shadow-md rounded-lg p-2"
                  />
                  <div className="text-start">
                    <h3 className="text-orange-500 font-bold text-lg">
                      CHALLENGE YOUR MIND
                    </h3>
                    <p className="text-gray-500 mt-2 text-md">
                      Every move counts.
                      <br />
                      Think ahead and win!
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center justify-center gap-5 mt-10">
                  <IoChatboxEllipsesOutline
                    size={45}
                    color="black"
                    className="border border-white shadow-gray-400 shadow-md rounded-lg p-2"
                  />
                  <div className="text-start">
                    <h3 className="text-orange-500 font-bold text-lg">
                      LIVE CHAT
                    </h3>
                    <p className="text-gray-500 mt-2 text-md">
                      Chat with your opponent
                      <br />
                      during the match in real time.
                    </p>
                  </div>
                </div>
                {/* Feature 3 */}
                <div className="flex items-center justify-center gap-5 mt-10">
                  <GiTrophy
                    size={45}
                    color="orange"
                    className="border border-white shadow-gray-400 shadow-md rounded-lg p-2"
                  />
                  <div className="text-start">
                    <h3 className="text-orange-500 font-bold text-lg">
                      LEADERBOARD & STATS
                    </h3>
                    <p className="text-gray-500 mt-2 text-md">
                      Track your wins, losses,
                      <br />
                      win rate and match history.
                    </p>
                  </div>
                </div>
              </div>
              {/* Image */}
              <div className="w-full max-w-2xs hidden xl:block">
                <img src={ticTacToe_Img} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
