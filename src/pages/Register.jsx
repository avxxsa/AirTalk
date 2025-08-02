import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addUserToIDB } from "../utils/db";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/rooms";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hashed = await hashPassword(formData.password.trim());

      await addUserToIDB({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: hashed,
      });

      navigate(from, { replace: true });
    } catch (err) {
      setError("Failed to register user.");
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8">
              <h1 className="text-2xl font-medium mb-4">Create Account</h1>
              {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    className="w-full px-3 py-2 border rounded"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border rounded"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-3 py-2 border rounded"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#E5989B] text-white py-2 rounded hover:bg-[#d88a8d]"
                >
                  Create Account
                </button>
              </form>
              <p className="text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-[#E5989B]">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
