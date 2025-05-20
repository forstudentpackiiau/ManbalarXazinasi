import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { Dropdown, Menu, Modal, message } from "antd";

export default function CategoryBooks() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API = proccess.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/kategoriya`)
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Kategoriyalarni olishda xatolik yuz berdi");
        setLoading(false);
      });
  }, []);

  // Delete handler
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Ishonchingiz komilmi?",
      content: "Bu kategoriyani o‘chirmoqchimisiz?",
      okText: "Ha, o‘chirish",
      okType: "danger",
      cancelText: "Bekor qilish",
      onOk: async () => {
        try {
          await axios.delete(`${API}/kategoriya/${id}`);
          setCategories(categories.filter((c) => c.id !== id));
          message.success("Kategoriya o‘chirildi!");
        } catch (err) {
          message.error("O‘chirishda xatolik yuz berdi.");
        }
      },
    });
  };

  // Dropdown menu for Edit and Delete
  const menu = (category) => (
    <Menu>
      <Menu.Item
        key="edit"
        onClick={() => navigate(`/edit-category/${category.id}`)}
      >
        <span className="flex items-center gap-2">
          <Pencil size={16} />
          Tahrirlash
        </span>
      </Menu.Item>
      <Menu.Item key="delete" danger onClick={() => handleDelete(category.id)}>
        <span className="flex items-center gap-2">
          <Trash size={16} />
          O‘chirish
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-2">
        <Breadcrumb />
      </div>

      <h1 className="text-2xl font-semibold mb-6 text-gray-900">
        Kategoriyalar
      </h1>

      {loading && <div className="text-gray-500">Yuklanmoqda...</div>}

      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.length === 0 ? (
            <div className="text-gray-500">Kategoriyalar topilmadi</div>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="relative group bg-blue-500 text-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 flex items-center justify-between"
              >
                {/* Clicking the name navigates to books */}
                <NavLink
                  to={`/category-books/${category.id}`}
                  className="flex-1 font-semibold truncate"
                >
                  {category.nomi}
                </NavLink>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "edit",
                        label: (
                          <span
                            className="flex items-center gap-2"
                            onClick={() =>
                              navigate(`/edit-category/${category.id}`)
                            }
                          >
                            <Pencil size={16} />
                            Tahrirlash
                          </span>
                        ),
                      },
                      {
                        key: "delete",
                        danger: true,
                        label: (
                          <span
                            className="flex items-center gap-2"
                            onClick={() => handleDelete(category.id)}
                          >
                            <Trash size={16} />
                            O‘chirish
                          </span>
                        ),
                      },
                    ],
                  }}
                  trigger={["click"]}
                  placement="bottomRight"
                  arrow
                >
                  <button
                    className="ml-3 text-white hover:text-yellow-300 transition"
                    title="Boshqa harakatlar"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Ellipsis size={22} />
                  </button>
                </Dropdown>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
