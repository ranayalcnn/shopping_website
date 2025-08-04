import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-gradient-to-r from-primary to-secondary text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-extrabold text-2xl tracking-wide">
              T-Shirt Store
            </Link>
          </div>

          {/* Menü */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-100 font-medium transition">
              Anasayfa
            </Link>
            <Link to="/products" className="hover:text-gray-100 font-medium transition">
              Ürünler
            </Link>
            <Link to="/about" className="hover:text-gray-100 font-medium transition">
              Hakkımızda
            </Link>
            <Link to="/favorites" className="flex items-center gap-1 hover:text-gray-100 transition">
              <AiOutlineHeart className="text-xl" />
              <span>Favorilerim</span>
            </Link>
            <Link to="/cart" className="flex items-center gap-1 hover:text-gray-100 transition">
              <FiShoppingCart className="text-xl" />
              <span>Sepetim</span>
            </Link>
          </div>

          {/* Giriş Butonu */}
          <div className="hidden md:flex">
            <Link
              to="/login"
              className="bg-white text-primary font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
