import { useEffect, useState } from "react";
import api from "../../axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", category: "", image: null });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/categories");
      setCategories(res.data.categorys || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('price', form.price);
      formData.append('category', form.category);
      if (form.image) {
        formData.append('image', form.image);
      }

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      if (editingId) {
        await api.put(`/admin/product/${editingId}`, formData, config);
      } else {
        await api.post("/admin/product", formData, config);
      }
      setForm({ name: "", price: "", category: "", image: null });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category?._id || product.category || "",
      image: null
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await api.delete(`/admin/product/${id}`);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest">Products</h2>

      {/* Form */}
      <div className="mb-8 border border-black p-6 bg-gray-50">
        <h3 className="text-lg font-bold mb-4 uppercase">{editingId ? "Edit Product" : "Add Product"}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-black rounded-none focus:outline-none focus:bg-white bg-transparent"
              required
            />
          </div>
          <div className="w-full sm:w-32">
            <label className="block text-xs font-bold uppercase mb-1">Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-3 py-2 border border-black rounded-none focus:outline-none focus:bg-white bg-transparent"
              required
            />
          </div>
          <div className="w-full sm:w-48">
            <label className="block text-xs font-bold uppercase mb-1">Image</label>
            <input
              type="file"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
              className="w-full px-3 py-2 border border-black rounded-none focus:outline-none focus:bg-white bg-transparent text-sm"
            />
          </div>
          <div className="w-full sm:w-48">
            <label className="block text-xs font-bold uppercase mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 border border-black rounded-none focus:outline-none focus:bg-white bg-transparent"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white font-bold uppercase hover:bg-gray-800 transition-colors rounded-none"
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setForm({ name: "", price: "", category: "", image: null });
                setEditingId(null);
              }}
              className="px-6 py-2 border border-black text-black font-bold uppercase hover:bg-gray-200 transition-colors rounded-none"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Table */}
      <div className="border border-black">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black bg-gray-100">
              <th className="p-4 font-bold border-r border-black">Image</th>
              <th className="p-4 font-bold border-r border-black">Name</th>
              <th className="p-4 font-bold border-r border-black">Price</th>
              <th className="p-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-black last:border-0 hover:bg-gray-50">
                <td className="p-4 border-r border-black">
                  {product.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.name}
                      className="w-12 h-12 object-cover border border-black"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 border border-black flex items-center justify-center text-xs">
                      N/A
                    </div>
                  )}
                </td>
                <td className="p-4 border-r border-black">{product.name}</td>
                <td className="p-4 border-r border-black">${product.price}</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-sm font-bold underline hover:text-gray-600"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-sm font-bold underline text-red-600 hover:text-red-800"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
