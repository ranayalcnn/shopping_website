import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/productAPI";
import ProductCard from "../components/ProductCard";
import EffectWrapper from "../components/EffectWrapper";
import Breadcrumb from "../components/Breadcrumb";
import InfoSection from "../components/InfoSection";

const StreetwearPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(
        data.filter((p) => p.category === "streetwear")
      );
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* HERO */}
      <section className="relative h-[42vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/streetwear.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/30 dark:from-slate-900/80 dark:to-slate-900/40" />

        <div className="relative text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white">
            Streetwear
          </h1>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            Bold silhouettes & urban attitude
          </p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 pt-6">
        <Breadcrumb />
      </div>

      <section className="px-4 py-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, i) => (
              <EffectWrapper key={product.id} delay={i * 0.05}>
                <ProductCard product={product} />
              </EffectWrapper>
            ))}
          </div>
        </div>
      </section>

      <InfoSection />
    </div>
  );
};

export default StreetwearPage;
