import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CategoryBooks from "./pages/CategoryBooks";
import AddCategory from "./pages/AddCategory";
import AddBook from "./pages/AddBook";
import DetailBook from "./pages/DetailBook";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import LibraryBooks from "./pages/LibraryBooks";
import BooksByCategory from "./pages/BooksBycategory";
import EditBook from "./pages/EditBook";
import EditCategory from "./pages/EditCategory";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if the user is already logged in (e.g., from localStorage)
    return !!localStorage.getItem("permissions");
  });

  const handleLogin = (permissions) => {
    // Save permissions in localStorage to persist session
    localStorage.setItem("permissions", JSON.stringify(permissions));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("permissions");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/books" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <ProtectedRoutes onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoutes({ onLogout }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar onLogout={onLogout} />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<LibraryBooks />} />
            <Route path="/books" element={<LibraryBooks />} />
            <Route path="/category-books" element={<CategoryBooks />} />
            <Route path="/books/:id" element={<DetailBook />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book" element={<EditBook />} />
            <Route
              path="/category-books/:categoryId"
              element={<BooksByCategory />}
            />
            <Route path="/edit-category/:id" element={<EditCategory />} />
            {/* <Route path="*" element={<Navigate to="/books" replace />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
