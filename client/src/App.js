import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import { AuthProvider } from "./components/AuthContext";

// PAGES
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetails from "./pages/ProductDetails";
import NewArrivals from "./pages/NewArrivals";
import BagPage from "./pages/BagPage";
import FavoritesPage from "./pages/FavoritesPage";
import CheckoutPage from "./pages/CheckoutPage";
import FallCollection from "./pages/FallCollection";
import SettingsPage from "./pages/SettingsPage";
import WomenPage from "./pages/WomenPage";
import MenPage from "./pages/MenPage";
import StreetwearPage from "./pages/StreetwearPage";
import CategoryPage from "./pages/CategoryPage";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
        <Route path="/new" element={<PageTransition><NewArrivals /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><BagPage /></PageTransition>} />
        <Route path="/favorites" element={<PageTransition><FavoritesPage /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
        <Route path="/collection" element={<PageTransition><FallCollection /></PageTransition>} />
        <Route path="/women" element={<PageTransition><WomenPage /></PageTransition>} />
        <Route path="/men" element={<PageTransition><MenPage /></PageTransition>} />
        <Route path="/streetwear" element={<PageTransition><StreetwearPage /></PageTransition>} />
        <Route path="/:gender/:category" element={<PageTransition><CategoryPage /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><SettingsPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      {/* 🔑 KRİTİK: AuthProvider Router'ın İÇİNDE */}
      <AuthProvider>
        <ScrollToTop />

        {/* SABİT NAVBAR */}
        <Navbar />

        {/* SAYFA İÇERİĞİ */}
        <main className="pt-16">
          <AnimatedRoutes />
        </main>

        {/* TOAST */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#f1f5f9",
              color: "#0f172a",
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "14px",
              fontWeight: 500,
              border: "1px solid #e2e8f0",
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            },
            success: {
              iconTheme: {
                primary: "#16a34a",
                secondary: "#f1f5f9",
              },
              style: {
                borderLeft: "4px solid #16a34a",
              },
            },
            error: {
              iconTheme: {
                primary: "#dc2626",
                secondary: "#f1f5f9",
              },
              style: {
                borderLeft: "4px solid #dc2626",
              },
            },
          }}
        />
      </AuthProvider>
    </Router>
  );
};

export default App;
