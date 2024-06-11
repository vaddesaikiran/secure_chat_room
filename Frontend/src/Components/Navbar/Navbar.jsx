import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import jsCookie from "js-cookie";

import axios from "axios";
import { Link } from "react-router-dom";

function Navbar() {
  const [data, setData] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const handleCreateRoom = async () => {
    const token = jsCookie.get("token");
    try {
      const response = await axios.post("/api/createchatroom", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        navigate("/api/chatrooms");
      } else {
        alert("You are Not A Prime Member");
      }
    } catch (error) {
      console(error);
    }
  };

  const handleProfile = async () => {
    const token = jsCookie.get("token");
    console.log(token);
    try {
      const response = await axios.post("/api/profile", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
    } catch (error) {
      console.log(error);
    }
    setToggle(!toggle);
  };

  const handleLogout = (e) => {
    jsCookie.remove("token");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className="nav-container">
        <div className="nav-subcontainer">
          <h1>CHAT ROOM</h1>
          <ul className="nav-ul-list">
            {/* <Link to="/api/chatrooms"> */}
            <li onClick={handleCreateRoom}>
              <span className="icon-hidden">Create Room </span>
              <i className="fa-solid fa-plus"></i>
            </li>
            {/* </Link> */}
            <Link to="/api/joinroom">
              <li>
                <span className="icon-hidden">Join Room</span>
                <i className="fa-solid fa-door-open"></i>
              </li>
            </Link>
            <li onClick={handleProfile}>
              <i className="fa-regular fa-user"></i>
            </li>
            <li className={toggle ? "floatElem" : "displayNone"}>
              <div>{`FullName:  ${data.fullName}`}</div>
              <div>{`userId:  ${data.userId}`}</div>
              <div>{`Phone No:  ${data.phoneNumber}`}</div>
              <div>{`availCoins:  ${data.availCoins}`}</div>
              <button type="button" onClick={handleLogout} className="btn">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
