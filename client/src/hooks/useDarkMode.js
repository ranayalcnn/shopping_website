import { useState, useEffect } from 'react';

function useDarkMode() {
  // 1. Durumun Başlangıcını Belirleme
  const [theme, setTheme] = useState(() => {
    // A) LocalStorage'ı kontrol et
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    // B) Sistem tercihini kontrol et (varsayılanı dark yap)
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // 2. Renk temasını (toggle yapıldığında neye geçileceğini) hesaplama
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  // 3. Etki (Side Effect): Theme değiştiğinde DOM ve LocalStorage'ı güncelle
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Geçerli temayı LocalStorage'a kaydet
    localStorage.setItem('theme', theme);

    // HTML etiketine 'dark' sınıfını ekle veya kaldır
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

  }, [theme]); // 'theme' değiştiğinde çalıştır

  // 4. Temayı değiştirmek için bir toggle fonksiyonu
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // [Geçerli Tema Adı ('light' veya 'dark'), Toggle Fonksiyonu] döndürülür
  return [colorTheme, toggleTheme]; 
}

export default useDarkMode;