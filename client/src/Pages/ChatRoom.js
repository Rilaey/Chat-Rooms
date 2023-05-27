import React, { useState, useEffect, useRef } from "react";

export default function ChatRoom({ socket }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const sendMessage = () => {
    if (message) {
      const newChat = {
        author: localStorage.getItem("username"),
        message: message
      };

      socket.emit("new_chat", newChat);

      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    socket.on("new_chat", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("new_chat");
    };
  }, [socket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">
        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-5 w-full overflow-y-auto ${
                message.author === localStorage.getItem("username")
                  ? "justify-end"
                  : "justify-start"
              }`}
              style={{
                borderRadius: "50px",
                backgroundColor:
                  message.author === localStorage.getItem("username")
                    ? "green"
                    : "blue"
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                  marginRight: "7px",
                  color:
                    message.author === localStorage.getItem("username")
                      ? "white"
                      : "black"
                }}
              >
                {message.author}:
              </span>
              <span
                style={{
                  fontSize: "18px",
                  color:
                    message.author === localStorage.getItem("username")
                      ? "black"
                      : "white"
                }}
              >
                {message.message}
              </span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown} // Handle "Enter" key press
              placeholder="Type A Message..."
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button
                onClick={sendMessage}
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-2 py-2 mr-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n.scrollbar-w-2::-webkit-scrollbar {\n  width: 0.25rem;\n  height: 0.25rem;\n}\n\n.scrollbar-track-blue-lighter::-webkit-scrollbar-track {\n  --bg-opacity: 1;\n  background-color: #f7fafc;\n  background-color: rgba(247, 250, 252, var(--bg-opacity));\n}\n\n.scrollbar-thumb-blue::-webkit-scrollbar-thumb {\n  --bg-opacity: 1;\n  background-color: #edf2f7;\n  background-color: rgba(237, 242, 247, var(--bg-opacity));\n}\n\n.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {\n  border-radius: 0.25rem;\n}\n"
        }}
      />
    </>
  );
}