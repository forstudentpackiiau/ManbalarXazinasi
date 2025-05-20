import React, { useRef, useState, useEffect } from "react";
import { Bell, ChevronDown, ArrowLeft, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "antd";

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

const Topbar = ({ onLogout }) => {
  const login = localStorage.getItem("login") || "Foydalanuvchi";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const handleCustomBack = () => {
    const pathArr = location.pathname.split("/").filter(Boolean);
    if (pathArr.length > 1) {
      // Remove last segment and go up one level
      const newPath = "/" + pathArr.slice(0, -1).join("/");
      navigate(newPath);
    } else {
      // At root level, go to home (or disable)
      navigate("/");
    }
  };

  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  // Modal handler
  const showLogoutConfirm = () => {
    Modal.confirm({
      title: "Chiqmoqchimisiz?",
      content: "Haqiqatan ham tizimdan chiqmoqchimisiz?",
      okText: "Ha, chiqish",
      cancelText: "Bekor qilish",
      okType: "danger",
      onOk: () => {
        localStorage.clear();
        setDropdownOpen(false);
        onLogout();
      },
      onCancel: () => {
        setDropdownOpen(false);
      },
    });
  };

  return (
    <header className="w-full bg-white h-16 flex items-center justify-end pr-10 pl-6 relative">
      {/* Back Button */}
      <button
        onClick={handleCustomBack}
        className="absolute left-8 flex items-center gap-2 px-4 py-2 bg-white border border-[#E4E7EC] rounded-lg shadow-sm text-[#212B36] hover:bg-[#F6F8FB] transition"
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Orqaga</span>
      </button>
      {/* Notification & User */}
      <div className="flex items-center gap-6">
        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex items-center gap-2 focus:outline-none select-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#2D68FF] flex items-center justify-center text-white font-semibold text-lg shadow">
              <span>{login.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-[#212B36] font-medium">{login}</span>
            <ChevronDown size={18} className="text-[#637381]" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white border border-[#E4E7EC] rounded-xl shadow-lg z-30">
              <button
                onClick={showLogoutConfirm}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-[#F04438] hover:bg-[#F6F8FB] rounded-xl transition"
              >
                <LogOut size={18} /> <span>Chiqish</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
