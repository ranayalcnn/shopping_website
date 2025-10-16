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
        // BÜYÜK DEĞİŞİKLİK: Genel arka plan ve metin renkleri Dark Mode'a uyarlandı.
        // Konfigürasyondaki renkler kullanıldı: bg-background, text-text, dark:bg-dark-background, dark:text-dark-text
        <div className="bg-background text-text dark:bg-dark-background dark:text-dark-text min-h-screen font-sans">
            
            {/* Hero (bg-primary zaten Dark Mode'da otomatik değişecektir, sorun yok) */}
            <section className="bg-primary text-white py-20 text-center px-4">
                <h1 className="text-5xl font-extrabold mb-4">
                    Tarzını Yansıt
                </h1>

                <p className="text-lg mb-6">
                    En yeni ve havalı T-Shirt modelleri burada!
                </p>

                <button
                    className="bg-white text-primary px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
                >
                    Alışverişe Başla
                </button>
            </section>
            
            {/* Arama */}
            <SearchBar value={searchTerm} onChange={setSearchTerm} />

            {/* Ürünler Bölümü */}
            <section className="px-4 py-12">
                <div className="mx-auto w-full max-w-[1280px]">
                    
                    {/* Başlık (text-primary otomatik değişir) */}
                    <h2 className="text-3xl font-bold text-center text-primary mb-8">
                        Öne Çıkan Ürünler
                    </h2>

                    {error && <p className="text-center text-red-500">{error}</p>}
                    
                    {/* BÜYÜK DEĞİŞİKLİK: Çerçeveli kapsayıcı Dark Mode'a uyarlandı */}
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                        
                        {/* BÜYÜK DEĞİŞİKLİK: İç kutu arka planı Dark Mode'a uyarlandı */}
                        <div className="rounded-2xl bg-card dark:bg-dark-card p-6"> 
                            {filteredProducts.length === 0 && !error ? (
                                <p className="text-center text-gray-500 dark:text-gray-400">Aradığınız ürün bulunamadı.</p>
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
                </div>
            </section>
        </div>
    );
};

export default HomePage;