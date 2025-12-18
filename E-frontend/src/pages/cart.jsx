import { useEffect, useState, useCallback } from "react";
import api from "../../axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    try {
      setError("");
      const res = await api.get("/cart");
      setCart(res.data || { items: [] });
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }
      setError("Unable to load cart.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.put(`/cart/${productId}`, { quantity });
      fetchCart();
    } catch (err) {
      console.error(err);
      setError("Failed to update quantity.");
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      fetchCart();
    } catch (err) {
      console.error(err);
      setError("Failed to remove item.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading cart...</div>;
  }

  const totalAmount =
    cart.items?.reduce((sum, item) => {
      const price = Number(item?.productId?.price) || 0;
      return sum + price * (item.quantity || 0);
    }, 0) || 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 uppercase tracking-widest">
        Cart
      </h1>

      {error && (
        <div className="mb-4 px-4 py-2 border border-red-500 text-red-700 bg-red-50">
          {error}
        </div>
      )}

      {!cart.items || cart.items.length === 0 ? (
        <div className="text-center text-gray-600">Your cart is empty.</div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map((item) => {
              const product = item.productId || {};
              const price = Number(product.price) || 0;
              const lineTotal = price * (item.quantity || 0);
              return (
                <div
                  key={product._id}
                  className="flex items-center justify-between border p-3"
                >
                  <div className="flex items-center gap-4">
                    {product.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${product.image}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover border"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 border flex items-center justify-center text-xs">No Img</div>
                    )}
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-sm text-gray-600">${price}</div>
                      <div className="text-xs text-gray-500">
                        Line total: ${lineTotal.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 py-1 border"
                      onClick={() =>
                        updateQuantity(product._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="w-10 text-center">{item.quantity}</span>
                    <button
                      className="px-2 py-1 border"
                      onClick={() =>
                        updateQuantity(product._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="text-red-600 font-semibold"
                    onClick={() => removeItem(product._id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col items-end gap-4">
            <div className="text-right">
              <div className="text-lg font-semibold">
                Total: ${totalAmount.toFixed(2)}
              </div>
            </div>

            <button
              onClick={async () => {
                try {
                  const res = await api.post("/orders");
                  if (res.status === 200) {
                    alert("Order placed successfully!");
                    setCart({ items: [] }); 
                    navigate("/orders");
                  }
                } catch (error) {
                  console.error(error);
                  alert("Failed to place order.");
                }
              }}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors uppercase tracking-wider font-medium"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
