import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          T-Shirt Store
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="text-white hover:underline">
              Anasayfa
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-white hover:underline">
              Ürünler
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:underline">
              Hakkımızda
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
