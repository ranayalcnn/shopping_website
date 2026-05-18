import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  User,
  HelpCircle,
  Globe2,
  Cog,
  LogOut,
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { toast } from "react-hot-toast";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // 🔔 LOGOUT CONFIRM — ÇERÇEVESİZ / DARK MODE UYUMLU
  const handleLogout = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3 px-1">
          <p
            className="
              text-sm font-medium tracking-wide
              text-slate-900 dark:text-slate-100
            "
          >
            Are you sure you want to log out?
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="
                px-3 py-1.5 rounded-md
                text-xs font-medium tracking-wide
                text-slate-700 dark:text-slate-300
                hover:bg-slate-200/70 dark:hover:bg-slate-700/60
                transition
              "
            >
              Cancel
            </button>

            <button
              onClick={() => {
                logout();
                toast.dismiss(t.id);
                setOpen(false);
                navigate("/login");
              }}
              className="
                px-3 py-1.5 rounded-md
                text-xs font-semibold tracking-wide
                text-red-600 dark:text-red-400
                hover:bg-red-100/70 dark:hover:bg-red-500/20
                transition
              "
            >
              Logout
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          background: "transparent",
          boxShadow: "none",
          padding: "6px 8px",
        },
      }
    );
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* BUTTON */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 text-slate-900 dark:text-white"
      >
        <User className="w-6 h-6" />
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-3 w-64
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700
            rounded-2xl shadow-xl py-2 z-50
          "
        >
          <div className="px-4 py-3">
            <p className="text-sm font-semibold">Account</p>
            <p className="text-xs text-slate-500">Signed in</p>
          </div>

          <Divider />

          <MenuLink to="/profile" icon={<User />} label="My Profile" />
          <MenuLink to="/settings" icon={<Cog />} label="Settings" />

          <Divider />

          <MenuLink to="/help" icon={<HelpCircle />} label="Help Center" />
          <MenuLink to="/language" icon={<Globe2 />} label="Language" />

          <Divider />

          {/* 🔥 LOGOUT */}
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-3 px-4 py-2.5
              text-red-600 hover:bg-red-50
              dark:hover:bg-red-500/10
            "
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const Divider = () => (
  <div className="my-2 mx-4 h-px bg-slate-200 dark:bg-slate-700" />
);

const MenuLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="
      flex items-center gap-3
      px-4 py-2.5 text-sm font-medium tracking-wide
      hover:bg-slate-100 dark:hover:bg-slate-800
    "
  >
    {icon}
    {label}
  </Link>
);

export default ProfileMenu;
