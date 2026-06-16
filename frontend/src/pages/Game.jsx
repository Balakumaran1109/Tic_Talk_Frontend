import React, { useEffect, useState } from "react";
import { createSocket } from "../services/socket";
import { useParams } from "react-router-dom";


function Game() {
  const [socket, setSocket] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("");
  const [symbol, setSymbol] = useState("");
  const [winner, setWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { roomId } = useParams();
  console.log(roomId);
  

  const makeMove = (index) => {
    // if (!socket) return;

    // if (isGameOver) return;
    // if (board[index] !== "") return;
    // if (turn !== symbol) return;

    socket.emit("make_move", {
      room: roomId,
      index: index,
    });
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("send_message", {
      room: roomId,
      message: input,
    });

    setInput("");
  };

  useEffect(() => {
    const newSocket = createSocket();

    newSocket.connect();

    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);

      newSocket.emit("join_room", {room: roomId})

      // Join Game
      newSocket.emit("join_game", { room: roomId });
    });

    newSocket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected:", reason);
    });

    newSocket.on("player_assigned", (data) => {
      console.log("Assigned:", data);
      setSymbol(data.symbol);
    });

    newSocket.on("game_start", (data) => {
      console.log("Game started:", data);
    });

    newSocket.on("move_made", (data) => {
      setBoard(data.board);
      setTurn(data.turn);
    });

    // Game over
    newSocket.on("game_over", (data) => {
      console.log("Game Over:", data);

      setWinner(data.winner);
      setIsGameOver(true);
    });

    newSocket.on("reconnected", (data) => {
      console.log("Reconnected:", data);
    });

    newSocket.on("error", (err) => {
      console.error(err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.off();
      newSocket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>You are: {symbol}</h2>
      <h3>Turn: {turn}</h3>

      {isGameOver && (
        <h2>
          {winner === "draw"
            ? "It's a Draw!"
            : winner === symbol
              ? "You Won 🎉"
              : "You Lost 😢"}
        </h2>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)" }}>
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => makeMove(index)}
            style={{ height: "100px", fontSize: "24px" }}
            disabled={isGameOver}
          >
            {cell}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Chat</h3>

        <div
          style={{
            height: "150px",
            overflowY: "auto",
            border: "1px solid black",
          }}
        >
          {messages.map((msg, i) => (
            <div key={i}>
              <strong>{msg.username}</strong>: {msg.message} ({msg.time})
            </div>
          ))}
        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Game;
