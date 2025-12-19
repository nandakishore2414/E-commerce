import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.get("/user/categories");
        setCategories(res.data.categories);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        return console.error("categroy fetch error",error);
      }
    }
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="text-xl font-medium text-gray-700">
          Loading categories...
        </div>
      </div>
    );
  }

  return (
    <section className="px-6 md:px-16 lg:px-24 py-12 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-semibold">Top Brands</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/category/${category.slug}`}
            className="w-full group"
          >
            {/* Card */}
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
              <span className="absolute top-4 left-4 bg-white text-black text-sm px-4 py-1 rounded-full shadow z-10">
                View
              </span>

              <div className="w-full h-80 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-600">
                  {category.name.charAt(0)}
                </span>
              </div>
            </div>

            {/* Category Info */}
            <div className="mt-4">
              <h3 className="text-lg font-medium group-hover:text-blue-800 transition-colors">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center mt-12 text-gray-500 text-xl">
          No categories available at this time.
        </div>
      )}
    </section>
  );
}

export default CategoryList;
