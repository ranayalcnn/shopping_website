/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        background: "#f9fafb",
        card: "#ffffff",
        heading: "#1a202c",
        text: "#374151",

        // Primary Light Color
        primary: "#60a5fa",

        // Accent
        accent: "#f59e0b",

        // Dark Mode Colors
        dark: {
          background: "#18181b",
          card: "#23272f",
          heading: "#f3f4f6",
          text: "#d1d5db",

          // Primary Dark Color
          primary: "#1e3a8a",

          // Dark Accent
          accent: "#fbbf24",
        },
      },
    },
  },
  plugins: [],
};
