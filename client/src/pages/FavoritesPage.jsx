import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/productAPI";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import InfoSection from "../components/InfoSection";
import Breadcrumb from "../components/Breadcrumb";

const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteIds(stored);

    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) => favoriteIds.includes(p.id));
    setFavorites(filtered);
  }, [products, favoriteIds]);

  const handleRemovedFavorite = (removedId) => {
    setFavoriteIds((prev) => prev.filter((id) => id !== removedId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">

      <div className="flex-1">

        {/* HEADER */}
        <div className="max-w-[1280px] mx-auto px-4 pt-10 pb-8">

          {/* BREADCRUMB */}
          <div className="mb-4">
            <Breadcrumb />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                Your Favorites
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Products you’ve saved for quick access.
              </p>
            </div>

            {/* COUNT BADGE */}
            <div
              className="
                px-4 py-2 rounded-full
                bg-emerald-50 dark:bg-emerald-900/30
                text-emerald-700 dark:text-emerald-300
                font-medium text-sm
              "
            >
              {favorites.length} item{favorites.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="mt-6 w-full h-px bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* EMPTY STATE */}
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-20">

            <div
              className="
                p-6 rounded-full 
                bg-slate-200 dark:bg-slate-800 
                shadow-inner mb-6
              "
            >
              <Heart className="w-12 h-12 text-slate-500 dark:text-slate-400" />
            </div>

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
              No favorites yet
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-center max-w-md mb-6">
              Save products you like to quickly find them here later.
            </p>

            <Link
              to="/new"
              className="
                px-7 py-3 rounded-full
                bg-slate-900 text-white 
                dark:bg-white dark:text-slate-900
                hover:opacity-90 transition
                shadow-md font-medium
              "
            >
              Explore New Arrivals
            </Link>
          </div>
        ) : (
          /* FAVORITES GRID */
          <div className="max-w-[1280px] mx-auto px-4 pb-16">
            <div
              className="
                grid
                grid-cols-[repeat(auto-fill,minmax(220px,1fr))]
                gap-10
                mt-8
              "
            >
              {favorites.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onFavoriteChange={handleRemovedFavorite}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* INFO SECTION */}
      <InfoSection />
    </div>
  );
};

export default FavoritesPage;
