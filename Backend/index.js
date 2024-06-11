const express = require('express');
const mysql = require('mysql');
const http = require('http');
const { Server } = require('socket.io');
const authe = require('./controller/userAuthentication/Authentication');
const jwtToken = require('./controller/jwtTokens/jwtTokens');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nani@47MY001',
  database: 'chatroomone',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// HTTP Server and Socket.IO Setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.post('/api/signup', authe.checkingUser(db), jwtToken.genToken);
app.post('/api/login', authe.checkingUserLogin(db), jwtToken.genToken);
app.post('/api/createchatroom', jwtToken.verifyToken, authe.isPrime(db));
app.post("/api/profile",jwtToken.verifyToken,authe.getUserDetails(db))


// Socket.IO Chat Room Logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join room', (roomId, username) => {
    socket.join(roomId);
    console.log(`${username} joined room ${roomId}`);
    io.to(roomId).emit('message', { user: 'admin', text: `${username} has joined the room.` });
  });

  socket.on('send message', (message, roomId, username) => {
    io.to(roomId).emit('message', { user: username, text: message });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
