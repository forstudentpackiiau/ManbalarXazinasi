import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function EditCategory() {
  const { id } = useParams();
  
  const [oldCategoryName, setOldCategoryName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategory() {
      setFetching(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:3000/kategoriya/${id}`);
        setOldCategoryName(res.data.data.nomi);
      } catch (err) {
        setError("Kategoriya ma'lumotlarini olishda xatolik yuz berdi");
        toast.error("Kategoriya ma'lumotlarini olishda xatolik yuz berdi");
      } finally {
        setFetching(false);
      }
    }
    fetchCategory();
  }, [id]);

  const handleUpdateCategory = async () => {
    if (!newCategoryName.trim()) {
      setError("Yangi kategoriya nomi bo'sh bo'lishi mumkin emas");
      toast.error("Yangi kategoriya nomi bo'sh bo'lishi mumkin emas");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      await axios.patch(`http://localhost:3000/kategoriya/${id}`, { nomi: newCategoryName });
      toast.success("Kategoriya muvaffaqiyatli yangilandi!");
      setTimeout(() => navigate("/category-books"), 1000);
    } catch (err) {
      console.error("Kategoriya yangilashda xatolik:", err);
      setError("Kategoriya yangilashda xatolik yuz berdi");
      toast.error("Kategoriya yangilashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <Toaster position="top-center" />

      <div className="text-sm text-muted-foreground mb-2">
        <Breadcrumb categoryName={oldCategoryName}/>
      </div>
      <h1 className="text-2xl font-semibold mb-6">Kategoriya tahrirlash</h1>

      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-lg font-semibold mb-4">Kategoriyani yangilash</h2>

        {fetching ? (
          <div className="text-center text-gray-500">Yuklanmoqda...</div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Hozirgi kategoriya nomi
              </label>
              <input
                type="text"
                className="border rounded px-3 py-2 text-sm bg-gray-100 cursor-not-allowed w-full"
                value={oldCategoryName}
                disabled
                readOnly
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Yangi kategoriya nomi
              </label>
              <input
                type="text"
                placeholder="Kategoriyani yangi nomini kiriting"
                className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleUpdateCategory}
              disabled={loading || !newCategoryName.trim()}
            >
              {loading ? "Yozilmoqda..." : "Yangilash"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
