import React, { useEffect, useState } from "react";
import api from "../../axios";
import { Link } from "react-router-dom";
import Navbar from "../component/NavBar";
import Footer from "../component/Footer";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper function to fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      // Sort by Date Descending
      const sortedOrders = (res.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load your orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await api.delete(`/order/${orderId}`);
      fetchOrders();
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel order.");
    }
  };

  // filter into Recent
  const activeOrders = orders.filter((o) =>
    ["Placed", "Processing", "Shipped"].includes(o.status)
  );
  const historyOrders = orders.filter((o) =>
    ["Delivered", "Cancelled"].includes(o.status)
  );

  const OrderCard = ({ order }) => (
    <div
      key={order._id}
      className="border border-black bg-white p-6 shadow-sm hover:shadow-md transition-shadow mb-6"
    >
      {/* Order Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-4">
        <div>
          <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">
            Order ID
          </span>
          <span className="font-mono text-sm">{order._id}</span>
        </div>
        <div>
          <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">
            Date Placed
          </span>
          <span className="text-sm">
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div>
          <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">
            Total Amount
          </span>
          <span className="font-bold text-lg">
            ${(order.totalAmount || 0).toFixed(2)}
          </span>
        </div>
        <div>
          <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">
            Status
          </span>
          <span
            className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
              order.status === "Cancelled"
                ? "bg-red-100 text-red-800"
                : order.status === "Delivered"
                ? "bg-green-100 text-green-800"
                : order.status === "Shipped"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        {order.items.map((item, idx) => {
          const product = item.productId || {};
          return (
            <div key={idx} className="flex items-center gap-4">
              {/* Product Image */}
              <div className="w-16 h-16 srink border border-gray-200 bg-gray-50 overflow-hidden">
                {product.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    No Img
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h4 className="font-bold text-sm md:text-base">
                  {product.name || "Product Unavailable"}
                </h4>
                <div className="text-sm text-gray-500">
                  Qty: {item.quantity} x ${product.price?.toFixed(2)}
                </div>
              </div>

              {/* Line Total */}
              <div className="text-right font-medium">
                ${((product.price || 0) * item.quantity).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3">
        {order.status === "Placed" && (
          <button
            onClick={() => handleCancelOrder(order._id)}
            className="text-red-600 hover:text-red-800 text-sm font-bold uppercase underline tracking-wide"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] pt-20">
          <div className="text-xl font-medium tracking-wide">
            Loading your orders...
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 pt-20">
          <div className="text-red-600 text-lg">{error}</div>
          <Link to="/" className="underline hover:text-gray-600">
            Return Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen pt-24">
        <h1 className="text-3xl font-bold mb-8 uppercase tracking-widest text-center">
          Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-12 border-t mt-8">
            <p className="text-gray-500 text-lg mb-6">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-12 mt-8">
            {/* Recent / Active Orders */}
            {activeOrders.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-6 uppercase tracking-wider border-b border-black pb-2">
                  Recent Active Orders
                </h2>
                <div>
                  {activeOrders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                  ))}
                </div>
              </div>
            )}

            {/* Order History */}
            {historyOrders.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-6 uppercase tracking-wider border-b border-gray-300 pb-2 text-gray-700">
                  Order History
                </h2>
                <div>
                  {historyOrders.map((order) => (
                    <OrderCard key={order._id} order={order} />
                  ))}
                </div>
              </div>
            )}

            {activeOrders.length === 0 && historyOrders.length === 0 && (
              <div className="text-center text-gray-500">
                No matching orders found.
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Orders;
