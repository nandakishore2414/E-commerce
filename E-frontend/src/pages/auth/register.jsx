import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";


export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()


  async function handleRegister(event) {
    event.preventDefault();
    try {
      const res = await api.post("/user/register", { name, email, password });
      console.log(res);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log("Error in registration", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  }
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-10 border border-gray-100">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-6 tracking-tight">
          Create Account
        </h2>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleRegister}>
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm"
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg text-sm tracking-wide hover:bg-gray-800 transition"
          >
            SIGN UP
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <span className="h-px w-full bg-gray-300"></span>
          <span className="text-gray-500 text-sm">or</span>
          <span className="h-px w-full bg-gray-300"></span>
        </div>

        {/* Already have account */}
        <p className="text-center text-sm text-gray-700">
          Already have an account?
          <span>
            <Link to="/login" className="font-semibold pl-1 cursor-pointer hover:underline">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
