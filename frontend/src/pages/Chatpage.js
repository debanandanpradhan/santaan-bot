import React from "react";
import Chatbot from "../components/Chatbot"; // Import your chatbot
import Sidebar from "../components/Sidebar"; // Import the Sidebar component
// import "./Chatpage.css"; // Optional: Create this CSS file to manage layout styles

const Chatpage = () => {
  return (
    <div className="chat-page">
      <Sidebar /> {/* Sidebar on the left */}
      <Chatbot /> {/* Chatbot to the right */}
    </div>
  );
};

export default Chatpage;
