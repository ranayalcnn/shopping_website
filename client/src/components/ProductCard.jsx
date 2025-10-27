import React, { useEffect, useState, useMemo } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-hot-toast'; // Toast bildirimleri için

// İki sabit rastgele resim URL'si oluşturmak için yardımcı fonksiyon (Değişiklik yok)
const createPlaceholderUrls = (id) => ({
    main: `https://picsum.photos/300/300?random=${id}`,
    hover: `https://picsum.photos/300/300?random=${id + 1}`, 
});

const ProductCard = ({ product }) => {
    const [liked, setLiked] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const localKey = 'favorites';
    
    // Rastgele resim URL'lerini useMemo ile hesapla (Değişiklik yok)
    const imagePlaceholderUrls = useMemo(() => {
        return createPlaceholderUrls(product.id || Math.random());
    }, [product.id]);

    // Favori durumu kontrolü (Değişiklik yok)
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(localKey)) || [];
        if (saved.includes(product.id)) {
            setLiked(true);
        }
    }, [product.id]);

    // Favori butonu işleyicisi (Değişiklik yok)
    const handleFavorite = () => {
        const saved = JSON.parse(localStorage.getItem(localKey)) || [];
        let updated;

        if (!liked) {
            updated = [...saved, product.id];
            toast.success(`${product.name} favorilere eklendi!`);
        } else {
            updated = saved.filter((id) => id !== product.id);
            toast.error(`${product.name} favorilerden çıkarıldı.`);
        }

        localStorage.setItem(localKey, JSON.stringify(updated));
        setLiked(!liked);
    };

    // Sepete Ekle butonu işleyicisi (Değişiklik yok)
    const handleAddToCart = () => {
        toast.success(`${product.name} sepete eklendi!`);
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 500); 
    };

    if (!product) return null;

    // Resim URL'lerini belirle (Değişiklik yok)
    const mainImageUrl = product.image && product.image.startsWith('http') 
        ? product.image 
        : imagePlaceholderUrls.main;
        
    const hoverImageUrl = product.hoverImage && product.hoverImage.startsWith('http') 
        ? product.hoverImage 
        : imagePlaceholderUrls.hover;

    return (
        // 🚨 KRİTİK: Kartın Genel Tasarımı ve Dark Mode Uyumu
        // Daha keskin gölge, hover'da daha belirgin yükselme, beyaz/koyu gri arkaplan.
        <div className="relative bg-white dark:bg-gray-800 w-full max-w-[280px] rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] group mx-auto cursor-pointer">

            {/* Favori Butonu */}
            <button
              onClick={(e) => { e.stopPropagation(); handleFavorite(); }} // Tıklamayı karttan ayırır
              // 🚨 GÜNCELLEME: Şeffaf arka plan, beyaz/koyu gri buton rengi
              className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md transition-all duration-300 transform ${
                liked 
                  ? 'text-red-500 scale-110' 
                  : 'text-gray-500 hover:text-red-500 hover:scale-105'
              } dark:bg-gray-900/70`}
            >
              {liked ? <AiFillHeart className="text-xl" /> : <AiOutlineHeart className="text-xl" />}
            </button>

            {/* Ürün Görsel Alanı */}
            <div className="w-full h-60 overflow-hidden relative">
                
                {/* 1. Ana Resim */}
                <img
                    src={mainImageUrl}
                    alt={`${product.name} (Ana)`}
                    // Yavaş geçiş ve hafif zoom efekti
                    className="absolute inset-0 w-full h-full object-cover rounded-t-xl transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                />

                {/* 2. Hover Resim */}
                <img
                    src={hoverImageUrl}
                    alt={`${product.name} (Hover)`}
                    // Yavaş geçiş ve hafif zoom efekti
                    className="absolute inset-0 w-full h-full object-cover rounded-t-xl transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                />
            </div>

            {/* Ürün Bilgileri ve Aksiyonlar */}
            <div className="p-4 flex flex-col justify-between h-[180px]">
                <div>
                    {/* 🚨 GÜNCELLEME: Başlık Metni Rengi */}
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate mb-1">
                        {product.name || 'Ürün Adı Yok'}
                    </h2>
                    
                    {/* Fiyat ve Rating Aynı Satırda */}
                    <div className="flex justify-between items-center mb-2">
                        {/* 🚨 GÜNCELLEME: Fiyat Rengi (Daha canlı bir primary renk) */}
                        <p className="text-base text-primary dark:text-indigo-400 font-extrabold"> 
                            {product.price !== undefined ? `${product.price.toFixed(2)} ₺` : 'Fiyat Bilinmiyor'}
                        </p>
                        
                        {product.rating && (
                            // Rating yıldızları rengi
                            <div className="text-yellow-500 dark:text-yellow-400 text-sm flex items-center">
                                {'★'.repeat(Math.round(product.rating))}
                                <span className="ml-1 text-gray-500 dark:text-gray-400 text-xs">
                                    ({product.rating.toFixed(1)})
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {/* 🚨 GÜNCELLEME: Açıklama Metni Rengi */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {product.description || 'Bu ürün hakkında kısa bir açıklama yok.'}
                    </p>
                </div>

                {/* Sepet Butonu Kapsayıcısı */}
                <div className='mt-3 flex justify-end'>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(); }} // Tıklamayı karttan ayırır
                        // 🚨 GÜNCELLEME: Daha düzgün bir buton görünümü ve Dark Mode uyumu
                        className={`w-10 h-10 flex items-center justify-center rounded-full
                            bg-primary text-white text-xl shadow-lg
                            hover:bg-primary/90 hover:scale-110 transition-all duration-300 ease-out
                            dark:bg-indigo-600 dark:hover:bg-indigo-500
                            ${isClicked ? 'animate-bounce' : ''}`}
                        title="Sepete Ekle"
                    >
                        <FiShoppingCart />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;