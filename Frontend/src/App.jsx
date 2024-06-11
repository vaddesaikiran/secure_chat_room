import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Authentication_page from './Components/Authentication_page/Authentication_page';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import HomePage from './Components/HomePage/Home';
import CreateRoom from './Components/CreateRoom/CreateRoom';
import JoinRoom from './Components/JoinRoom/JoinRoom';
// import Messages from './Components/MessagesPage/MessagesPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Authentication_page />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/api/chatrooms" element={<CreateRoom />} />
          <Route path="/api/joinroom" element={<JoinRoom />} />
          {/* <Route path="/api/messages" element={<Messages />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
