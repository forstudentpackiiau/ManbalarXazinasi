import React from "react";
import { NavLink } from "react-router-dom";
import { BookOpen,  BookOpenCheck,  BookPlus,  ChartColumnBig } from "lucide-react";

const Sidebar = () => (
  <aside className="w-64 bg-white border-r border-[#E4E7EC] min-h-screen flex flex-col py-8 px-6">
    {/* Logo/Header */}
    <div className="mb-10">
      <div className="text-xl font-bold text-[#212B36]">Manba’lar Xazinasi</div>
    </div>
    {/* Navigation */}
    <nav className="flex-1 flex flex-col gap-2">
      <NavLink
        to="/books"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded text-base font-normal ${
            isActive
              ? "bg-[#F0F6FF] text-[#2D68FF] font-semibold"
              : "text-[#637381] hover:bg-[#F6F8FB] hover:text-[#212B36]"
          }`
        }
        end
      >
        <ChartColumnBig size={18} /> Dashboard
      </NavLink>
      <NavLink
        to="/category-books"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded text-base font-normal ${
            isActive
              ? "bg-[#F0F6FF] text-[#2D68FF] font-semibold"
              : "text-[#637381] hover:bg-[#F6F8FB] hover:text-[#212B36]"
          }`
        }
      >
        <BookOpen size={18} /> Kategoriyalar
      </NavLink>
      <NavLink
        to="/add-book "
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded text-base font-normal ${
            isActive
              ? "bg-[#F0F6FF] text-[#2D68FF] font-semibold"
              : "text-[#637381] hover:bg-[#F6F8FB] hover:text-[#212B36]"
          }`
        }
      >
        <BookPlus size={18} /> Kitob qo‘shish
      </NavLink>
      <NavLink
        to="/add-category"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded text-base font-normal ${
            isActive
              ? "bg-[#F0F6FF] text-[#2D68FF] font-semibold"
              : "text-[#637381] hover:bg-[#F6F8FB] hover:text-[#212B36]"
          }`
        }
      >
        <BookOpenCheck size={18} /> Kategoriya qo‘shish
      </NavLink>
    </nav>
  </aside>
);

export default Sidebar;
