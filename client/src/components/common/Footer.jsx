import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#f8f4f0] text-[#6b3d2f]">
      {/* Newsletter Section */}
      <div className="bg-[#0a373b] text-white py-6 text-center">
        <h2 className="text-xl font-semibold uppercase">Discover Elegant Sarees First</h2>
        <div className="mt-4 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            className="px-4 py-2 rounded-l-md text-black focus:outline-none"
          />
          <button className="bg-white text-[#0a373b] px-6 py-2 rounded-r-md font-semibold hover:bg-gray-200">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm"> {/* Changed to grid-cols-5 */}
        {/* Shop */}
        <div>
          <h2 className="text-lg font-semibold uppercase">Shop</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:text-[#0a373b]">Video Shopping</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-semibold uppercase">Contact Us</h2>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center space-x-2"><Phone size={16} /><span>+91 9059564499</span></li>
            <li className="flex items-center space-x-2"><Mail size={16} /><span>hello@kashvi.com</span></li>
            <li className="flex items-start space-x-2"><MapPin size={16} /><span>Kashvi, V Square, Dwarakanagar, Visakhapatnam - 530016</span></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold uppercase">Support</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="/reach-us/contact-page" className="hover:text-[#0a373b]">Reach Us</a></li>
            <li><a href="/FAQ/FAQPage" className="hover:text-[#0a373b]">FAQ</a></li>
          </ul>
        </div>

        {/* User Policy */}
        <div>
          <h2 className="text-lg font-semibold uppercase">User Policy</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="/privacy-policy" className="hover:text-[#0a373b]">Privacy Policy</a></li>
            <li><a href="/terms-conditions" className="hover:text-[#0a373b]">Terms & Conditions</a></li>
            <li><a href="/disclaimer" className="hover:text-[#0a373b]">Disclaimer</a></li>
          </ul>
        </div>

        {/* More Section */}
        <div>
          <h2 className="text-lg font-semibold uppercase">More</h2>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:text-[#0a373b]">Store Locations</a></li>
            <li><a href="/AboutUs" className="hover:text-[#0a373b]">About Us</a></li>
            <li><a href="/event" className="hover:text-[#0a373b]">Events</a></li>
            <li><a href="/blog" className="hover:text-[#0a373b]">Blog</a></li>
          </ul>
        </div>
      </div>

      {/* Company Branding & Address */}
      <div className="text-center py-8 border-t border-gray-300">
        <h2 className="text-2xl font-semibold uppercase">Kashvi Creations</h2>
        <p className="mt-2">Since 1943</p>
        <p className="mt-4 text-sm">Kashvi Corporate, V Square, Dwarakanagar, Visakhapatnam - 530016</p>
        <p className="text-sm">CIN: U17119AP2005PTC046645</p>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 mt-4">
        <a href="#" className="text-[#0a373b] hover:text-gray-700"><i className="fab fa-facebook"></i></a>
        <a href="#" className="text-[#0a373b] hover:text-gray-700"><i className="fab fa-instagram"></i></a>
        <a href="#" className="text-[#0a373b] hover:text-gray-700"><i className="fab fa-youtube"></i></a>
        <a href="#" className="text-[#0a373b] hover:text-gray-700"><i className="fab fa-twitter"></i></a>
        <a href="#" className="text-[#0a373b] hover:text-gray-700"><i className="fab fa-pinterest"></i></a>
      </div>
    </footer>
  );
};
export default Footer;
