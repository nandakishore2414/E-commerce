import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../axios";
import { LogginContext } from "../../Context/LogginContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const { isLogged, setIsLogged } = useContext(LogginContext)


  async function handleLogin(e) {
    e.preventDefault()
    try {
      const res = await api.post("/login", { email, password })
      setIsLogged(true)
      console.log(res)
      alert("Login successfull.")
      navigate("/")

    } catch (error) {
      console.log(error)
    }

  }

  async function handleLogout() {
    try {
      const res = await api.post("/logout")
      console.log(res)
      alert("Logout success")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-10 border border-gray-100">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-6 tracking-tight">
          Login
        </h2>

        {/* Form */}
        <form className="space-y-6 " onSubmit={handleLogin}>
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
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg text-sm tracking-wide hover:bg-gray-800 transition"
          >
            LOG IN
          </button>
        </form>

        {/* Forgot Password */}
        <p className="text-center text-sm mt-4 text-gray-600 cursor-pointer hover:underline">
          Forgot Password?
        </p>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <span className="h-px w-full bg-gray-300"></span>
          <span className="text-gray-500 text-sm">or</span>
          <span className="h-px w-full bg-gray-300"></span>
        </div>

        {/* Create account */}
        <p className="text-center text-sm text-gray-700">
          Don’t have an account?
          <span>
            <Link to="/register" className="font-semibold pl-1 cursor-pointer hover:underline">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
}


