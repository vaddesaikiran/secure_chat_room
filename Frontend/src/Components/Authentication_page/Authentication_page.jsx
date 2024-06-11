import React, { useState } from "react";
import "./Authentication_page.css";
import { useNavigate, Navigate } from "react-router-dom";

import axios from "axios";
import jsCookie from "js-cookie";

function Authentication_page() {
  const token = jsCookie.get("token");
  if (token !== undefined) {
    return <Navigate to="/" />;
  }

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isRegister, setRegister] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    phoneNumber: "",
  });
  const [focusedInput, setFocusedInput] = useState("");

  const handleInputChange = (e, name) => {
    const { value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (name) => {
    setFocusedInput(name);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isRegister) {
        response = await axios.post("/api/login", { userId: formData.userId });
      } else {
        response = await axios.post("/api/signup", { ...formData });
      }
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        jsCookie.set("token", response.data);
        setErrorMsg("");
        navigate("/", { replace: true });
      } else {
        setErrorMsg(response.data);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      if (error.response.status === 401) {
        setErrorMsg(error.response.data);
      } else {
        setErrorMsg("server error");
      }
    }
  };

  const clearForm = () => {
    setFormData({
      userId: "",
      fullName: "",
      phoneNumber: "",
    });
  };

  const Toggleswitch = () => (
    <button
      type="button"
      onClick={() => {
        setRegister((prev) => !prev);
        setErrorMsg("");
        clearForm();
      }}
    >
      {isRegister ? "Switch to Register" : "Switch to login"}
    </button>
  );

  const Register = () => (
    <div className="auth-container">
      <form id="form-register" onSubmit={handleSignup}>
        <h2>{isRegister ? "Login" : "Signup"}</h2>
        <div>
          <label htmlFor="user">User Id</label>
          <input
            type="text"
            id="user"
            value={formData.userId}
            onChange={(e) => handleInputChange(e, "userId")}
            onFocus={() => handleFocus("userId")}
            autoFocus={focusedInput === "userId"}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formData.fullName}
            onChange={(e) => handleInputChange(e, "fullName")}
            onFocus={() => handleFocus("fullName")}
            autoFocus={focusedInput === "fullName"}
          />
        </div>
        <div>
          <label htmlFor="phNumber">Phone No</label>
          <input
            type="text"
            id="phNumber"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange(e, "phoneNumber")}
            onFocus={() => handleFocus("phoneNumber")}
            autoFocus={focusedInput === "phoneNumber"}
          />
        </div>
        <p>{errorMsg}</p>
        <div id="button-container">
          <button>{isRegister ? "Login" : "Signup"}</button>
          <Toggleswitch />
        </div>
      </form>
    </div>
  );

  const Login = () => (
    <div className="auth-container">
      <form onSubmit={handleSignup}>
        <h2>{isRegister ? "Login" : "Signup"}</h2>
        <div>
          <label htmlFor="user">User Id</label>
          <input
            type="text"
            id="user"
            value={formData.userId}
            onChange={(e) => handleInputChange(e, "userId")}
            onFocus={() => handleFocus("userId")}
            autoFocus={focusedInput === "userId"}
          />
        </div>
        <p>{errorMsg}</p>
        <div id="button-container">
          <button>{isRegister ? "Login" : "Signup"}</button>
          <Toggleswitch />
        </div>
      </form>
    </div>
  );

  return <>{isRegister ? <Login /> : <Register />}</>;
}

export default Authentication_page;
