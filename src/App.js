import logo from './logo.svg';
import React, {useEffect, useState} from 'react'
import './App.css';
import io from 'socket.io-client'

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] =useState([])
  const [socket, setSocket] = useState(null)

  useEffect(()=>{
    const resultSocket = io('http://localhost:4000')

    setSocket(resultSocket)
    resultSocket.on('messageBE',(data)=>{
      setMessages((current)=>[...current, data])
    })
  },[])
  
  const handleSendMessage = ()=>{
    socket.emit('message', message)
    setMessage('')
  }
  return (
    <div className="App">
      <ul>
        {messages.map((item)=>(
          <li>{item.message} - {new Date(item.date).getHours()}:{new Date(item.date).getMinutes()}</li>
        ))}
      </ul>
      <input type="text" value={message} name="message" id="message" onChange={(e)=> setMessage(e.target.value)} />
      <button onClick={handleSendMessage}>send message</button>
    </div>
  );
}

export default App;
