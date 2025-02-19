import React, { useRef, useEffect, useState } from 'react';
import ChatbotIcon from './chatboticon';
import ChatForm from './chatform';
import ChatMessage from './chatMessage';
import { companyInfo } from './companyInfo';
import './chatBot.css'; 
const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([{
    hideInChat: true,
    role: "model",
    text: companyInfo
  }]);
  
  // Add state for managing chatbot visibility
  const [isOpen, setIsOpen] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async(history)=>{
    const updateHistory = (text)=>{
      setChatHistory((prev) => [...prev.filter((msg) => msg.text !== "Thinking...."),
        { role: "model", text }]);
    }

    history = history.map(({role,text}) => ({role,parts: [{text}]}));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({contents: history })
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok) throw new Error(data.error.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
      updateHistory(apiResponseText);

    } catch(error) {
      console.log(error);
      return;
    }
  };
  
  useEffect(()=>{
    if (isOpen && chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  },[chatHistory, isOpen]);

  // Toggle function for opening/closing chatbot
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='container'>
      {/* Floating button to open chat when closed */}
      {!isOpen && (
        <button 
          className="chat-toggle-button"
          onClick={toggleChatbot}
          aria-label="Open chat"
        >
          <ChatbotIcon />
        </button>
      )}
      
      <div className={`chatbot-popup ${isOpen ? 'open' : ''}`}>
        <div className='chatbot-header'>
          <div className='header-info'>
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button 
            type="button" 
            className="material-symbols-rounded"
            onClick={toggleChatbot}
          >
            keyboard_arrow_down
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there<br />
              How can i help you today?
            </p>
          </div>

          {chatHistory.map((chat,index)=>(
            <ChatMessage key={index} chat={chat}/>
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm 
            chatHistory={chatHistory} 
            setChatHistory={setChatHistory} 
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;