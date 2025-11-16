import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryDropdown = ({ title, items = [], columns = [] }) => {
  const [open, setOpen] = useState(false);

  const isMegaMenu = columns.length > 0;

  return (
    <div className="relative">

      {/* HEADER BUTTON — CLICK ile aç/kapat */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 font-medium text-sm tracking-wide
                   hover:text-emerald-600 dark:hover:text-emerald-400
                   transition-colors select-none"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* BACKDROP — menü açıkken tıklayınca kapatır */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[99990]"
        />
      )}

      {/* NORMAL DROPDOWN */}
      {!isMegaMenu && (
        <div
          className={`absolute left-0 mt-2 w-48
                     bg-white dark:bg-slate-900
                     border border-slate-200 dark:border-slate-700
                     rounded-lg shadow-xl pt-2 pb-2 
                     transition-all duration-150
                     z-[99999]
                     ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        >
          {items.map((item, i) => (
            <Link
              key={i}
              to={item.href}
              onClick={() => setOpen(false)} // tıklandıktan sonra kapat
              className="block px-4 py-2 text-sm
                         text-slate-700 dark:text-slate-200
                         hover:bg-slate-100 dark:hover:bg-slate-800
                         hover:text-emerald-600 dark:hover:text-emerald-400
                         transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* MEGA MENU */}
      {isMegaMenu && (
        <div
          className={`absolute left-0 mt-2 
                     w-[650px] p-6
                     bg-white dark:bg-slate-900
                     border border-slate-200 dark:border-slate-700
                     rounded-xl shadow-2xl
                     grid grid-cols-3 gap-8
                     transition-all duration-150
                     z-[99999]
                     ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        >
          {columns.map((col, index) => (
            <div key={index} className="flex flex-col space-y-3">

              <h4 className="font-semibold text-sm uppercase
                             text-slate-900 dark:text-slate-100
                             tracking-wide">
                {col.title}
              </h4>

              <div className="flex flex-col space-y-2">
                {col.links.map((link, i) => (
                  <Link
                    key={i}
                    to={link.href}
                    onClick={() => setOpen(false)} // mega menüde de kapanır
                    className="text-sm text-slate-600 dark:text-slate-300
                               hover:text-emerald-600 dark:hover:text-emerald-400
                               transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default CategoryDropdown;
