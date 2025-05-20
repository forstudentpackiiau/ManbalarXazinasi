import React, { useEffect, useState, useRef } from "react";
import { AlignJustify, Trash, Eye, Pencil, Download, Plus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import toast, { Toaster } from "react-hot-toast";

const LibraryBooks = () => {
  const [books, setBooks] = useState([]);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");
  const PAGE_SIZE = 5;

  // Helper: highlight matched text
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

  // Filter books before paginating
  const filteredBooks = books.filter((book) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      (book.nomi && book.nomi.toLowerCase().includes(term)) ||
      String(book.soni).toLowerCase().includes(term) ||
      (book.stilaj && book.stilaj.toLowerCase().includes(term)) ||
      (book.muallif && book.muallif.toLowerCase().includes(term)) ||
      (book.kitob_tili && book.kitob_tili.toLowerCase().includes(term))
    );
  });

  const pagedBooks = filteredBooks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, []);

  // Always reset page to 1 if search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Set total pages based on filteredBooks
  useEffect(() => {
    setTotalPages(Math.ceil(filteredBooks.length / PAGE_SIZE) || 1);
  }, [filteredBooks]);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/kitoblar");
      const allBooks = res.data.data || res.data;
      setBooks(allBooks);
    } catch (error) {
      toast.error("Kitoblarni olishda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/kitoblar/${id}`);
      toast.success("Kitob o'chirildi");
      fetchBooks();
    } catch (error) {
      toast.error("Kitobni o'chirishda xatolik yuz berdi");
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="h-auto bg-gray-50 p-8">
      {/* Toasts */}
      <Toaster position="top-center" />

      <div className="mb-2 text-sm text-gray-500">
        <Breadcrumb />
      </div>
      <div className="max-w-full bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-lg text-gray-800">
            Kitoblar ro’yxati
          </h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Qidiruv"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 transition-all duration-150"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              style={{ minWidth: 180 }}
            />
            {permissions.createAcsess && (
              <button
                onClick={() => navigate("/add-book")}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-sm text-base font-bold transition-all duration-150"
              >
                <Plus size={16} />
              </button>
            )}
          </div>
        </div>
        {loading ? (
          <div className="text-center py-10 text-gray-500 text-base">
            Yuklanmoqda...
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg h-[50vh]">
            <table className="w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 font-semibold text-gray-600 text-center">
                    Nomi
                  </th>
                  <th className="p-3 font-semibold text-gray-600 text-center">
                    Soni
                  </th>
                  <th className="p-3 font-semibold text-gray-600 text-center">
                    Stelyaj
                  </th>
                  <th className="p-3 font-semibold text-gray-600 text-center">
                    Muallifi
                  </th>
                  <th className="p-3 font-semibold text-gray-600 text-center">
                    Tili
                  </th>
                  <th className="p-3 font-semibold text-gray-600 text-center">
                    Harakatlar
                  </th>
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
                  pagedBooks.map((book, idx) => (
                    <tr
                      key={book.id}
                      className="transition-all duration-100 hover:bg-gray-100 rounded-xl"
                      style={{ borderBottom: "1px solid #F1F3F5" }}
                    >
                      <td className="p-3 text-center">
                        {highlight(book.nomi, searchTerm)}
                      </td>
                      <td className="p-3 text-center">
                        {highlight(book.soni, searchTerm)}
                      </td>
                      <td className="p-3 text-center">
                        {highlight(book.stilaj, searchTerm)}
                      </td>
                      <td className="p-3 text-center">
                        {highlight(book.muallif, searchTerm)}
                      </td>
                      <td className="p-3 text-center">
                        {highlight(book.kitob_tili, searchTerm)}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() =>
                            setDropdownIndex(dropdownIndex === idx ? null : idx)
                          }
                          className="text-blue-500 relative m-auto flex items-center  px-2 py-1 rounded hover:bg-gray-100 "
                        >
                          <AlignJustify size={16} />
                          <span className="ml-1 text-center">Harakatlar</span>
                        </button>
                        {dropdownIndex === idx && (
                          <div
                            ref={dropdownRef}
                            className="absolute w-32  bg-white border border-gray-200 rounded-xl shadow-lg z-50"
                          >
                            <ul>
                              <li
                                className="px-4 py-3 hover:bg-gray-100 text-blue-600 cursor-pointer rounded-t-xl flex items-center justify-start"
                                onClick={() => {
                                  navigate(`/books/${book.id}`);
                                  setDropdownIndex(null);
                                }}
                              >
                                <Eye
                                  size={16}
                                  className="inline mr-2 align-middle"
                                />
                                Ko‘rish
                              </li>
                              {permissions.editAcsess && (
                                <li
                                  className="px-4 py-3 hover:bg-gray-100 text-yellow-600 cursor-pointer flex items-center justify-start"
                                  onClick={() => {
                                    navigate(`/edit-book?id=${book.id}`);
                                    setDropdownIndex(null);
                                  }}
                                >
                                  <Pencil
                                    size={16}
                                    className="inline mr-2 align-middle"
                                  />
                                  Tahrirlash
                                </li>
                              )}
                              {permissions.deleteAcsess && (
                                <li
                                  className="px-4 py-3 hover:bg-gray-100 text-red-600 cursor-pointer flex items-center justify-start"
                                  onClick={() => setConfirmDeleteId(book.id)}
                                >
                                  <Trash
                                    size={16}
                                    className="inline mr-2 align-middle"
                                  />
                                  O‘chirish
                                </li>
                              )}
                              {book.kitob_file && (
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 text-green-600 cursor-pointer rounded-b-xl flex items-center justify-start"
                                  onClick={() => {
                                    // Create an anchor element and trigger download
                                    const link = document.createElement("a");
                                    link.href = book.kitob_file;
                                    link.download = ""; // Optionally set a default filename: e.g. "file.pdf"
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    setDropdownIndex(null);
                                  }}
                                >
                                  <Download
                                    size={16}
                                    className="inline mr-2 align-middle"
                                  />
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

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-xs text-center">
            <div className="mb-4 text-lg font-semibold text-gray-800">
              Diqqat!
            </div>
            <div className="mb-6 text-gray-600">
              Kitobni o‘chirishni tasdiqlaysizmi?
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Bekor qilish
              </button>
              <button
                onClick={async () => {
                  await handleDelete(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                O‘chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryBooks;
