import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../axios";
import Navbar from "./NavBar";
import Footer from "./Footer";

function ProductCard({ product }) {
  const formattedPrice = product.price ? product.price.toFixed(2) : '0.00';

  return (
    <div className="group relative border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-h-4 aspect-w-3 w-full overflow-hidden rounded-md bg-gray-100 lg:aspect-h-8 lg:aspect-w-7">
        <img
          src={product.image ? `http://localhost:5000/uploads/${product.image}` : 'https://via.placeholder.com/600x800.png?text=No+Image'}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="pt-4 pb-2">
        <h3 className="text-sm font-medium text-gray-700">{product.name}</h3>
        <p className="mt-1 text-lg font-bold text-gray-900">${formattedPrice}</p>
      </div>
    </div>
  );
}

function CategoryProducts() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const categoriesRes = await api.get('/categories');
        const foundCategory = categoriesRes.data.categories.find(
          cat => cat.slug === slug
        );

        if (!foundCategory) {
          setError('Category not found');
          setIsLoading(false);
          return;
        }

        setCategory(foundCategory);

        // Fetch all products
        const productsRes = await api.get('/products');

        // Filter products by category ID
        const filteredProducts = productsRes.data.filter(product => {
          if (!product.category) return false;

          if (typeof product.category === 'object' && product.category._id) {
            return product.category._id === foundCategory._id ||
              product.category._id.toString() === foundCategory._id.toString();
          }

          // If category is just an ID string
          if (typeof product.category === 'string') {
            return product.category === foundCategory._id ||
              product.category === foundCategory._id.toString();
          }

          return false;
        });

        setProducts(filteredProducts);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching category products:', err);
        setError(err.response?.data?.error || err.message || 'Failed to load products');
        setIsLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-40 min-h-screen">
          <div className="text-xl font-medium text-gray-700">Loading products...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="text-center text-red-600 p-8 min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Go back to home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          {/* Category Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
            >
              - Back to Home
            </Link>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mt-4">
              {category?.name} Products
            </h2>
            <p className="mt-2 text-gray-600">
              {products.length} {products.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {/* Products*/}
          {products.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center mt-12 text-gray-500 text-xl border-t pt-8">
              No products available in this category.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryProducts;

