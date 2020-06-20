import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Comment, Tooltip } from "antd";
import moment from "moment";
import styled from "styled-components";

import CommentBox from "./comment/CommentBox";
import "antd/dist/antd.css";

const ENDPOINT = "http://localhost:9012/";
const socket = socketIOClient(ENDPOINT);

let App = () => {
  const [inputValue, setInputValue] = useState({
    message: "",
  });
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const name = prompt("Joining chat, enter your name");
    socket.emit("new-user-joined", name);

    socket.on("chat-message", (msgObj) => {
      let tempMsgs = chatMessages;
      tempMsgs.push(msgObj);
      setChatMessages([...tempMsgs]);
    });

    socket.on("user-connected", (name) => {
      let tempMsgs = chatMessages;
      tempMsgs.push({ name, msg: `${name} connected` });
      setChatMessages([...tempMsgs]);
    });
    return () => socket.disconnect();
    //eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    inputValue[e.target.name] = e.target.value;
    setInputValue({ ...inputValue });
  };

  const handleSubmit = () => {
    socket.emit("send-chat-message", inputValue.message);
    setInputValue({
      message: "",
    });
  };

  return (
    <StyleWrapper>
      <div className="chat-container">
        <div className="scroll-section">
          {chatMessages.map((msg, index) => {
            console.log("msg", msg);
            return (
              <Comment
                key={index}
                author={msg.name}
                content={msg.msg}
                className="comment-item"
                datetime={
                  <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                    <span>{moment().fromNow()}</span>
                  </Tooltip>
                }
              />
            );
          })}
        </div>
      </div>
      <div className="field-container">
        <CommentBox
          onChange={handleChange}
          handleSubmit={handleSubmit}
          value={inputValue.message}
        />
      </div>
    </StyleWrapper>
  );
};

export default App;

const StyleWrapper = styled.div`
  .chat-container {
    height: calc(100vh - 53px);

    .scroll-section {
      max-height: calc(100vh - 53px);
      overflow-y: auto;

      .comment-item {
        padding: 0px 20px;
      }
    }
  }
`;
