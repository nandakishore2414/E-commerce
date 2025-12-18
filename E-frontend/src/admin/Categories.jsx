import React, { useEffect, useState, useCallback } from "react";
import api from "../../axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/admin/categories");
      setCategories(res.data.categorys || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await api.post("/admin/categories", { name: newCategory });
      if (res.data.success) {
        setNewCategory("");
        fetchCategories();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id) => {

    try {
      setIsLoading(true);
      const res = await api.put(`/admin/categories/${id}`, { name: editName });
      if (res.data.success) {
        setEditingId(null);
        setEditName("");
        fetchCategories();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        setIsLoading(true);
        const res = await api.delete(`/admin/categories/${id}`);
        if (res.data.success) {
          fetchCategories();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 uppercase tracking-widest">
        Categories
      </h2>


      {/* Add Category Form */}
      <div className="mb-6 sm:mb-8 border border-black p-4 sm:p-6 bg-gray-50">
        <form
          onSubmit={handleAdd}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="NEW CATEGORY NAME"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-black bg-transparent placeholder-gray-500 text-sm sm:text-base"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-black text-white font-bold uppercase hover:bg-gray-800 transition-colors rounded-none disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && categories.length === 0 && (
        <div className="text-center py-8">
          <div className="text-lg text-gray-600">Loading categories...</div>
        </div>
      )}

      {/* Categories Grid */}
      {categories.length === 0 && !isLoading ? (
        <div className="text-center py-8 sm:py-12 border border-gray-300 bg-gray-50">
          <p className="text-gray-600 text-sm sm:text-base">
            No categories found. Add your first category above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="border border-black p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white hover:bg-gray-50 transition-colors gap-3 sm:gap-0"
            >
              {editingId === category._id ? (
                <div className="flex-1 flex flex-col sm:flex-row gap-2 w-full">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 px-2 sm:px-3 py-1 sm:py-2 border border-black rounded-none focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
                    disabled={isLoading}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(category._id)}
                      disabled={isLoading}
                      className="text-green-600 font-bold hover:text-green-800 disabled:opacity-50 text-xs sm:text-sm px-2"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditName("");
                      }}
                      disabled={isLoading}
                      className="text-gray-600 font-bold hover:text-gray-800 disabled:opacity-50 text-xs sm:text-sm px-2"
                    >
                      X
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-base sm:text-lg uppercase  flex-1">
                    {category.name}
                  </h3>
                  <div className="flex space-x-3 sm:space-x-4">
                    <button
                      onClick={() => {
                        setEditingId(category._id);
                        setEditName(category.name);
                      }}
                      disabled={isLoading}
                      className="text-xs sm:text-sm font-bold underline hover:text-gray-600 disabled:opacity-50"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      disabled={isLoading}
                      className="text-xs sm:text-sm font-bold underline text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      DEL
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
