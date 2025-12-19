import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const LABELS = {
  "": "Home",
  "new": "New Arrivals",
  "collection": "Fall Collection",
  "product": "Product",
  "cart": "Shopping Bag",
  "favorites": "Favorites",
  "checkout": "Checkout",
  "login": "Login",
  "register": "Register",
};

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div
      className="
        sticky top-[72px] z-30
        bg-white/80 dark:bg-slate-900/70
        backdrop-blur-md
        border-b border-slate-200 dark:border-slate-700
      "
    >
      <nav className="max-w-[1280px] mx-auto px-4 py-2 text-sm text-slate-600 dark:text-slate-400">
        <ol className="flex items-center flex-wrap gap-1">

          {/* HOME */}
          <li>
            <Link
              to="/"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              Home
            </Link>
          </li>

          {paths.map((path, index) => {
            const to = "/" + paths.slice(0, index + 1).join("/");
            const isLast = index === paths.length - 1;

            return (
              <li key={to} className="flex items-center gap-1">
                <ChevronRight className="w-4 h-4 opacity-60" />

                {isLast ? (
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {LABELS[path] || "Details"}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                  >
                    {LABELS[path] || path}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
