import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom';
const ChatRoom = () => {
  const [socket, setSocket] = useState(null);
  const [searcParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const resultSocket = io("http://localhost:4000");
    setSocket(resultSocket);
    resultSocket.emit("inisialRoom", { room: searcParams.get("group"), username: searcParams.get("username") });
    setUsername(searcParams.get("username"));
    setGroup(searcParams.get("group"));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.off("newMessage");
      socket.on("newMessage", (data) => {
        setMessages((current) => [...current, data]);
        console.log("data");
      });
      console.log("socket");
      socket.on('notifAdmin', (data)=>{
        setMessages((current) => [...current, data]);
      })
    }
  }, [socket]);
  const handleSendMessage = () => {
    console.log("handleSendMessage");
    const dataMessage = {
      sender: username,
      message: message,
      room: group,
    };
    socket.emit("sendMessage", dataMessage);
    setMessage("");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h3>group: {group} </h3>
        </div>
        <div className="col-md-8">
          <div className="wrapper-chat">
            <ul className="list-group">
                <ScrollToBottom className="scrool-buttom">
              {messages.map((item) => (
                <li className={`list-group-item ${item.sender  === username  ? 'bg-blue': ''}`}>
                  <h6>{item.sender}</h6>
                  <p>
                    {item.message} ({item.date})
                  </p>
                </li>
              ))}
              </ScrollToBottom>
            </ul>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="isikan pesan anda"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
