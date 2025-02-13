import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, Layers, CreditCard, FileText, Mail, Lightbulb, UserPlus } from "lucide-react"; // Added Lightbulb and UserPlus icons
import { motion, AnimatePresence } from "framer-motion";
import Chatbot from "./chatbot";
import Head from "../../components/shopping-view/header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "../../components/common/WhatsAppButton";
const faqCategories = ["General", "Pricing", "Dashboard", "API"];
const faqData = [
  { id: 1, category: "General", question: "Is there a free trial available?", answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free 30-minute onboarding call to get you up and running." },
  { id: 2, category: "Pricing", question: "Can I change my plan later?", answer: "Yes, you can upgrade or downgrade your plan anytime from the settings page." },
  { id: 3, category: "Pricing", question: "What is your cancellation policy?", answer: "You can cancel anytime before your next billing cycle without any extra charges." },
  { id: 4, category: "Dashboard", question: "Can other info be added to an invoice?", answer: "Yes, you can customize your invoice details in the settings section." },
  { id: 5, category: "API", question: "How does billing work?", answer: "Billing is based on your selected plan and any additional API calls made beyond the included quota." },
];

const icons = { General: Layers, Pricing: CreditCard, Dashboard: FileText, API: Mail };

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [expandedId, setExpandedId] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const filteredFAQs = faqData.filter(
    (faq) => faq.category === selectedCategory && faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Head/>
    <div className="min-h-screen flex flex-col items-center px-6 py-16 bg-gray-100 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Frequently Asked Questions</h1>
      <p className="text-gray-700 mt-2 text-center">
        These are the most commonly asked questions. Can’t find what you’re looking for?{" "}
        <button onClick={() => setIsChatbotOpen(!isChatbotOpen)} className="text-blue-600 underline hover:text-blue-800 transition">
          Chat with us!
        </button>
      </p>

      {/* Chatbot */}
      {isChatbotOpen && (
        <div className="fixed bottom-10 right-10 z-50">
          <Chatbot closeChat={() => setIsChatbotOpen(false)} />
        </div>
      )}

      {/* Category Buttons */}
      <div className="mt-8 flex space-x-4 justify-center">
        {faqCategories.map((category) => (
          <button
            key={category}
            className={`px-5 py-3 rounded-full font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200 focus:outline-none ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white hover:bg-gray-200 shadow-sm"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative mt-8 w-full max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search questions"
          className="w-full pl-12 pr-4 py-3 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* FAQ List */}
      <div className="mt-12 w-full max-w-2xl space-y-6">
        {filteredFAQs.map((faq) => {
          const Icon = icons[faq.category];
          return (
            <div
              key={faq.id}
              className="rounded-2xl overflow-hidden bg-white shadow-lg transition-transform duration-200 hover:scale-105"
            >
              <motion.button
                className="w-full px-6 py-5 flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-5">
                  <Icon className="text-blue-500" size={24} />
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                </div>
                {expandedId === faq.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </motion.button>

              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="px-6 py-5 bg-gray-50 border-t border-gray-200"
                  >
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Did You Know Section */}
      <div className="mt-12 w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 flex items-center space-x-6">
        <Lightbulb className="text-yellow-500 h-12 w-12" />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Did you know?</h3>
          <p className="text-gray-700 leading-relaxed">
            Our sarees are handwoven by skilled artisans, ensuring the highest quality and attention to detail.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 underline mt-2 block">
            Learn more about our process
          </a>
        </div>
      </div>

      {/* Community Section */}
      <div className="mt-12 w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 flex items-center space-x-6">
        <UserPlus className="text-green-500 h-12 w-12" />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Join Our Community</h3>
          <p className="text-gray-700 leading-relaxed">
            Connect with other saree enthusiasts, share your style, and get exclusive access to new collections and events.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 underline mt-2 block">
            Join Now
          </a>
        </div>
      </div>
    </div>
    <WhatsAppButton />
    <Footer/>
    </div>
  );
};

export default FAQPage;
