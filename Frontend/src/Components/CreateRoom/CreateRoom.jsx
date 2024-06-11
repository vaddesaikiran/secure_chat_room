import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './CreateRoom.css';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);

  const handleCreateRoom = () => {
    if (roomName) {
      const id = uuidv4();
      const password = Math.random().toString(36).slice(-8);
      setRoomId(id);
      setRoomPassword(password);
      setRoomCreated(true);
    }
  };

  return (
    <div className="room-container">
      <h2>Create Room</h2>
      {!roomCreated ? (
        <>
          <input
            type="text"
            placeholder="Enter Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button onClick={handleCreateRoom}>Create Room</button>
        </>
      ) : (
        <div className="room-details">
          <p>Room Name: {roomName}</p>
          <p>Room ID: {roomId}</p>
          <p>Room Password: {roomPassword}</p>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
