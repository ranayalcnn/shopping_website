import React, { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "../api/productAPI";
import ProductCard from "../components/ProductCard";
import EffectWrapper from "../components/EffectWrapper";
import InfoSection from "../components/InfoSection";
import Breadcrumb from "../components/Breadcrumb";
import FilterBar from "../components/FilterBar";

// --------------------------------------
// Skeleton loader
// --------------------------------------
const SkeletonCard = () => (
  <div className="animate-pulse bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-300 dark:border-slate-700 p-4">
    <div className="h-44 bg-slate-200 dark:bg-slate-700 rounded-xl mb-3"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 w-3/4 mb-2 rounded"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 w-1/2 rounded"></div>
  </div>
);

const FallCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("all"); // gender
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data.filter((p) => p.season === "fall"));
      setLoading(false);
    };
    load();
  }, []);

  const categories = ["all", "womens", "mens"];

  const finalList = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter(
        (p) => p.gender?.toLowerCase() === category
      );
    }

    if (sortOption === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortOption === "name") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [products, category, sortOption]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">

      {/* -------------------------------------- */}
      {/* HERO (AYNI YAPI) */}
      {/* -------------------------------------- */}
      <section className="relative h-[34vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/newarrivals-banner.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-35 dark:opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-transparent dark:from-slate-900/90 dark:via-slate-900/50" />

        <div className="relative text-center max-w-xl">
          <EffectWrapper delay={0.1}>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              Fall Collection
            </h1>
          </EffectWrapper>

          <EffectWrapper delay={0.2}>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
              Seasonal fall essentials
            </p>
          </EffectWrapper>

          <div className="w-16 h-[3px] bg-emerald-500 rounded-full mx-auto mt-4"></div>
        </div>
      </section>

      {/* -------------------------------------- */}
      {/* BREADCRUMB */}
      {/* -------------------------------------- */}
      <div className="max-w-[1280px] mx-auto px-4 pt-4">
        <Breadcrumb />
      </div>

      {/* -------------------------------------- */}
      {/* FILTER BAR (AYNI COMPONENT) */}
      {/* -------------------------------------- */}
      <div className="px-4 sticky top-20 z-40 mt-4">
        <div className="max-w-[1280px] mx-auto">
          <FilterBar
            categories={categories}
            category={category}
            setCategory={setCategory}
            sortOption={sortOption}
            setSortOption={setSortOption}
            totalCount={finalList.length}
          />
        </div>
      </div>

      {/* -------------------------------------- */}
      {/* PRODUCT LIST */}
      {/* -------------------------------------- */}
      <section className="px-4 py-10">
        <div className="max-w-[1280px] mx-auto">

          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Products
            </h2>
            <span className="w-6 h-[3px] bg-emerald-500 rounded-full"></span>
          </div>

          {loading ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : finalList.length === 0 ? (
            <p className="text-center text-slate-600 dark:text-slate-400 mt-20">
              No fall products found.
            </p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-10">
              {finalList.map((product, idx) => (
                <EffectWrapper key={product.id} delay={idx * 0.03}>
                  <ProductCard product={product} />
                </EffectWrapper>
              ))}
            </div>
          )}
        </div>
      </section>

      <InfoSection />
    </div>
  );
};

export default FallCollection;
