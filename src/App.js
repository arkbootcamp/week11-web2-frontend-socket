import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ChatRoom from './pages/ChatRoom'
import Login from './pages/Login'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/room" element={<ChatRoom/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App