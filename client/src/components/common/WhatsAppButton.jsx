import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "7405242162";
  
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg cursor-pointer flex items-center justify-center transition-all duration-300"
      onClick={handleClick}
      style={{ width: "60px", height: "60px" }}
    >
      <FaWhatsapp size={32} />
    </div>
  );
};

export default WhatsAppButton;
