import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [recipientName, setRecipientName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const cleanName = recipientName.trim().toLowerCase().replace(/\s+/g, "-");
    navigate(`/rooms/${cleanName}`);
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-light font-serif text-gray-800 mb-6">
              Start a Private Chat
            </h1>
            <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient's Name*
                  </label>
                  <input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E5989B] focus:border-[#E5989B]"
                    placeholder="e.g., Priya Sharma"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#E5989B] text-white rounded-md hover:bg-[#d88a8d]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Starting..." : "Start Chat"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateRoom;