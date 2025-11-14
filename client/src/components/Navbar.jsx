import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { Search, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import SiteIcon from './SiteIcon';

const IntegratedSearchBar = ({ value, onChange }) => (
  <div className="relative w-full max-w-md mx-auto">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
    <input
      type="text"
      placeholder="Ürün ara"
      className="w-full pl-9 pr-8 py-2 text-sm
                 bg-white dark:bg-slate-900
                 border border-slate-300 dark:border-slate-700
                 text-slate-900 dark:text-slate-100
                 rounded-lg shadow-inner
                 placeholder-slate-400 dark:placeholder-slate-500
                 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400
                 transition"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        aria-label="Temizle"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <nav
      className="sticky top-0 z-50
                 bg-white/95 dark:bg-slate-950/90
                 text-slate-900 dark:text-slate-100
                 border-b border-slate-200 dark:border-slate-800
                 shadow-sm backdrop-blur"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <SiteIcon className="h-10 w-auto text-slate-800 dark:text-slate-100 transition-transform duration-300 hover:scale-105" />
            </Link>
          </div>

          {/* Arama Çubuğu */}
          <div className="hidden lg:block flex-1 mx-8">
            <IntegratedSearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          {/* Menü ve Aksiyonlar */}
          <div className="flex items-center space-x-6">
            {/* Menü Linkleri */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/products"
                className="font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                WOMANSWEAR
              </Link>
              <Link
                to="/about"
                className="font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                MENSWEAR
              </Link>
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex items-center space-x-4">
              <DarkModeToggle />

              <Link
                to="/favorites"
                className="hidden md:flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <AiOutlineHeart className="text-xl" />
                <span className="hidden lg:inline">Favorites</span>
              </Link>

              <Link
                to="/cart"
                className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <FiShoppingCart className="text-xl" />
                <span className="hidden lg:inline">Bag</span>
              </Link>
            </div>

            {/* Login */}
            <div className="hidden md:flex">
              <Link
                to="/login"
                className="px-4 py-2 rounded-md font-semibold
                           bg-emerald-600 text-white
                           hover:bg-emerald-700
                           dark:bg-emerald-500 dark:hover:bg-emerald-400
                           transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
