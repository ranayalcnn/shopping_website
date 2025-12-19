import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/productAPI";
import ProductCard from "../components/ProductCard";
import EffectWrapper from "../components/EffectWrapper";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InfoSection from "../components/InfoSection";

const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 4;

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setAllProducts(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    load();
  }, []);

  const paginatedProducts = useMemo(() => {
    if (allProducts.length === 0) return [];
    let end = startIndex + itemsPerPage;

    if (end > allProducts.length) {
      return [
        ...allProducts.slice(startIndex),
        ...allProducts.slice(0, end - allProducts.length),
      ];
    }
    return allProducts.slice(startIndex, end);
  }, [allProducts, startIndex]);

  const next = () =>
    setStartIndex((prev) => (prev + itemsPerPage) % allProducts.length);

  const prev = () =>
    setStartIndex((prev) =>
      prev - itemsPerPage < 0
        ? allProducts.length - itemsPerPage
        : prev - itemsPerPage
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* ================= HERO ================= */}
      <section className="relative h-[75vh] w-full overflow-hidden shadow-xl flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
          <motion.img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center gap-6 px-4">
          <EffectWrapper delay={0.2}>
            <h1 className="text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
              Elevate Your Style
            </h1>
          </EffectWrapper>

          <EffectWrapper delay={0.4}>
            <p className="text-xl max-w-2xl text-white/90">
              Discover new arrivals crafted for a modern and elegant wardrobe.
            </p>
          </EffectWrapper>

          <EffectWrapper delay={0.6}>
            <Link
              to="/new"
              className="mt-4 px-10 py-3 bg-white text-slate-900 rounded-full shadow font-semibold 
                         hover:bg-slate-200 transition"
            >
              Shop Now
            </Link>
          </EffectWrapper>
        </div>
      </section>

      {/* ================= FALL BANNER ================= */}
      <section className="relative w-full mt-20 px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-xl h-[480px]">
          <img
            src="/images/fall.jpg"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-transparent pointer-events-none" />

          <div className="absolute bottom-16 left-16 text-white flex flex-col gap-4 z-10">
            <EffectWrapper delay={0.1}>
              <h2 className="text-5xl font-extrabold">
                Fall Collection 2025
              </h2>
            </EffectWrapper>

            <EffectWrapper delay={0.25}>
              <p className="text-lg opacity-90 max-w-lg">
                Minimal, modern and curated for the season.
              </p>
            </EffectWrapper>

            <EffectWrapper delay={0.4}>
              <Link
                to="/collection"
                className="inline-block mt-4 px-8 py-2 bg-white text-slate-900 rounded-full 
                           font-semibold shadow hover:bg-slate-200 transition"
              >
                Explore Now
              </Link>
            </EffectWrapper>
          </div>
        </div>
      </section>

      {/* ================= NEW ARRIVALS ================= */}
      <section className="px-4 py-24">
        <div className="max-w-[1280px] mx-auto">

          <EffectWrapper delay={0.1}>
            <h2 className="text-center text-4xl font-bold text-slate-900 dark:text-white">
              New Arrivals
            </h2>
          </EffectWrapper>

          <p className="text-center mt-3 mb-14 text-slate-600 dark:text-slate-400">
            Explore the newest curated categories
          </p>

          <div className="grid grid-cols-3 gap-12">

            <EffectWrapper delay={0.2}>
              <Link to="/women" className="group relative h-[360px] rounded-3xl overflow-hidden shadow-lg block">
                <img src="/images/women.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold">Women’s</h3>
                  <p className="opacity-90">Collection</p>
                </div>
              </Link>
            </EffectWrapper>

            <EffectWrapper delay={0.3}>
              <Link to="/men" className="group relative h-[360px] rounded-3xl overflow-hidden shadow-lg block">
                <img src="/images/men.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold">Men’s</h3>
                  <p className="opacity-90">Collection</p>
                </div>
              </Link>
            </EffectWrapper>

            <EffectWrapper delay={0.4}>
              <Link to="/streetwear" className="group relative h-[360px] rounded-3xl overflow-hidden shadow-lg block">
                <img src="/images/streetwear.jpg" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold">Streetwear</h3>
                  <p className="opacity-90">Collection</p>
                </div>
              </Link>
            </EffectWrapper>

          </div>
        </div>
      </section>

      {/* ================= TRENDING SLIDER ================= */}
      <section className="px-4 pt-10 pb-24">
        <div className="max-w-[1280px] mx-auto">

          <EffectWrapper delay={0.1}>
            <h2 className="text-center text-4xl font-bold text-slate-900 dark:text-white">
              Trending Picks
            </h2>
          </EffectWrapper>

          <p className="text-center mb-12 mt-3 text-slate-600 dark:text-slate-400">
            Discover what’s trending this week
          </p>

          <div className="relative bg-white/80 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 
                          backdrop-blur-lg shadow-xl rounded-2xl">

            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                         w-10 h-10 flex items-center justify-center rounded-full
                         bg-white/90 dark:bg-slate-800
                         border border-slate-300 dark:border-slate-600
                         shadow-md hover:scale-105 transition"
            >
              <ChevronLeft className="w-5 h-5 text-slate-800 dark:text-white" />
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                         w-10 h-10 flex items-center justify-center rounded-full
                         bg-white/90 dark:bg-slate-800
                         border border-slate-300 dark:border-slate-600
                         shadow-md hover:scale-105 transition"
            >
              <ChevronRight className="w-5 h-5 text-slate-800 dark:text-white" />
            </button>

            <div className="p-10">
              <div className="grid grid-cols-4 gap-12">
                {paginatedProducts.map((product, i) => (
                  <EffectWrapper key={product.id} delay={i * 0.08}>
                    <ProductCard product={product} />
                  </EffectWrapper>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <InfoSection />
    </div>
  );
};

export default HomePage;
