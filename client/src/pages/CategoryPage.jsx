import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchProducts } from "../api/productAPI";
import ProductCard from "../components/ProductCard";
import EffectWrapper from "../components/EffectWrapper";
import Breadcrumb from "../components/Breadcrumb";
import FilterBar from "../components/FilterBar";
import InfoSection from "../components/InfoSection";

// -----------------------------
// Skeleton
// -----------------------------
const SkeletonCard = () => (
  <div className="animate-pulse bg-white dark:bg-slate-800 rounded-xl border p-4">
    <div className="h-44 bg-slate-200 dark:bg-slate-700 rounded-xl mb-3"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 w-3/4 mb-2 rounded"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 w-1/2 rounded"></div>
  </div>
);

const CategoryPage = () => {
  const { gender, category } = useParams(); 
  // gender: womens | mens
  // category: tops | jeans | bags | wallets ...

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  // ---------------------------------
  // FILTER LOGIC
  // ---------------------------------
  const filteredProducts = useMemo(() => {
    let list = [...products];

    list = list.filter(
      (p) =>
        p.gender?.toLowerCase() === gender &&
        p.category?.toLowerCase() === category
    );

    if (sortOption === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }

    if (sortOption === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, gender, category, sortOption]);

  const title = `${gender} / ${category}`.toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* HERO */}
      <section className="relative h-[34vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-transparent dark:from-slate-900/90 dark:via-slate-900/50" />

        <div className="relative text-center">
          <EffectWrapper>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              {title}
            </h1>
          </EffectWrapper>

          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Curated selection
          </p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="max-w-[1280px] mx-auto px-4 pt-4">
        <Breadcrumb />
      </div>

      {/* FILTER */}
      <div className="px-4 sticky top-20 z-40 mt-4">
        <div className="max-w-[1280px] mx-auto">
          <FilterBar
            sortOption={sortOption}
            setSortOption={setSortOption}
            totalCount={filteredProducts.length}
          />
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="px-4 py-10">
        <div className="max-w-[1280px] mx-auto">

          {loading ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-slate-500 mt-20">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-10">
              {filteredProducts.map((product, idx) => (
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

export default CategoryPage;
