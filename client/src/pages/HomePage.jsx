import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productAPI';
import ProductCard from '../components/ProductCard';
// 🚨 KALDIRILDI: SearchBar bileşeni artık Navbar içinde.
// import SearchBar from '../components/SearchBar'; 
// Düzeltilmiş import yolu
import AnimatedWrapper from '../components/AnimatedWrapper'; 

const HomePage = () => {
    const [products, setProducts] = useState([]);
    // 🚨 KALDIRILDI: Arama çubuğu (SearchBar) Navbar'a taşındığı için searchTerm state'i kaldırıldı.
    // const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    // 🚨 NOT: Arama filtresi, eğer arama işlevini Navbar'da tutuyorsanız, 
    // bu sayfada da kullanmak için Navbar'dan gelen bir prop'a (veya Global State'e) ihtiyaç duyar.
    // Şimdilik filtreleme mekanizmasını basitleştirip, tüm ürünleri gösterelim.
    // Eğer filtreleme isteniyorsa, `searchTerm`'ün merkezi bir state yönetiminden (Redux/Context) gelmesi gerekir.

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

    // 🚨 DEĞİŞİKLİK: Filtreleme kaldırıldığı için tüm ürünler gösterilir.
    // Eğer filtreleme global olarak yönetilseydi, bu kısım şöyle olurdu:
    // const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(globalSearchTerm.toLowerCase()));
    const filteredProducts = products;


    return (
        // DARK MODE UYUMLULUĞU: Genel arka plan ve metin renkleri
        <div className="bg-background text-text dark:bg-dark-background dark:text-dark-text min-h-screen font-sans">
            
            {/* Hero Alanı */}
            <section className="bg-primary text-white py-20 text-center px-4">
                
                {/* Başlık için animasyon */}
                <AnimatedWrapper delay={0.1} className="inline-block">
                    <h1 className="text-5xl font-extrabold mb-4">
                        Tarzını Yansıt
                    </h1>
                </AnimatedWrapper>

                {/* Paragraf ve Buton için farklı gecikmelerle animasyon */}
                <AnimatedWrapper delay={0.3}>
                    <p className="text-lg mb-6">
                        En yeni ve havalı T-Shirt modelleri burada!
                    </p>
                </AnimatedWrapper>

                <AnimatedWrapper delay={0.5}>
                    <button
                        // 🚨 KRİTİK DEĞİŞİKLİK: Hero Butonunun Dark Mode Uyumu
                        // Dark Mode'da arka planı dark-background ve metni primary yapalım.
                        className="bg-white text-primary px-6 py-3 rounded-full font-semibold shadow 
                                   hover:bg-gray-100 transition 
                                   dark:bg-dark-background dark:text-dark-primary dark:hover:bg-gray-800"
                    >
                        Alışverişe Başla
                    </button>
                </AnimatedWrapper>
            </section>
            
            {/* 🚨 KALDIRILDI: SearchBar bileşeni bu kısımdan tamamen çıkarıldı. */}
            {/* <AnimatedWrapper delay={0.7}>
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </AnimatedWrapper> */}


            {/* Ürünler Bölümü */}
            <section className="px-4 py-12">
                <div className="mx-auto w-full max-w-[1280px]">
                    
                    {/* Ürünler Başlığı için animasyon */}
                    <AnimatedWrapper delay={0.1}>
                        {/* 🚨 DEĞİŞİKLİK: Başlık Dark Mode Uyumu */}
                        <h2 className="text-3xl font-bold text-center text-primary dark:text-dark-primary mb-8">
                            Öne Çıkan Ürünler
                        </h2>
                    </AnimatedWrapper>

                    {error && <p className="text-center text-red-500">{error}</p>}
                    
                    {/* 🚨 DEĞİŞİKLİK: Ürün Listesi Kapsayıcılarının Dark Mode Uyumu */}
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-2xl">
                        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6"> {/* bg-card/dark-card yerine daha net renkler */}
                            {filteredProducts.length === 0 && !error ? (
                                <p className="text-center text-gray-500 dark:text-gray-400">Aradığınız ürün bulunamadı.</p>
                            ) : (
                                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
                                    {filteredProducts.map((product, index) => (
                                        <AnimatedWrapper 
                                            key={product._id || product.id || index} 
                                            delay={index * 0.1} 
                                        >
                                            <ProductCard
                                                product={product}
                                            />
                                        </AnimatedWrapper>
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