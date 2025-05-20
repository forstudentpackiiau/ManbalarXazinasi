import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ categoryName, bookName }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav
      className="flex items-center text-[15px] text-[#92929D] font-normal mt-1"
      aria-label="breadcrumb"
    >
      <ol className="flex gap-1">
        <li>
          <Link to="/books" className="hover:text-[#2D68FF] transition">
            Asosiy
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          const nameMap = {
            book: "Kitob",
            books: "Kitoblar",
            "category-books": "Kategoriyalar",
            "add-book": "Kitob qo'shish",
            "add-category": "Kategoriya qo'shish",
            "detail-book": "Kitob tafsilotlari",
            category: "Kategoriya",
            "edit-book": "Kitobni tahrirlash",
            "edit-category": "Kategoriya tahrirlash",
          };

          // Show bookName if last segment is a number (likely book ID) and bookName is provided
          const displayName =
            isLast && !isNaN(name)
              ? bookName || categoryName || name
              : nameMap[name] || name;

          return (
            <React.Fragment key={routeTo}>
              <span className="mx-1">/</span>
              <li>
                {isLast ? (
                  <span>{displayName}</span>
                ) : (
                  <Link to={routeTo} className="hover:text-[#2D68FF] transition">
                    {displayName}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
