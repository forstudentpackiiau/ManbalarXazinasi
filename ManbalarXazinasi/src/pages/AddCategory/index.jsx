import React, { useState } from "react";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      setError("Kategoriya nomi bo'sh bo'lishi mumkin emas");
      toast.error("Kategoriya nomi bo'sh bo'lishi mumkin emas");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      await axios.post(`${API}/kategoriya`, { nomi: categoryName });
      toast.success("Kategoriya muvaffaqiyatli qo'shildi!");
      setTimeout(() => navigate("/category-books"), 1000); // wait 1s before navigation
    } catch (err) {
      console.error("Kategoriya qo'shishda xatolik:", err);
      setError("Kategoriya qo'shishda xatolik yuz berdi");
      toast.error("Kategoriya qo'shishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Toast container */}
      <Toaster position="top-center" />

      <div className="text-sm text-muted-foreground mb-2">
        <Breadcrumb />
      </div>
      <h1 className="text-2xl font-semibold mb-6">Kategoriya qo'shish</h1>

      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Yangi kategoriyani qo'shish</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Kategoriya nomi"
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            disabled={loading}
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={handleAddCategory}
            disabled={loading}
          >
            {loading ? "Yozilmoqda..." : "Qo'shish"}
          </button>
        </div>
      </div>
    </div>
  );
}
