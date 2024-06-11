import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./JoinRoom.css";

const socket = io("http://localhost:4000");

const JoinRoom = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [inRoom, setInRoom] = useState(false);

  useEffect(() => {
    if (inRoom) {
      socket.emit("join room", roomId, username);

      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [inRoom, roomId, username]);

  const handleJoinRoom = () => {
    if (roomId && roomPassword && username) {
      // You should add a function to validate room ID and password here
      setInRoom(true);
    }
  };

  const handleLeaveBtn = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("send message", message, roomId, username);
      setMessage("");
    }
  };

  return (
    <div className="chat-app">
      {!inRoom ? (
        <div className="room-container">
          <h2>Join Room</h2>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Room Password"
            value={roomPassword}
            onChange={(e) => setRoomPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
      ) : (
        <div className="chat-container">
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.user === "admin"
                    ? "join-message"
                    : msg.user === username
                    ? "own-message"
                    : "other-message"
                }`}
              >
                <strong>{msg.user !== "admin" && `${msg.user}: `}</strong>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="message-form">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              type="text"
              className="message-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
            <button
              onClick={handleLeaveBtn}
              type="button"
              className="send-button"
            >
              Leave
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default JoinRoom;
