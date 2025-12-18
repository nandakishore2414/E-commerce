import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("/admin/login", { email, password });
      if (response.data.message === "Login successful") {
        alert("Admin Login successful.");
        navigate("/admin");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      alert(errorMessage);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-black p-10">
        <h2 className="text-3xl font-bold text-center mb-8 uppercase tracking-widest">
          Admin Login
        </h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-black rounded-none outline-none focus:bg-gray-50"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-xs font-bold uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-black rounded-none outline-none focus:bg-gray-50"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-none text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
