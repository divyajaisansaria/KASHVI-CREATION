import React, { useState } from "react";

const Chatbot = ({ closeChat }) => {
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you with your saree needs?", sender: "bot" }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Simulate a delay for the bot's response
    setTimeout(() => {
      const userMessage = input.toLowerCase();
      let botReply = "I'm still learning about sarees!  Could you please rephrase or ask another question?"; // Default reply

      // Saree Related Questions
      if (userMessage.includes("saree") || userMessage.includes("sarees")) {
        if (userMessage.includes("types") || userMessage.includes("variety")) {
          botReply = "We offer a wide variety of sarees, including silk, cotton, Banarasi, Kanjivaram, chiffon, georgette, and more!  What type are you most interested in?";
        } else if (userMessage.includes("price") || userMessage.includes("cost")) {
          botReply = "Our saree prices vary depending on the fabric, embellishments, and craftsmanship. Could you tell me which type of saree you're interested in so I can give you a more specific range?";
        } else if (userMessage.includes("care") || userMessage.includes("wash") || userMessage.includes("clean")) {
          botReply = "Saree care depends on the fabric.  Generally, dry cleaning is recommended for silk and Banarasi sarees. Cotton sarees can usually be hand-washed.  Check the care label for specific instructions!";
        } else if (userMessage.includes("latest") || userMessage.includes("new")) {
          botReply = "Check out our 'New Arrivals' section! We regularly update our collection with the latest saree designs and trends.";
        } else if (userMessage.includes("return") || userMessage.includes("exchange")) {
          botReply = "You can return or exchange new, unworn items within 30 days. Please see our return policy on website.";
        }
        else {
           botReply = "We have a beautiful collection of sarees! Can you be more specific about what you're looking for (e.g., type, color, occasion)?";
        }
      }

      // Payment and Ordering
      else if (userMessage.includes("payment")) {
        if (userMessage.includes("accept") || userMessage.includes("methods")) {
          botReply = "We accept major credit cards (Visa, Mastercard, American Express), PayPal, UPI and other payment modes.";
        } else if (userMessage.includes("secure")) {
          botReply = "Yes, all payments are processed through a secure, encrypted gateway to protect your financial information.";
        } else {
          botReply = "We accept various payment methods for your convenience. Please see our payment options on website.";
        }
      } else if (userMessage.includes("order")) {
        if (userMessage.includes("track")) {
          botReply = "You can track your order using the tracking number provided in your shipping confirmation email. Visit our website to track.";
        } else if (userMessage.includes("cancel")) {
          botReply = "Orders can be canceled before they are shipped. Please contact our customer support team as soon as possible.";
        } else {
          botReply = "Visit our Shop section to view all of our sarees.";
        }
      }

      // Shipping
      else if (userMessage.includes("shipping")) {
        if (userMessage.includes("cost") || userMessage.includes("free")) {
          botReply = "We offer free shipping on orders over a certain amount! See shipping rates on our website.";
        } else if (userMessage.includes("long") || userMessage.includes("delivery")) {
          botReply = "Delivery times vary depending on your location. You can find estimated delivery times during checkout.";
        }
         else {
           botReply = "See our website for all shipping info.";
        }
      }

      // General Inquiries
      else if (userMessage.includes("contact")) {
        botReply = "You can contact our customer support team via email at support@example.com or by phone at +1-555-123-4567."; // Replace with real contact info
      } else if (userMessage.includes("about us")) {
        botReply = "Kashvi Creations has been around since 1943! We're committed to handwoven sarees.";
      }
      // Add more conditions here for other saree-related questions

      setMessages([...newMessages, { text: botReply, sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col">
      <div className="bg-blue-600 text-white p-4 flex justify-between">
        <span>Chat Support</span>
        <button onClick={closeChat}>X</button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-200 ml-auto" : "bg-gray-200"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-2 flex">
        <input className="flex-1 p-2 border" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="bg-blue-500 text-white px-4" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
