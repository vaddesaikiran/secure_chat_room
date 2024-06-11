import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Messages = () => {
  const location = useLocation();
  const { roomId, username } = location.state || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [inRoom, setInRoom] = useState(false);

  console.log(roomId, "hellooooooo")
  useEffect(() => {
    if (roomId && username) {
      setInRoom(true);
      socket.emit('join room', roomId, username);

      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [roomId, username]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("send message function called")
    if (message) {
      console.log(`Sending message: ${message}`);
      socket.emit('send message', message, roomId, username);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      {inRoom ? (
        <>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.user}: </strong>{msg.text}
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
            <button type="submit" className="send-button">Send</button>
          </form>
        </>
      ) : (
        <p>Joining room...</p>
      )}
    </div>
  );
};

export default Messages;
