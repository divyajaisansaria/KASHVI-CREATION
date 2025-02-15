import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast"; // Toast notifications
import Sidebar from "@/components/admin-view/sidebar"; // ✅ Correct Sidebar Import

const InquiryPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const { toast } = useToast(); // Toast notifications

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("token"); // Admin token
        const response = await axios.get("http://localhost:5000/api/contacts", { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) { 
          setInquiries(response.data.data); // ✅ Access correct data key
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch inquiries.",
          variant: "destructive",
        });
        console.error("Error fetching inquiries:", error);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8f4f0]">
      {/* Sidebar - Now Fully #f8f4f0 */}
      <div className="w-64 h-screen fixed top-0 left-0 bg-[#f8f4f0] shadow-lg border-r border-gray-300">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-grow p-6 ml-64">
        <h2 className="text-3xl font-bold text-[#0a373b] mb-6">Customer Inquiries</h2>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 border border-gray-300">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-[#0a373b] text-white text-sm uppercase tracking-wider sticky top-0">
              <tr>
                <th className="p-3 border border-gray-300 text-left">Name</th>
                <th className="p-3 border border-gray-300 text-left">Contact</th>
                <th className="p-3 border border-gray-300 text-left">Email</th>
                <th className="p-3 border border-gray-300 text-left">Subject</th>
                <th className="p-3 border border-gray-300 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length > 0 ? (
                inquiries.map((inquiry, index) => (
                  <tr key={inquiry._id} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
                    <td className="p-3 border border-gray-300">{inquiry.name}</td>
                    <td className="p-3 border border-gray-300">{inquiry.contactn}</td>
                    <td className="p-3 border border-gray-300">{inquiry.email}</td>
                    <td className="p-3 border border-gray-300">{inquiry.subject}</td>
                    <td className="p-3 border border-gray-300">{inquiry.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-600">
                    No inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View (Cards) */}
        <div className="md:hidden">
          {inquiries.length > 0 ? (
            inquiries.map((inquiry) => (
              <div key={inquiry._id} className="bg-white shadow-md rounded-lg p-4 my-4 border border-gray-300">
                <h3 className="text-lg font-semibold text-[#0a373b]">{inquiry.name}</h3>
                <p className="text-sm text-gray-500">{inquiry.email} | {inquiry.contactn}</p>
                <p className="text-gray-700 mt-2 font-medium">{inquiry.subject}</p>
                <p className="text-gray-600 mt-1">{inquiry.message}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center mt-4">No inquiries found.</p>
          )}
        </div>
      </main>
    </div>
  );
};
export default InquiryPage;
