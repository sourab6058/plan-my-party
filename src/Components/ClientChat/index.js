import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { io } from "socket.io-client";

import "../../css/Chat.css";
const chatterImg = require("../../images/profile-photo.jpg");

let socket;
const CHAT_API = process.env.REACT_APP_BASE_URL;
const SELLERS_API = process.env.REACT_APP_SELLERS_API;
const PACKAGES_API = process.env.REACT_APP_PACKAGES_API;
export default function ClientChat() {
  const [user, setUser] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [message, setMessage] = useState("");
  const [chatters, setChatters] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pkg, setPkg] = useState(null);
  const [showReqModal, setShowReqModal] = useState(false);
  let currentUser;
  useEffect(() => {
    console.log("in useEffect");
    if (localStorage.getItem("user-dets")) {
      currentUser = JSON.parse(localStorage.getItem("user-dets"));
      if (currentUser.type === "seller") window.location.href = "/seller-chat";
      setUser(currentUser);
      socket = io.connect(CHAT_API);
      let url = new URL(window.location.href);
      let chat_info = url.searchParams.get("chat_info");

      axios
        .get(SELLERS_API)
        .then((res) => {
          setChatters(res.data);
          console.log(res.data);
          socket.on("connect", () => {
            console.log("user connected");
            if (chat_info) {
              chat_info = JSON.parse(chat_info);
              console.log(chat_info);
              handleChatterSelect(chat_info.seller, res.data, currentUser);
              axios
                .get(`${PACKAGES_API}/getPackage/${chat_info.package}`)
                .then((res) => {
                  setPkg(res.data[0]);
                  console.log(res.data[0]);
                });
            }
          });
        })

        .catch((err) => console.error(err));
      socket.on("messages", (messages) => {
        setMessages(messages);
        console.log(messages);
      });
      socket.on("new-message", (newMessage) => {
        console.log("new message");
        console.log(messages);
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
  }, [window.location.href]);

  function handleChatterSelect(
    seller_id,
    param_chatters = null,
    currentUser = null
  ) {
    const selectedReceiver = param_chatters
      ? param_chatters.filter((chatter) => chatter.id === seller_id)[0]
      : chatters.filter((chatter) => chatter.id === seller_id)[0];
    if (receiver && receiver.id === selectedReceiver.id) return;
    let client = currentUser ? currentUser : user;
    const room =
      client.id < seller_id
        ? `${client.id}X${seller_id}`
        : `${seller_id}X${client.id}`;

    setReceiver(selectedReceiver);
    // setMessages([]);
    socket.emit("join", { room, receiver: seller_id, sender: client.id });
  }
  function handleSend() {
    if (message.trim() === "") return;

    const room =
      user.id < receiver.id
        ? `${user.id}X${receiver.id}`
        : `${receiver.id}X${user.id}`;
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
  function RequirementsModal(show) {
    if (pkg)
      return (
        <>
          <Modal show={show} onHide={() => setShowReqModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    wordWrap: "normal",
                  }}
                >
                  <img
                    src={`${CHAT_API}/uploads/${pkg.imgs_url}`}
                    alt="package img"
                    height="50px"
                    width="50px"
                    style={{ borderRadius: "50%", margin: "2px" }}
                  />
                  <p style={{ padding: "1rem" }}>
                    {pkg.description > 50
                      ? pkg.description.substr(0, 50) + "..."
                      : pkg.description}
                  </p>
                </div>
                <h1>{pkg.title}</h1>
              </>
              <br />
              <InputGroup>
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  style={{ minHeight: "100px" }}
                  placeholder="Enter Details"
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                style={{ width: "100%" }}
                onClick={() => setShowReqModal(false)}
              >
                Pay ₹{pkg.price} and Place Order
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    else return null;
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
              />{" "}
              <button className="msg-button" onClick={handleSend}>
                Send
              </button>
              {"   "}
              <button
                className="msg-button"
                onClick={() => setShowReqModal(!showReqModal)}
              >
                Place Order
              </button>
              {RequirementsModal(showReqModal)}
            </div>
          </div>
          <div className="sider"></div>
        </div>
      </div>
    </div>
  );
}
