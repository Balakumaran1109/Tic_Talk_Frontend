import { useEffect } from "react";
import { socket } from "./services/socket";
import axios from "axios";
import Register from "./auth/register";

axios.defaults.baseURL = "http://localhost:5000";
// console.log(import.meta.env.VITE_SOCKET_URL);


function App(){
  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected:", socket.id);
    };

    const handleError = (err) => {
      console.error("Connection error:", err.message);
    };

    const handleReconnect = () => {
      console.log("Reconnected");
    };

    const handleDisconnect = (reason) => {
      console.log("Disconnected:", reason);
    };

    // Manual connection
    socket.connect();

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleError);
    socket.on("reconnect", handleReconnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleError);
      socket.off("reconnect", handleReconnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return (
  <>
    <Register></Register>
  </>
)};

export default App;
