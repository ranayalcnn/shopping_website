/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors (Açık Mod)
        background: "#f9fafb", 
        card: "#ffffff",
        heading: "#1a202c",
        text: "#374151",
        
        // ANA RENK (Buton vb.): Light Mode için daha açık bir ton
        primary: "#60a5fa", 
        
        // VURGU RENGİ: Altın Sarısı / Amber
        accent: "#f59e0b", 
        
        // Dark theme colors (Karanlık Mod)
        dark: {
          background: "#18181b", // Siyah arka plan
          card: "#23272f",
          heading: "#f3f4f6",
          text: "#d1d5db",
          
          // KARANLIK MOD ANA RENK: Koyu Mavi/Lacivert (Dark Mode Navbar arka planı için)
          primary: "#1e3a8a", 
          
          // KARANLIK MOD VURGU RENGİ
          accent: "#fbbf24"
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}