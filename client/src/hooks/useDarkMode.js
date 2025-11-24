import { useState, useEffect } from "react";

function useDarkMode() {
  const [theme, setTheme] = useState(() => {
    // check localStorage
    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    // check system setting
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  // apply theme
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return [theme, toggleTheme];
}

export default useDarkMode;
