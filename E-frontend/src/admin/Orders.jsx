import React, { useEffect, useState } from "react";
import api from "../../axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await api.delete(`/admin/orders/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  if (loading) {
    return <div className="p-4">Loading orders...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest">
        Orders Management
      </h2>

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 font-semibold">Order ID</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold">Items</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-8 text-center text-gray-500 text-lg"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 text-sm text-gray-500 font-mono">
                    {order._id}
                  </td>
                  <td className="p-4 text-gray-600 space-y-1">
                    <div className="font-medium">
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-green-600 font-mono">
                    ${(order.totalAmount || 0).toFixed(2)}
                  </td>
                  <td className="p-4 text-gray-600 text-sm">
                    {order.items?.map((item, index) => (
                      <div key={index} className="whitespace-nowrap">
                        <span className="font-bold">{item.quantity}x</span>{" "}
                        {item.productId?.name || "Product"}
                      </div>
                    ))}
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status || "Placed"}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border-0 outline-none cursor-pointer
                                                ${
                                                  order.status === "Cancelled"
                                                    ? "bg-red-100 text-red-800"
                                                    : order.status ===
                                                      "Delivered"
                                                    ? "bg-green-100 text-green-800"
                                                    : order.status === "Shipped"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : order.status ===
                                                      "Processing"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                    >
                      <option value="Placed">Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="text-red-500 hover:text-red-700 font-medium text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
