import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import useDarkMode from '../hooks/useDarkMode';

const DarkModeToggle = () => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 rounded-full 
        bg-slate-100 dark:bg-slate-800
        text-slate-800 dark:text-slate-200
        hover:bg-slate-200 dark:hover:bg-slate-700
        transition-colors shadow
      "
    >
      {theme === "dark" ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
    </button>
  );
};

export default DarkModeToggle;
