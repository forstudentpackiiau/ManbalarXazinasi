import React, { useEffect, useState, useRef } from "react";
import { Eye, Pencil, Trash, Download, AlignJustify } from "lucide-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";

const BooksByCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [dropdownIndex, setDropdownIndex] = useState(null);
  const dropdownRef = useRef(null);
  const API = process.env.REACT_APP_API_URL;

  const PAGE_SIZE = 5;
  const permissions = {
    editAcsess: true, // change as needed
    deleteAcsess: true,
  };

  // Fetch category name
  useEffect(() => {
    async function fetchCategoryName() {
      try {
        const res = await axios.get(`${API}/kategoriya/${categoryId}`);
        setCategoryName(res.data.data.nomi);
        setCurrentPage(1);
      } catch (err) {
        setError("Kategoriya nomini olishda xatolik yuz berdi");
      }
    }
    fetchCategoryName();
  }, [categoryId]);

  // Fetch all books
  useEffect(() => {
    if (!categoryName) return;
    async function fetchBooks() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API}/kitoblar`, {
          params: {
            _limit: 100,
            _page: 1,
          },
        });
        setAllBooks(res.data.data || res.data);
      } catch {
        setError("Kitoblarni olishda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [categoryName]);

  // Filtering and pagination
  useEffect(() => {
    if (!categoryName) return;
    let filtered = allBooks.filter(
      (book) =>
        book.kategoriya === categoryName &&
        (searchTerm.trim() === "" ||
          (book.nomi && book.nomi.toLowerCase().includes(searchTerm.trim().toLowerCase())))
    );
    setTotalPages(Math.ceil(filtered.length / PAGE_SIZE) || 1);
    const start = (currentPage - 1) * PAGE_SIZE;
    setFilteredBooks(filtered.slice(start, start + PAGE_SIZE));
  }, [allBooks, categoryName, searchTerm, currentPage]);

  // Dropdown outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Book delete
  const handleDelete = (id) => {
    if (window.confirm("Kitobni o'chirishni tasdiqlaysizmi?")) {
      setAllBooks((prev) => prev.filter((b) => b.id !== id));
      setDropdownIndex(null);
      // You should also call API here
    }
  };

  // Helper: highlight search matches
  function highlight(text, term) {
    if (!term) return text;
    const regex = new RegExp(
      `(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    return String(text)
      .split(regex)
      .map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 px-0.5 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      );
  }

  // Pagination
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="h-auto bg-gray-50 p-8 min-h-screen">
      <div className="mb-2 text-sm text-gray-500">
        <Breadcrumb categoryName={categoryName}/>
      </div>
      <div className="max-w-full bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-lg text-gray-800">
            Kategoriya: {categoryName} 
          </h2>
          <input
            type="text"
            placeholder="Qidiruv"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-all duration-150"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{ minWidth: 180 }}
          />
        </div>
        {loading ? (
          <div className="text-center py-10 text-gray-500 text-base">
            Yuklanmoqda...
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-10">{error}</div>
        ) : (
          <div className="overflow-x-auto rounded-lg h-[50vh]">
            <table className="w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 font-semibold text-gray-600 text-center">Nomi</th>
                  <th className="p-3 font-semibold text-gray-600 text-center">Soni</th>
                  <th className="p-3 font-semibold text-gray-600 text-center">Stelyaj</th>
                  <th className="p-3 font-semibold text-gray-600 text-center">Muallif</th>
                  <th className="p-3 font-semibold text-gray-600 text-center">Tili</th>
                  <th className="p-3 font-semibold text-gray-600 text-center">Harakatlar</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      Kitoblar topilmadi
                    </td>
                  </tr>
                ) : (
                  filteredBooks.map((book, idx) => (
                    <tr
                      key={book.id}
                      className="transition-all duration-100 hover:bg-gray-100 rounded-xl"
                      style={{ borderBottom: "1px solid #F1F3F5" }}
                    >
                      
                      <td className="p-3 text-center">{highlight(book.nomi, searchTerm)}</td>
                      <td className="p-3 text-center">{highlight(book.soni, searchTerm)}</td>
                      <td className="p-3 text-center">{highlight(book.stilaj, searchTerm)}</td>
                      <td className="p-3 text-center">{highlight(book.muallif, searchTerm)}</td>
                      <td className="p-3 text-center">{highlight(book.kitob_tili, searchTerm)}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() =>
                            setDropdownIndex(dropdownIndex === idx ? null : idx)
                          }
                          className="text-blue-500 relative m-auto flex items-center px-2 py-1 rounded hover:bg-gray-100"
                        >
                          <AlignJustify size={16} />
                          <span className="ml-1 text-center">Harakatlar</span>
                        </button>
                        {dropdownIndex === idx && (
                          <div
                            ref={dropdownRef}
                            className="absolute w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
                          >
                            <ul>
                              <li
                                className="px-4 py-3 hover:bg-gray-100 text-blue-600 cursor-pointer rounded-t-xl flex items-center justify-start"
                                onClick={() => {
                                  navigate(`/books/${book.id}`);
                                  setDropdownIndex(null);
                                }}
                              >
                                <Eye size={16} className="inline mr-2 align-middle" />
                                Ko‘rish
                              </li>
                              {permissions.editAcsess && (
                                <li
                                  className="px-4 py-3 hover:bg-gray-100 text-yellow-600 cursor-pointer flex items-center justify-start"
                                  onClick={() => {
                                    navigate(`/add-book?id=${book.id}`);
                                    setDropdownIndex(null);
                                  }}
                                >
                                  <Pencil size={16} className="inline mr-2 align-middle" />
                                  Tahrirlash
                                </li>
                              )}
                              {permissions.deleteAcsess && (
                                <li
                                  className="px-4 py-3 hover:bg-gray-100 text-red-600 cursor-pointer flex items-center justify-start"
                                  onClick={() => {
                                    handleDelete(book.id);
                                    setDropdownIndex(null);
                                  }}
                                >
                                  <Trash size={16} className="inline mr-2 align-middle" />
                                  O‘chirish
                                </li>
                              )}
                              {book.kitob_file && (
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 text-green-600 cursor-pointer rounded-b-xl flex items-center justify-start"
                                  onClick={() => {
                                    window.open(book.kitob_file, "_blank");
                                    setDropdownIndex(null);
                                  }}
                                >
                                  <Download size={16} className="inline mr-2 align-middle" />
                                  Yuklab olish
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <div>
            Sahifa {currentPage} / {totalPages}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              className="px-2 py-1 border rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-100"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(totalPages).keys()].map((pageNum) => (
              <button
                key={pageNum + 1}
                onClick={() => goToPage(pageNum + 1)}
                className={`px-3 py-1 rounded-lg border  transition-all duration-100 ${
                  currentPage === pageNum + 1
                    ? "text-[#F0F6FF] bg-[#2D68FF] font-semibold"
                    : "text-[#637381] hover:bg-[#F6F8FB] hover:text-[#212B36]"
                }`}
              >
                {pageNum + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              className="px-2 py-1 border rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-100"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksByCategory;
