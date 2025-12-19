import React, { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { LogginContext } from "../Context/LogginContext";


function ProductCard({ product }) {
  const navigate = useNavigate();
  useContext(LogginContext);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  const formattedPrice = product.price ? product.price.toFixed(2) : '0.00';

  const handleAddToCart = async () => {
    try {
      setError("");
      setAdding(true);
      await api.post("/user/cart", { productId: product._id, quantity: 1 });
      navigate("/cart");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }
      setError("Failed to add to cart. Please try again.");
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="group relative border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">

      <div className="aspect-h-4 aspect-w-3 w-full overflow-hidden rounded-md bg-gray-100 lg:aspect-h-8 lg:aspect-w-7">
        <img
          src={product.image ? `/api/uploads/${product.image}` : (product.imageUrl || 'https://via.placeholder.com/600x800.png?text=Product+Image')}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
        />

      </div>


      {/* Product Details */}
      <div className="pt-4 pb-2">
        <h3 className="text-sm font-medium text-gray-700">{product.name}</h3>
        <p className="mt-1 text-lg font-bold text-gray-900">${formattedPrice}</p>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={adding}
        className="mt-3 w-full px-3 py-2 bg-black text-white text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 disabled:opacity-50"
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>

      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

// ProductList
function ProductList() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get('/user/products');
        setProducts(res.data);
        setIsLoading(false);
      } catch (err) {
        //API errors
        setError(err.message);
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-xl font-medium text-gray-700">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>Failed to load products: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Our Collection</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center mt-12 text-gray-500 text-xl border-t pt-8">
            No products available at this time.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;