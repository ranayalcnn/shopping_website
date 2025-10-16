import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

// Rastgele resim çekme fonksiyonu
// product.id'yi kullanarak her ürüne sabit ama farklı bir resim çekmeyi garantileriz.
const getRandomImage = (id) => {
    // 300x300 boyutunda rastgele resim çekilir. 
    // ?random=ID, her ID için aynı resmin gelmesini sağlar (kalıcılık).
    return `https://picsum.photos/300/300?random=${id}`;
};

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const localKey = 'favorites';

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(localKey)) || [];
    if (saved.includes(product.id)) {
      setLiked(true);
    }
  }, [product.id]);

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

  const handleAddToCart = () => {
    toast.success(`${product.name} sepete eklendi!`);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
  };

  if (!product) return null;

  return (
    <div className="relative bg-card dark:bg-dark-card w-full max-w-[280px] rounded-xl overflow-hidden shadow-lg dark:shadow-2xl hover:shadow-xl transition-transform transform hover:scale-[1.03] group mx-auto">

      {/* Favori Butonu */}
      <button
        onClick={handleFavorite}
        className={`absolute top-3 right-3 z-10 text-3xl transition-transform transform ${
          liked 
            ? 'text-red-500 scale-110 dark:text-red-400' 
            : 'text-gray-300 hover:text-red-400 hover:scale-105 dark:text-gray-500 dark:hover:text-red-400'
        }`}
      >
        {liked ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>

      {/* Ürün Görseli */}
      <div className="overflow-hidden">
        <img
          // BÜYÜK DEĞİŞİKLİK: Eğer ürün.image tanımlı değilse veya geçersizse, rastgele resim çekilir.
          src={
            product.image?.startsWith('http')
              ? product.image
              : getRandomImage(product.id) // product.id'yi kullanarak her ürüne farklı resim sağlar
          }
          alt={product.name || 'Ürün'}
          className="w-full h-60 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Ürün Bilgileri */}
      <div className="p-4 flex flex-col justify-between h-[200px]">
        <div>
          {/* Başlık Metni Rengi */}
          <h2 className="text-base font-semibold text-heading dark:text-dark-heading truncate">
            {product.name || 'Ürün Adı Yok'}
          </h2>
          
          {/* Fiyat Rengi */}
          <p className="text-sm text-green-600 dark:text-green-400 font-bold mt-1">
            {product.price !== undefined ? `${product.price} ₺` : 'Fiyat Bilinmiyor'}
          </p>
          
          {/* Açıklama Metni Rengi */}
          <p className="text-xs text-text dark:text-dark-text mt-1 line-clamp-2">
            {product.description || 'Açıklama yok.'}
          </p>

          {product.rating && (
            // Rating yıldızları rengi
            <div className="mt-2 text-yellow-500 dark:text-yellow-400 text-sm">
              {'★'.repeat(Math.round(product.rating))}{' '}
              <span className="text-gray-400 dark:text-gray-500">{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Sepet Butonu */}
        <button
          onClick={handleAddToCart}
          className={`mt-4 self-end w-11 h-11 flex items-center justify-center rounded-full
            bg-primary text-white text-xl shadow-md
            hover:scale-110 hover:shadow-lg transition-all duration-300 ease-out
            ${isClicked ? 'animate-bounce' : ''}`}
          title="Sepete Ekle"
        >
          <FiShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;