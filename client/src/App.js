import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
// Eğer favoriler, sepet gibi sayfaların varsa buraya import edebilirsin:
// import FavoritesPage from './pages/FavoritesPage';
// import CartPage from './pages/CartPage';

const App = () => {
  return (
    <>
      {/* Popup bildirimleri için konumlandırma */}
      <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 2500 }} />

      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/favoriler" element={<FavoritesPage />} /> */}
          {/* <Route path="/sepet" element={<CartPage />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
