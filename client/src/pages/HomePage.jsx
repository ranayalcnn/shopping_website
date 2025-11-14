import React, { useEffect, useState, useMemo } from 'react';
import { fetchProducts } from '../api/productAPI';
import ProductCard from '../components/ProductCard';
import AnimatedWrapper from '../components/AnimatedWrapper';
import FilterBar from '../components/FilterBar';

const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  // Ürünleri yükle
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setAllProducts(data);
        setProducts(data.slice(0, 4)); // ilk 4 ürün
      } catch (err) {
        console.error('❌ Ürünleri alırken hata:', err);
        setError('Ürünler yüklenemedi.');
      }
    };
    loadProducts();
  }, []);

  // 4 ürünü rastgele seç
  const shuffleProducts = () => {
    if (allProducts.length === 0) return;
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 4);
    setProducts(shuffled);
  };

  // Kategoriler
  const categories = useMemo(() => {
    const unique = [...new Set(allProducts.map((p) => p.category || 'Genel'))];
    return ['all', ...unique];
  }, [allProducts]);

  // Filtre + sıralama
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (category !== 'all') {
      filtered = filtered.filter((p) => (p.category || 'Genel') === category);
    }
    if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [products, category, sortOption]);

  return (
    <div className="min-h-screen font-sans transition-colors duration-300
                    bg-slate-50 text-slate-900
                    dark:bg-slate-950 dark:text-slate-100">

      {/* Hero */}
      <section className="text-white py-20 text-center px-4 shadow-lg
                          bg-gradient-to-r from-slate-800 to-slate-900
                          dark:from-slate-900 dark:to-slate-950">
        <AnimatedWrapper delay={0.1} className="inline-block">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Tarzını Yansıt
          </h1>
        </AnimatedWrapper>

        <AnimatedWrapper delay={0.3}>
          <p className="text-lg mb-6 opacity-90">
            En yeni ve havalı ürünler burada!
          </p>
        </AnimatedWrapper>

        <AnimatedWrapper delay={0.5}>
          <button
            className="rounded-full px-6 py-3 font-semibold shadow
                       bg-white text-emerald-700 hover:bg-slate-50
                       dark:bg-slate-900 dark:text-emerald-300 dark:hover:bg-slate-800
                       focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition"
          >
            Alışverişe Başla
          </button>
        </AnimatedWrapper>
      </section>

      {/* Ürünler */}
      <section className="px-4 py-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <AnimatedWrapper delay={0.1}>
            <h2 className="text-center text-3xl font-bold mb-3 tracking-tight
                           text-slate-800 dark:text-slate-100">
              TRENDING
            </h2>
          </AnimatedWrapper>

          {/* ince vurgu çizgisi */}
          <div className="mx-auto mb-8 h-1 w-24 rounded-full
                          bg-emerald-600 dark:bg-emerald-400"></div>

          {/* Filtre bar (ayrı component) */}
          <FilterBar
            categories={categories}
            category={category}
            setCategory={setCategory}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />

          <div className="rounded-2xl border shadow-xl transition-colors duration-300
                          border-slate-200 dark:border-slate-800">
            <div className="rounded-2xl p-6
                            bg-white dark:bg-slate-900">

              {error && <p className="text-center text-red-500">{error}</p>}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 items-stretch mb-10">
                {filteredProducts.map((product, index) => (
                  <AnimatedWrapper
                    key={product._id || product.id || index}
                    delay={index * 0.1}
                    className="h-full flex"
                  >
                    <ProductCard product={product} />
                  </AnimatedWrapper>
                ))}
              </div>

              {/* Ürünleri Değiştir */}
              <div className="flex justify-center">
                <button
                  onClick={shuffleProducts}
                  className="rounded-full px-8 py-3 font-semibold shadow-lg
                             text-white
                             bg-emerald-600 hover:bg-emerald-700
                             dark:bg-emerald-500 dark:hover:bg-emerald-400
                             focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400
                             transition"
                >
                  Ürünleri Değiştir
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
