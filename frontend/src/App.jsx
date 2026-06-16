import { useEffect } from "react";
// import { socket } from "./services/socket";
import axios from "axios";
import Register from "./auth/register";
import Login from "./auth/Login";
import Game from "./pages/game";
import Chat from "./pages/Chat";
import History from "./pages/History";
import Leaderboard from "./pages/Leadboard";
import Room from "./pages/Room";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./auth/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";
import Profile from "./pages/Profile";
import ProtectedRoute from "./services/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      {/* <Register/> */}
      {/* <Room/> */}
      {/* <ForgotPassword/> */}
      {/* <ResetPassword/> */}
      {/* <Game /> */}
      {/* <History/> */}
      {/* <Chat/> */}
      {/* <Leaderboard/> */}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>

        {/* <Route path="/game/:roomId" element={<Game/>}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
