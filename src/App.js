import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ChatRoom from './pages/ChatRoom'
import Login from './pages/Login'
import io from "socket.io-client";


const App = () => {
  const [socket, setSocket] = useState(null)
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!socket && token){
      const resultSocket = io("http://localhost:4000", {
        query: {
          token: token
        }
      })
      setSocket(resultSocket)
    }
  },[])
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login setSocket={setSocket}/>}/>
      <Route path="/room" element={<ChatRoom socket={socket} />}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App