import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb";

export default function DetailBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/kitoblar/${id}`);
        setBook(res.data.data);
      } catch (err) {
        setError("Kitob topilmadi yoki tarmoq xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) return <div className="p-6">Yuklanmoqda...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!book) return <div className="p-6">Ma'lumot topilmadi</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb / Path */}
      <div className="text-sm text-gray-500 mb-2">
        <Breadcrumb bookName={book.nomi} />
      </div>
      <h1 className="text-xl font-semibold mb-6 text-gray-900">
        Kitob tafsilotlari
      </h1>

      {/* Book Detail Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-6">
          {/* Image */}
          <div>
            {book.rasm ? (
              <img
                src={book.rasm}
                alt={book.nomi}
                className="w-32 h-40 object-cover rounded border"
              />
            ) : (
              <div className="w-32 h-40 flex items-center justify-center bg-gray-100 rounded text-gray-400 border">
                Rasm yo‘q
              </div>
            )}
          </div>
          {/* Title + PDF link */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {book.nomi} <span className="text-gray-400 font-normal">#{id}</span>
            </h2>
            {book.kitob_file ? (
              <a
                href={book.kitob_file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-3 py-1 rounded text-sm font-medium"
              >
                PDF ko‘rish/yuklab olish
              </a>
            ) : (
              <div className="text-gray-400 text-sm">PDF yo‘q</div>
            )}
          </div>
        </div>
        {/* Basic info grid */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Muallif:</span>{" "}
            {book.muallif || "-"}
          </p>
          
          <p>
            <span className="font-semibold">Nashriyot:</span>{" "}
            {book.nashriyot || "-"}
          </p>
          <p>
            <span className="font-semibold">Nashr yili:</span>{" "}
            {book.nashr_etilgan_yili || "-"}
          </p>
          <p>
            <span className="font-semibold">Inventar raqam:</span>{" "}
            {book.inventar_raqam || "-"}
          </p>
          <p>
            <span className="font-semibold">Kategoriya:</span>{" "}
            {book.kategoriya || "-"}
          </p>
          <p>
            <span className="font-semibold">Kitob soni:</span>{" "}
            {book.soni || "-"}
          </p>
          <p>
            <span className="font-semibold">Stelyaj:</span>{" "}
            {book.stilaj || "-"}
          </p>
          <p>
            <span className="font-semibold">Tili:</span>{" "}
            {book.kitob_tili || "-"}
          </p>
          <p>
            <span className="font-semibold">Shahar:</span>{" "}
            {book.shahar || "-"}
          </p>
          <p>
            <span className="font-semibold">Sohasi:</span>{" "}
            {book.sohasi || "-"}
          </p>
          <p>
            <span className="font-semibold">Izoh:</span>{" "}
            {book.izoh || "-"}
          </p>
          
        </div>
      </div>
    </div>
  );
}
