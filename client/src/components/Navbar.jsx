import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi'; 
import { Search, X } from 'lucide-react'; // SearchBar için ikonlar
import DarkModeToggle from './DarkModeToggle'; 
import SiteIcon from './SiteIcon'; 

// 🚨 YENİ: Navbar içine entegre edilen SearchBar bileşeninin sadeleştirilmiş hali
const IntegratedSearchBar = ({ value, onChange }) => (
    <div className="relative w-full max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
        <input
            type="text"
            placeholder="Ürün veya kategori ara..."
            className="w-full pl-9 pr-8 py-1.5 
                       bg-gray-100 dark:bg-gray-700 
                       border border-transparent dark:border-gray-600 
                       text-gray-900 dark:text-white 
                       rounded-lg shadow-inner
                       placeholder-gray-500 dark:placeholder-gray-400
                       focus:outline-none focus:border-primary dark:focus:border-indigo-400
                       focus:ring-1 focus:ring-primary dark:focus:ring-indigo-400
                       transition-all duration-200 text-sm"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        {value && (
            <button
                onClick={() => onChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 
                           text-gray-400 hover:text-red-600 dark:hover:text-red-400 
                           transition-colors duration-200"
            >
                <X className="w-4 h-4" />
            </button>
        )}
    </div>
);


const Navbar = () => {
    // 🚨 YENİ: Arama çubuğu state'i (Normalde global state'ten yönetilebilir)
    const [searchTerm, setSearchTerm] = useState('');

    return (
        // Açık Temada Arka Plan Beyaz, Metin Siyah
        <nav className="sticky top-0 bg-white dark:bg-dark-primary text-gray-900 dark:text-white shadow-lg dark:shadow-2xl z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo ve İkon */}
                    <div className="flex-shrink-0">
                        <Link 
                            to="/" 
                            className="flex items-center space-x-0 flex-none"
                        >
                            <SiteIcon 
                                className="h-10 w-auto flex-shrink-0 transition-transform duration-300 hover:scale-105" 
                            /> 
                        </Link>
                    </div>

                    {/* 🚨 KRİTİK DEĞİŞİKLİK: ORTAYA ARAMA ÇUBUĞU */}
                    {/* Küçük ekranlarda gizli, orta (md) ve büyük ekranlarda görünür. */}
                    <div className="hidden lg:block flex-1 mx-8">
                         <IntegratedSearchBar value={searchTerm} onChange={setSearchTerm} />
                    </div>

                    {/* Menü ve Butonlar */}
                    <div className="flex items-center space-x-6">
                        
                        {/* Menü Linkleri (Bu kısım yerinde kaldı) */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link to="/products" className="hover:text-primary font-medium transition">Ürünler</Link>
                            <Link to="/about" className="hover:text-primary font-medium transition">Hakkımızda</Link>
                        </div>

                        {/* Aksiyon İkonları ve Butonlar */}
                        <div className="flex items-center space-x-4">
                            
                            <DarkModeToggle />

                            <Link to="/favorites" className="hidden md:flex items-center gap-1 hover:text-primary transition">
                                <AiOutlineHeart className="text-xl" />
                                <span className="hidden lg:inline">Favorilerim</span> {/* Büyük ekranlarda metin göster */}
                            </Link>
                            <Link to="/cart" className="flex items-center gap-1 hover:text-primary transition">
                                <FiShoppingCart className="text-xl" />
                                <span className="hidden lg:inline">Sepetim</span> {/* Büyük ekranlarda metin göster */}
                            </Link>
                        </div>
                        
                        {/* Giriş Butonu */}
                        <div className="hidden md:flex">
                            <Link
                                to="/login"
                                className="bg-primary text-white dark:bg-dark-background dark:text-dark-primary font-semibold px-4 py-2 rounded-md hover:opacity-90 transition"
                            >
                                Giriş Yap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobil için arama çubuğunu alta ekleyebiliriz (Opsiyonel) */}
            {/* <div className="lg:hidden px-4 pb-2">
                <IntegratedSearchBar value={searchTerm} onChange={setSearchTerm} />
            </div> */}
        </nav>
    );
};

export default Navbar;