import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { api } from "../api/api";

function Room() {
  const [roomId, setRoomId] = useState("");
  const [checkRoomId, setCheckRoomId] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  // Create Room
  const createRoom = async () => {
    const newRoomId = Math.random().toString(36).substring(2, 8);
    const token = sessionStorage.getItem("token");

    console.log(newRoomId);
    console.log(token);

    try {
      const res = await api.post(
        "/room",
        { room_id: newRoomId },
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        },
      );

      console.log(res.data);

      setRoomId(res.data.room_id);

      setLoading("true");
    } catch (error) {
      console.log(error);
    }
  };

  // Join Room
  const joinRoom = async () => {
    const token = sessionStorage.getItem("token");

    try {
      setLoading(true);

      const res = await api.get("/get_room", {
        params: {
          room_id: checkRoomId,
        },
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });

      console.log(res.data);

      const fetchedRoomId = res.data.room_id;

      setRoomId(fetchedRoomId);

      if (!fetchedRoomId.trim()) return;

      if (checkRoomId === fetchedRoomId) {
        navigate(`/game/${fetchedRoomId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (loading == "false") {
  //     navigate(`/game/${roomId}`);
  //   }
  // }, [loading])

  return (
    <div className="flex flex-col items-center justify-center gap-5 border rounded-lg p-5">
      <h1>
        <span className="text-orange-500 font-extrabold text-2xl"> Tic</span>
        <span className="text-black-500 font-extrabold text-2xl"> Tac</span>
        <span className="text-orange-500 font-extrabold text-2xl"> Toe</span>
        <span className="text-black-500 font-extrabold text-2xl"> Room</span>
      </h1>
      <div className="flex items-center justify-center gap-10">
        {/* Create Room */}
        <div className="flex flex-col items-center border rounded-lg p-5">
          <p className="text-gray-500">
            Click create room and share
            <br />
            the room id with anyone
          </p>
          <br />
          <div className="flex gap-5">
            <button
              onClick={createRoom}
              className="bg-orange-500 text-white p-2 text-sm font-semibold rounded-xl hover:bg-orange-600 transition-all duration-300 cursor-pointer"
            >
              Create Room
            </button>
            <p className="py-2">{roomId}</p>
            {roomId ? (
              <button
                onClick={() => navigator.clipboard.writeText(roomId)}
                className="bg-black text-white p-2 text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 cursor-pointer"
              >
                Copy ID
              </button>
            ) : null}
          </div>
        </div>

        {/* Join Room */}
        <div className="flex flex-col items-center border rounded-xl p-5">
          <p className="text-gray-500 pb-3">
            Join room by entering the code
          </p>
          <input
            value={checkRoomId}
            onChange={(e) => setCheckRoomId(e.target.value)}
            placeholder="Enter Room ID"
            className="outline outline-gray-300 rounded-xl px-2 py-1 text-center max-w-3xs"
          />{" "}
          <button onClick={joinRoom} className="bg-black text-white p-2 text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 cursor-pointer mt-4">Join Room</button>
        </div>
      </div>
    </div>
  );
}

export default Room;
