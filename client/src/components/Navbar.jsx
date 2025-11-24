import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AiOutlineHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { Search, X } from "lucide-react";

import DarkModeToggle from "./DarkModeToggle";
import CategoryDropdown from "./CategoryDropdown";
import ProfileMenu from "./ProfileMenu";


// -------------------------------------------
// Search Bar
// -------------------------------------------
const IntegratedSearchBar = ({ value, onChange }) => (
  <div className="relative w-full max-w-sm mx-auto">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />

    <input
      type="text"
      placeholder="Search products..."
      className="
        w-full pl-9 pr-9 py-2 text-sm rounded-lg
        bg-white dark:bg-slate-900
        border border-slate-300 dark:border-slate-700
        text-slate-900 dark:text-slate-100
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-emerald-500
        dark:focus:ring-emerald-400
        placeholder-slate-400 dark:placeholder-slate-500
        transition
      "
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />

    {value && (
      <button
        onClick={() => onChange("")}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);


// -------------------------------------------
// NAVBAR — LUNORA Text Logo
// -------------------------------------------
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-white/80 dark:bg-slate-950/80
        backdrop-blur-xl
        border-b border-slate-200 dark:border-slate-800
        shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">

        {/* LEFT — L U N O R A  LOGO */}
        <Link
          to="/"
          className="flex items-center hover:opacity-80 transition select-none"
        >
          <span
            className="
              text-3xl
              font-light
              tracking-[0.35em]
              uppercase
              text-slate-900 dark:text-white
            "
          >
            LUNORA
          </span>
        </Link>

        {/* CENTER — SEARCH (LG only) */}
        <div className="hidden lg:flex flex-1 justify-center px-8">
          <IntegratedSearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        {/* RIGHT — MENUS */}
        <div className="hidden md:flex items-center space-x-6 text-[15px] font-medium">

          <CategoryDropdown
            title="WOMENSWEAR"
            columns={[
              {
                title: "Clothing",
                links: [
                  { label: "Tops", href: "/womens/tops" },
                  { label: "Jeans", href: "/womens/jeans" },
                  { label: "Dresses", href: "/womens/dresses" },
                  { label: "Coats", href: "/womens/coats" },
                ],
              },
              {
                title: "Footwear",
                links: [
                  { label: "Heels", href: "/womens/heels" },
                  { label: "Boots", href: "/womens/boots" },
                  { label: "Sneakers", href: "/womens/sneakers" },
                ],
              },
              {
                title: "Accessories",
                links: [
                  { label: "Bags", href: "/womens/bags" },
                  { label: "Jewelry", href: "/womens/jewelry" },
                  { label: "Scarves", href: "/womens/scarves" },
                ],
              },
            ]}
          />

          <CategoryDropdown
            title="MENSWEAR"
            columns={[
              {
                title: "Clothing",
                links: [
                  { label: "T-Shirts", href: "/mens/tshirts" },
                  { label: "Pants", href: "/mens/pants" },
                  { label: "Shirts", href: "/mens/shirts" },
                  { label: "Hoodies", href: "/mens/hoodies" },
                ],
              },
              {
                title: "Footwear",
                links: [
                  { label: "Sneakers", href: "/mens/sneakers" },
                  { label: "Boots", href: "/mens/boots" },
                  { label: "Loafers", href: "/mens/loafers" },
                ],
              },
              {
                title: "Accessories",
                links: [
                  { label: "Belts", href: "/mens/belts" },
                  { label: "Watches", href: "/mens/watches" },
                  { label: "Wallets", href: "/mens/wallets" },
                ],
              },
            ]}
          />

          {/* FAVORITES */}
          <Link
            to="/favorites"
            className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            <AiOutlineHeart className="text-xl" />
            <span className="hidden lg:inline">Favorites</span>
          </Link>

          {/* BAG */}
          <Link
            to="/cart"
            className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            <FiShoppingCart className="text-xl" />
            <span className="hidden lg:inline">Bag</span>
          </Link>

          <ProfileMenu />
        </div>

        {/* DARK MODE TOGGLE */}
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
