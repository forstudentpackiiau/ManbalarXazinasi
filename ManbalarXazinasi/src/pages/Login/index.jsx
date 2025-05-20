import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, message } from "antd";

export default function Login({ onLogin }) {
  const [login, setLogin] = useState("");
  const [parol, setParol] = useState("");
  const [modal, contextHolder] = Modal.useModal();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/login", {
        login,
        parol,
      });

      localStorage.setItem("login", login);

      if (response.status === 201 && response.data.isAcsess) {
        const permissions = response.data;

        // Save permissions to localStorage
        localStorage.setItem("permissions", JSON.stringify(permissions));

        // Update auth state with permissions
        onLogin(permissions);

        // Success toast
        message.success("Kirish muvaffaqiyatli!");

        // Navigate to main page
        navigate("/category-books");
      } else {
        modal.error({
          title: "Login xatolik",
          content: "Login yoki parol noto‘g‘ri.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      modal.error({
        title: "Serverda xatolik",
        content: "Serverda xatolik. Iltimos, qayta urinib ko'ring.",
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* Ant Design Modal context */}
      {contextHolder}

      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Login"
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Parol"
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={parol}
            onChange={(e) => setParol(e.target.value)}
            disabled={loading}
          />

          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Yuklanmoqda..." : "Kirish"}
          </button>
        </div>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Parolni unutdingizmi?
          </a>
        </div>
      </div>
    </div>
  );
}
