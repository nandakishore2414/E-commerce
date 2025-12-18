import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-8">
      <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Management</h2>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link to="/admin/users" className="w-64 h-32 border-2 border-black flex items-center justify-center text-xl font-bold hover:bg-black hover:text-white transition-colors uppercase tracking-wider">
          Users
        </Link>

        <Link to="/admin/products" className="w-64 h-32 border-2 border-black flex items-center justify-center text-xl font-bold hover:bg-black hover:text-white transition-colors uppercase tracking-wider">
          Products
        </Link>

        <Link to="/admin/categories" className="w-64 h-32 border-2 border-black flex items-center justify-center text-xl font-bold hover:bg-black hover:text-white transition-colors uppercase tracking-wider">
          Categories
        </Link>

        <Link to="/admin/orders" className="w-64 h-32 border-2 border-black flex items-center justify-center text-xl font-bold hover:bg-black hover:text-white transition-colors uppercase tracking-wider">
          Orders
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
