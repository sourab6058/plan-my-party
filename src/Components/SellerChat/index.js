import axios from "axios";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import "../../css/Chat.css";
const chatterImg = require("../../images/profile-photo.jpg");

let socket;
const CHAT_API = process.env.REACT_APP_BASE_URL;
const CLIENTS_API = process.env.REACT_APP_CLIENTS_API;
export default function Chat() {
  const [user, setUser] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [message, setMessage] = useState("");
  const [chatters, setChatters] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("user-dets")) {
      const currentUser = JSON.parse(localStorage.getItem("user-dets"));
      if (currentUser.type === "client") window.location.href = "/client-chat";
      setUser(currentUser);
      console.log(CHAT_API);
      socket = io.connect(CHAT_API);
      axios
        .get(CLIENTS_API)
        .then((res) => {
          setChatters(res.data);
          console.log(res.data);
          socket.on("connect", () => {
            console.log("user connected");
          });
        })
        .catch((err) => console.error(err));
      socket.on("messages", (messages) => {
        setMessages(messages);
        console.log("from emit array");
      });
      socket.on("new-message", (newMessage) => {
        console.log("new-message");
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
      });
    } else {
      window.location.href = "/";
    }
    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, []);

  function handleChatterSelect(client_id) {
    const room =
      client_id < user.id
        ? `${client_id}X${user.id}`
        : `${user.id}X${client_id}`;
    const selectedReceiver = chatters.filter(
      (chatter) => chatter.id === client_id
    )[0];
    setReceiver(selectedReceiver);
    // setMessages([]);
    socket.emit("join", {
      receiver: selectedReceiver.id,
      sender: user.id,
      room,
    });
  }
  function handleSend() {
    if (message.trim() === "") return;
    const room =
      receiver.id < user.id
        ? `${receiver.id}X${user.id}`
        : `${user.id}X${receiver.id}`;
    const newMessage = {
      sender: user.id,
      receiver: receiver.id,
      message,
      room,
    };
    socket.emit("new-message", newMessage);
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
  }
  return (
    <div className="main-container">
      <div className="conversation-list-container">
        <div className="heading">
          <h3 className="conversation-heading">All Converstions</h3>
        </div>
        <div className="conversation-list">
          <ul>
            {chatters.map((chatter) => (
              <li onClick={() => handleChatterSelect(chatter.id)}>
                <img
                  src={chatterImg}
                  width="45px"
                  height="45px"
                  className="chatter-image"
                />
                {chatter.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="chat-container">
        <h1 className="chat-container-heading">Name Surname</h1>
        <div className="chat-col">
          <div className="chat">
            <div className="chats-block">
              <ul className="chat-list">
                {messages.map((msg) => (
                  <li
                    className="chat-msg"
                    color={user.id == msg.sender ? "blue" : "black"}
                  >
                    {`${msg.message}, id:${msg.sender}`}
                  </li>
                ))}
              </ul>
            </div>
            <div className="msg-input">
              <input
                className="input-box"
                type="text"
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="msg-button" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
          <div className="sider"></div>
        </div>
      </div>
    </div>
  );
}
