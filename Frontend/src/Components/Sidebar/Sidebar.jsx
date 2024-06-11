import React from 'react'
import './Sidebar.css'

function Sidebar() {
  return (
    <>
    <div className='sidebar-container'>
        <div className='sidebar-big-container'>
        <div className='sidebar-sub-container'>
            <button>Chat Rooms <i className="fa-solid fa-people-group"></i></button>
            <button>Friends <i className="fa-regular fa-message"></i></button>
        </div>
        </div>
        <div className='chatroom-container'>
            <button>Chat Room 1</button>
            <button>Chat Room 2</button>
            <button>Chat Room 3</button>
            <button>Chat Room 4</button>
            <button>Chat Room 5</button>
            <button>Chat Room 6</button>
        </div>
    </div>
    </>
  )
}

export default Sidebar