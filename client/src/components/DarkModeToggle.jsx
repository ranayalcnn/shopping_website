import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import useDarkMode from '../hooks/useDarkMode'; // Hook'u içe aktar

const DarkModeToggle = () => {
    // Hook'u kullanarak temayı ve değiştirme fonksiyonunu al
    const [themeMode, toggleTheme] = useDarkMode(); 

    return (
        <button
            onClick={toggleTheme}
            title={themeMode === 'light' ? 'Change to Bright Mode' : 'Change to Dark Mode'}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
        >
            {/* Geçerli moda göre ikon göster */}
            {themeMode === 'dark' ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
        </button>
    );
};

export default DarkModeToggle;