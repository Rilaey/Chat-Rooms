import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ socket }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();

  const enterRoom = () => {
    if(username !== "" && room !== "") {
      const newUser = {
        username,
        room
      }

      navigate(`/chat/${room}`)

      socket.emit("new_user", newUser)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center text-center h-screen">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={enterRoom}>
            <div>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username..."
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Room..."
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
