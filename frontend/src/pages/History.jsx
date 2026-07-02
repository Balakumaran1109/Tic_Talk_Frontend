import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../api/api";
import { FaHistory } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/game_history");

      setHistory(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full border border-gray-300 rounded-md shadow-md p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaHistory size={25} className="text-orange-500" />
            <h1 className="text-black font-bold text-2xl">Match History</h1>
          </div>
          <button className="flex items-center gap-2 p-2 font-bold cursor-pointer hover:text-orange-500 hover:translate-x-1 transition-all duration-500">
            <p>View history</p>
            <FaArrowRightLong />
          </button>
        </div>

        <div className="w-full mt-5">
          {history.length === 0 ? (
            <>
              <div>No matches played yet.</div>
            </>
          ) : (
            history.map((match, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between border border-gray-300 m-2 p-2 shadow-md hover:-translate-y-1 transition-all duration-300 rounded-md"
                >
                  <div className="bg-green-100 text-green-700 px-3 py-2 font-semibold">
                    WIN
                  </div>
                  <div>
                    <h2>
                      <span>vs</span>
                      <span className="font-bold"> {match.opponent}</span>{" "}
                    </h2>
                  </div>
                  <div className="text-black font-bold">3 - 1</div>

                  <div className="flex items-center justify-center gap-2">
                    <CiCalendar
                      size={22}
                      className="text-gray-500 font-semibold"
                    />

                    <p className="text-gray-500 text-sm font-semibold">
                      {new Date(match.time).toDateString()}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default History;
