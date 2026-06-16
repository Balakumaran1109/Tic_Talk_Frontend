import { io } from "socket.io-client";

const URL = "http://localhost:5000";

export const createSocket = () => {

  const socket = io(URL, {
    auth: { 
      token: sessionStorage.getItem("token")
    },
    autoConnect: false,
    transports: ["polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  return socket;
};
