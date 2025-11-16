import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User, HelpCircle, Globe2, Cog } from "lucide-react";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
      >
        <User className="w-6 h-6" />
        <ChevronDown className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[99990]"
        />
      )}

      {/* DROPDOWN */}
      <div
        className={`absolute right-0 mt-2 w-56
                    bg-white dark:bg-slate-900
                    border border-slate-200 dark:border-slate-700
                    rounded-xl shadow-xl py-2
                    transition-all duration-150
                    z-[99999]
                    ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >

        <Link
          to="/login"
          onClick={() => setOpen(false)} 
          className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          Login
        </Link>

        <Link
          to="/register"
          onClick={() => setOpen(false)}
          className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          Register
        </Link>

        <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>

        <Link
          to="/help"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <HelpCircle className="w-4 h-4" />
          Help Center
        </Link>

        <Link
          to="/language"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Globe2 className="w-4 h-4" />
          Language
        </Link>

        <Link
          to="/settings"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Cog className="w-4 h-4" />
          Settings
        </Link>

      </div>
    </div>
  );
};

export default ProfileMenu;
