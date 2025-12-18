import React, { useEffect, useState } from "react";
import api from "../../axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const toggleStatus = async (id) => {
    try {
      await api.put(`/admin/users/${id}/toggle`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest">User Management</h2>

      <div className="border border-black">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black bg-gray-100">
              <th className="p-4 font-bold border-r border-black">Name</th>
              <th className="p-4 font-bold border-r border-black">Email</th>
              <th className="p-4 font-bold border-r border-black">Status</th>
              <th className="p-4 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-black last:border-0 hover:bg-gray-50">
                <td className="p-4 border-r border-black">{user.name}</td>
                <td className="p-4 border-r border-black">{user.email}</td>
                <td className="p-4 border-r border-black">
                  <span className={`px-2 py-1 text-xs font-bold uppercase ${user.isActive ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleStatus(user._id)}
                    className={`px-4 py-1 border border-black text-xs font-bold uppercase transition-colors ${user.isActive
                      ? "hover:bg-red-600 hover:text-white hover:border-red-600"
                      : "hover:bg-green-600 hover:text-white hover:border-green-600"
                      }`}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
