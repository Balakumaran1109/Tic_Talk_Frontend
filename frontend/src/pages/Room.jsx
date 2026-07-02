import React, { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { LuUsers } from "react-icons/lu";
import { MdOutlineContentCopy } from "react-icons/md";

function Room() {
  const [roomId, setRoomId] = useState("");
  const [checkRoomId, setCheckRoomId] = useState("");
  const [loading, setLoading] = useState("");
  const [copyText, setCopyText] = useState("");
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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(roomId);
    setCopyText(true);
    console.log("true");

    setTimeout(() => {
      setCopyText(false);
    }, 2000);
  };

  // useEffect(() => {
  //   if (loading == "false") {
  //     navigate(`/game/${roomId}`);
  //   }
  // }, [loading])

  return (
    <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-5 border border-gray-300 shadow-md rounded-lg p-5">
      <div className="flex items-center gap-2">
        <LuUsers className="text-orange-500 text-2xl" />
        <h1 className="font-extrabold text-2xl font-extrabold text-2xl font-extrabold text-2xl font-extrabold text-2xl">
          <span className="text-black"> Tic</span>
          <span className="text-orange-500"> Tac</span>
          <span className="text-black"> Toe</span>
          <span className="text-orange-500"> Room</span>
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row items-stretch gap-6 mt-3">
        {/* Create Room */}
        <div className="flex flex-col flex-1 items-center border border-gray-300 shadow-md rounded-lg px-5 py-3 gap-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <h1 className="text-md font-bold">Create Room</h1>
          <p className="text-gray-500 text-sm text-center">
            Create a new room and share
            <br />
            the room ID with anyone
          </p>
          <div className="flex flex-col items-center gap-4 mt-2">
            <div>
              <button
                onClick={createRoom}
                className="bg-orange-500 text-white p-2 text-sm font-semibold rounded-md hover:bg-black transition-all duration-300 cursor-pointer"
              >
                Create Room
              </button>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <p className="font-semibold text-sm">Room ID: </p>
              {roomId ? (
                <code>{roomId}</code>
              ) : (
                <span className="text-gray-400 text-xs">
                  Create room to generate ID
                </span>
              )}
              {!copyText
                ? roomId && (
                    <button
                      onClick={handleCopy}
                      className="text-black hover:text-orange-500 cursor-pointer"
                    >
                      <MdOutlineContentCopy />
                    </button>
                  )
                : roomId && (
                    <p className="text-green-600 font-semibold">Copied</p>
                  )}
            </div>
          </div>
        </div>

        {/* Join Room */}
        <div className="flex flex-col flex-1 items-center border rounded-xl px-5 py-3 gap-4 border border-gray-300 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <h1 className="text-md font-bold text-orange-500">Join Room</h1>
          <p className="text-gray-500 text-sm text-center">
            Join room by entering the code
          </p>
          <input
            value={checkRoomId}
            onChange={(e) => setCheckRoomId(e.target.value)}
            placeholder="Enter Room ID"
            className="w-full max-w-sm rounded-xl border border-gray-300 px-3 py-2 text-center"
          />{" "}
          <button
            onClick={joinRoom}
            className="bg-black text-white py-2 px-3 text-sm font-semibold rounded-md hover:bg-orange-500 transition-all duration-300 cursor-pointer"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;
