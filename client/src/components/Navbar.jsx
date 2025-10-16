import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi'; 
import DarkModeToggle from './DarkModeToggle'; 

const Navbar = () => {
    return (
        // Arka plan Dark Mode uyumlu yapıldı. text-white bırakıldı (koyu üzerinde açık).
        <nav className="sticky top-0 bg-primary dark:bg-dark-primary text-white shadow-lg dark:shadow-2xl z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        {/* Logo metni (text-white) zaten Dark Mode'da koyu arka plan üzerinde doğru. */}
                        <Link to="/" className="text-white font-extrabold text-2xl tracking-wide">
                            T-Shirt Store
                        </Link>
                    </div>

                    {/* Menü ve Butonlar */}
                    <div className="flex items-center space-x-6">
                        
                        {/* Menü Linkleri (Dark Mode hover rengi ile iyileştirildi) */}
                        <div className="hidden md:flex items-center space-x-6">
                            {/* Dark Mode'da hover:text-gray-300 yaparak kontrastı iyileştiriyoruz. */}
                            <Link to="/" className="hover:text-gray-100 dark:hover:text-gray-300 font-medium transition">Anasayfa</Link>
                            <Link to="/products" className="hover:text-gray-100 dark:hover:text-gray-300 font-medium transition">Ürünler</Link>
                            <Link to="/about" className="hover:text-gray-100 dark:hover:text-gray-300 font-medium transition">Hakkımızda</Link>
                        </div>

                        {/* Aksiyon İkonları ve Butonlar */}
                        <div className="flex items-center space-x-4">
                            
                            {/* DARK MODE TOGGLE */}
                            <DarkModeToggle />

                            {/* Favoriler ve Sepet İkonları (Hover rengi iyileştirildi) */}
                            <Link to="/favorites" className="hidden md:flex items-center gap-1 hover:text-gray-100 dark:hover:text-gray-300 transition">
                                <AiOutlineHeart className="text-xl" />
                                <span>Favorilerim</span>
                            </Link>
                            <Link to="/cart" className="flex items-center gap-1 hover:text-gray-100 dark:hover:text-gray-300 transition">
                                <FiShoppingCart className="text-xl" />
                                <span>Sepetim</span>
                            </Link>
                        </div>
                        
                        {/* Giriş Butonu (Dark Mode uyumlu) */}
                        <div className="hidden md:flex">
                            <Link
                                to="/login"
                                // Buton, koyu arka plan (dark:bg-dark-background) üzerine metni dark:text-dark-primary olacak şekilde ayarlandı.
                                className="bg-white dark:bg-dark-background text-primary dark:text-dark-primary font-semibold px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-card transition"
                            >
                                Giriş Yap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;