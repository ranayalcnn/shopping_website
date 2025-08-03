import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productAPI';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4">Tarzını Yansıt</h1>
        <p className="text-lg mb-6">En yeni ve havalı T-Shirt modelleri burada!</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition">
          Alışverişe Başla
        </button>
      </section>

      {/* Arama */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Ürünler */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Ürünler</h2>

        {error && <p className="text-center text-red-500">{error}</p>}

        {filteredProducts.length === 0 && !error ? (
          <p className="text-center text-gray-500">Aradığınız ürün bulunamadı.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product._id || product.id || index} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
