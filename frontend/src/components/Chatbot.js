import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import "../App.css";  // Keep existing styles

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // Chatbot messages
  const [query, setQuery] = useState(""); // User input query

  const sendMessage = async () => {
    if (!query.trim()) return;

    const newMessages = [...messages, { text: query, sender: "user" }];
    setMessages(newMessages);
    setQuery("");

    try {
      const response = await fetch("http://localhost:5000/api/query/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.response || "No response", sender: "bot" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Error fetching response", sender: "bot" }]);
    }
  };

  return (
    <div className="chatbot-page">
      <Sidebar /> {/* Sidebar rendered here */}
      <div className="chat-container">
        <h2>Welcome to <span className="santaan-bot">Santaan Bot</span></h2>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Ask something..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
