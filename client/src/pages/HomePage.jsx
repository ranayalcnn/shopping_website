import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productAPI';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { motion } from 'framer-motion';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error('❌ Ürünleri alırken hata:', err);
        setError('Ürünler yüklenemedi.');
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 text-center px-4">
        <motion.h1
          className="text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Tarzını Yansıt
        </motion.h1>

        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          En yeni ve havalı T-Shirt modelleri burada!
        </motion.p>

        <motion.button
          className="bg-white text-primary px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Alışverişe Başla
        </motion.button>
      </section>

      {/* Arama */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Öne Çıkanlar */}
      <section className="px-4 py-12">
        <div className="mx-auto w-full max-w-[1280px]">
          <motion.h2
            className="text-3xl font-bold text-center text-primary mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Öne Çıkan Ürünler
          </motion.h2>

          {error && <p className="text-center text-red-500">{error}</p>}
          {/* Çerçeveli kapsayıcı (gradyan kenarlık + beyaz iç) */}
          <div className="rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/30 p-[2px] shadow-sm">
            <div className="rounded-2xl bg-white/90 backdrop-blur p-6">
              {filteredProducts.length === 0 && !error ? (
                <p className="text-center text-gray-500">Aradığınız ürün bulunamadı.</p>
              ) : (
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product._id || product.id || index}
                      product={product}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* /Çerçeve sonu */}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
