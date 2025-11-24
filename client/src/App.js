import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductDetails from './pages/ProductDetails';
import RegisterPage from './pages/RegisterPage';
import NewArrivals from './pages/NewArrivals';
import BagPage from './pages/BagPage';


const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 2500 }} />

      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/new" element={<NewArrivals />} />
          <Route path="/cart" element={<BagPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
