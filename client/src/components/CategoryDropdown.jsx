import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryDropdown = ({ title, items = [], columns = [] }) => {
  const [open, setOpen] = useState(false);
  const isMegaMenu = columns.length > 0;

  return (
    <div className="relative">

      {/* HEADER BUTTON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          group flex items-center gap-1
          text-sm font-medium tracking-wide
          text-slate-900 dark:text-white
          hover:text-emerald-600 dark:hover:text-emerald-400
          transition-colors select-none
        "
      >
        {title}
        <ChevronDown
          className={`
            w-4 h-4
            text-slate-500 dark:text-slate-400
            transition-transform duration-200
            group-hover:text-emerald-500
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9998]"
        />
      )}

      {/* NORMAL DROPDOWN */}
      {!isMegaMenu && (
        <div
          className={`
            absolute left-0 top-full mt-3 w-52
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700
            rounded-2xl shadow-xl
            py-2
            backdrop-blur-xl
            transition-all duration-200 ease-out
            z-[9999]
            ${
              open
                ? "opacity-100 translate-y-0 scale-100 visible"
                : "opacity-0 -translate-y-2 scale-95 invisible"
            }
          `}
        >
          {items.map((item, i) => (
            <Link
              key={i}
              to={item.href}
              onClick={() => setOpen(false)}
              className="
                block px-4 py-2.5 mx-2 rounded-xl
                text-sm
                text-slate-700 dark:text-slate-300
                hover:bg-slate-100 dark:hover:bg-slate-800
                hover:text-emerald-600 dark:hover:text-emerald-400
                transition-all
              "
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* MEGA MENU */}
      {isMegaMenu && (
        <div
          className={`
            absolute top-full left-1/2 -translate-x-1/2 mt-4
            w-[720px]
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700
            rounded-3xl shadow-2xl
            p-8
            grid grid-cols-3 gap-10
            backdrop-blur-xl
            transition-all duration-200 ease-out
            z-[9999]
            ${
              open
                ? "opacity-100 translate-y-0 scale-100 visible"
                : "opacity-0 -translate-y-3 scale-95 invisible"
            }
          `}
        >
          {columns.map((col, index) => (
            <div key={index} className="flex flex-col gap-4">

              {/* COLUMN TITLE — BLACK + THIN LINE */}
              <div>
                <h4
                  className="
                    text-xs font-semibold uppercase tracking-widest
                    text-slate-900 dark:text-white
                  "
                >
                  {col.title}
                </h4>

                {/* THIN DIVIDER */}
                <div className="mt-1 h-[2px] w-10 bg-emerald-500 rounded-full" />
              </div>

              {/* LINKS */}
              <div className="flex flex-col gap-2">
                {col.links.map((link, i) => (
                  <Link
                    key={i}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="
                      group relative text-sm
                      text-slate-600 dark:text-slate-300
                      hover:text-emerald-600 dark:hover:text-emerald-400
                      transition-colors w-fit
                    "
                  >
                    {link.label}
                    <span
                      className="
                        absolute left-0 -bottom-0.5
                        w-0 h-[2px]
                        bg-emerald-500
                        group-hover:w-full
                        transition-all duration-300
                      "
                    />
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
