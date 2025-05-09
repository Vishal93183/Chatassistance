// import React, { useState } from 'react';
// import axios from 'axios';
import './App.css';
import Chatbot from "./Chatbot";

function App() {
  return <Chatbot />;

  
}

export default App;







  // const [question, setQuestion] = useState('');
  // const [messages, setMessages] = useState([]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!question.trim()) return;

  //   // Show user message
  //   const newMessages = [...messages, { type: 'user', text: question }];
  //   setMessages(newMessages);

  //   try {
  //     const response = await axios.post('http://localhost:8080/api/chat', {
  //       question: question
  //     });
  //     // Show bot response
  //     setMessages([...newMessages, { type: 'bot', text: response.data.answer }]);
  //     setQuestion('');
  //   } catch (error) {
  //     console.error('Error sending question:', error);
  //   }
  // };

  // return (
  //   <div className="chatbot-wrapper">
  //     <div className="chat-header">Employee Details</div>
  //     <div className="chat-body">
  //       {messages.map((msg, index) => (
  //         <div key={index} className={`message ${msg.type}`}>
  //           {msg.text}
  //         </div>
  //       ))}
  //     </div>
  //     <form className="chat-footer" onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         value={question}
  //         onChange={(e) => setQuestion(e.target.value)}
  //         placeholder="Type a message..."
  //       />
  //       <button type="submit">Send</button>
  //     </form>
  //   </div>
  // );