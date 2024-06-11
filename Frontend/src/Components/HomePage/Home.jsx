import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Home.css"

function Home() {
  return (
    <>
      <div className="HomeCss">
        <div className="Home-Nav"><Navbar /></div>
        <div className="Home-Mid-Container">
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default Home;
