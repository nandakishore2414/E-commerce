import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import api from "../../axios";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);
  
  const checkLoginStatus = async () => {
    try {
      const res = await api.get("/admin/check");
      setIsLoggedIn(res.data.loggedIn);
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await api.delete("/logout");
      setIsLoggedIn(false);
      navigate("/admin/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/*top Bar */}
      <header className="border-b border-black px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-widest uppercase">Admin Panel</h1>
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/admin" className="hover:underline">Dashboard</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:underline text-red-600">Logout</button>
          ) : (
            <Link to="/admin/login" className="hover:underline text-blue-600">Login</Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminLayout;
