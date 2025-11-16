import React, { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "../api/productAPI";
import ProductCard from "../components/ProductCard";
import EffectWrapper from "../components/EffectWrapper";
import { ChevronDown } from "lucide-react";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    load();
  }, []);

  const categories = ["all", "women", "men", "streetwear"];

  const finalList = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter((p) => p.category?.toLowerCase() === category);
    }

    if (sortOption === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, category, sortOption]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ============================ */}
      {/* HERO */}
      {/* ============================ */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">

        <img
          src="/images/newarrivals-banner.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-transparent" />

        <div className="relative text-center max-w-2xl">
          <EffectWrapper delay={0.1}>
            <h1 className="text-6xl font-extrabold text-slate-900">
              New Arrivals
            </h1>
          </EffectWrapper>

          <EffectWrapper delay={0.2}>
            <p className="text-lg text-slate-700 mt-3">
              Discover the newest curated collections.
            </p>
          </EffectWrapper>

          <EffectWrapper delay={0.3}>
            <div className="w-24 h-[4px] bg-emerald-500 rounded-full mx-auto mt-6"></div>
          </EffectWrapper>
        </div>
      </section>

      {/* ============================ */}
      {/* FILTER + SORT BAR */}
      {/* ============================ */}
      <section className="px-4 mt-14">
        <div className="max-w-[1280px] mx-auto bg-white border border-slate-200 
                        rounded-2xl shadow-xl p-6">

          <div className="flex justify-between items-center">

            {/* CATEGORY BUTTONS */}
            <div className="flex gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`
                    px-6 py-2 rounded-full font-semibold capitalize transition
                    ${
                      category === cat
                        ? "bg-slate-900 text-white border border-emerald-400 shadow-xl"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* SORT + FILTER DROPDOWNS */}
            <div className="flex items-center gap-4">

              {/* SORT (select dropdown) */}
              <div className="relative">
                <select
                  className="
                    px-5 py-2 bg-slate-100 text-slate-800 
                    border border-slate-300 rounded-xl shadow-sm 
                    hover:border-emerald-500 hover:bg-slate-100
                    transition cursor-pointer
                  "
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="default">Sort</option>
                  <option value="price-asc">Low → High</option>
                  <option value="price-desc">High → Low</option>
                </select>
              </div>

              {/* FILTER (dropdown like sort) */}
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="
                    px-5 py-2 flex items-center gap-2 
                    bg-slate-100 border border-slate-300 
                    rounded-xl shadow-sm transition
                    hover:border-emerald-500 hover:bg-slate-100
                  "
                >
                  Filters
                  <ChevronDown
                    className={`w-4 h-4 transition ${filterOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* dropdown */}
                {filterOpen && (
                  <div className="
                    absolute mt-2 w-56 bg-white 
                    border border-slate-200 shadow-xl 
                    rounded-xl p-4 z-20 animate-fadeIn
                  ">
                    <label className="flex items-center gap-2 mb-3">
                      <input type="checkbox" className="accent-emerald-600" />
                      <span className="text-slate-700">In stock only</span>
                    </label>

                    <label className="flex items-center gap-2 mb-3">
                      <input type="checkbox" className="accent-emerald-600" />
                      <span className="text-slate-700">Premium selection</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="accent-emerald-600" />
                      <span className="text-slate-700">Navy + Green tones</span>
                    </label>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================ */}
      {/* PRODUCT GRID */}
      {/* ============================ */}
      <section className="px-4 py-20">
        <div className="max-w-[1280px] mx-auto">
          
          <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center gap-3">
            All Products
            <span className="w-8 h-[4px] bg-emerald-500 rounded-full"></span>
          </h2>

          {finalList.length === 0 ? (
            <p className="text-slate-600 text-center text-lg">No products found.</p>
          ) : (
            <div className="grid grid-cols-4 gap-12">
              {finalList.map((product, i) => (
                <EffectWrapper key={product.id} delay={i * 0.05}>
                  <ProductCard product={product} />
                </EffectWrapper>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewArrivals;
