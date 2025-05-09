import React, { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput })
      });
      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: data.answer }
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error connecting to server." }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={styles.container}>
      <h2>Meet Your AI Chatbot</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={{ ...styles.message, alignSelf: msg.sender === "user" ? "flex-end" : "flex-start" }}>
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    color: "white",
    fontFamily: "Arial",
    padding: "20px",
    height: "100vh",
    textAlign: "center"
  },
  chatBox: {
    backgroundColor: "#2d2d2d",
    borderRadius: "10px",
    padding: "15px",
    width: "60%",
    margin: "auto",
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto"
  },
  message: {
    margin: "10px 0"
  },
  inputContainer: {
    marginTop: "20px"
  },
  input: {
    width: "60%",
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    marginRight: "10px"
  },
  button: {
    padding: "10px 20px",
    border: "none",
    backgroundColor: "#ADD8E6",
    color: "black",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default Chatbot;
