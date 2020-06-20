import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:9012/";

let App = () => {
  const [inputValue, setInputValue] = useState({
    message: "",
  });
  const [chatMessages, setChatMessages] = useState([]);
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on("chat-message", (data) => {
      let tempMsgs = chatMessages;
      tempMsgs.unshift(data);
      setChatMessages([...tempMsgs]);
    });
    return () => socket.disconnect();
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div>
      <div>
        <input
          name="message"
          type="text"
          onChange={handleChange}
          value={inputValue.message}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
      <div>
        {chatMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
