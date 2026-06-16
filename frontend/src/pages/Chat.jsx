import React, { useEffect, useState } from "react";
import { createSocket } from "../services/socket";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const newSocket = createSocket();
    newSocket.connect();
    if (!input.trim()) return;

    newSocket.emit("send_message", {
      room: "game_1",
      message: input,
    });

    setInput("");
  };

  useEffect(() => {
    const newSocket = createSocket();
    newSocket.connect();

    newSocket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div>
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

export default Chat;
