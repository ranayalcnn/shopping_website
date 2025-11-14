import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const createPlaceholderUrls = (id) => {
  const size = 300;
  return {
    main: `https://placehold.co/${size}x${size}/334155/e2e8f0?text=Product+${id}`, // slate700 / slate100
    hover: `https://placehold.co/${size}x${size}/e2e8f0/065f46?text=View`,        // slate100 / emerald800
  };
};

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const localKey = 'favorites';

  const imagePlaceholderUrls = useMemo(() => {
    return createPlaceholderUrls(product?.id || Math.random());
  }, [product?.id]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(localKey)) || [];
    if (product?.id && saved.includes(product.id)) setLiked(true);
  }, [product?.id]);

  const handleFavorite = () => {
    if (!product) return;
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
    if (!product) return;
    toast.success(`${product.name} sepete eklendi!`);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 450);
  };

  if (!product) return null;

  const mainImageUrl =
    product.image && (product.image.startsWith('http') || product.image.startsWith('/'))
      ? product.image
      : imagePlaceholderUrls.main;

  const hoverImageUrl =
    product.hoverImage && (product.hoverImage.startsWith('http') || product.hoverImage.startsWith('/'))
      ? product.hoverImage
      : imagePlaceholderUrls.hover;

  return (
    <div
      className="group h-full flex flex-col w-full sm:w-[260px]
                 rounded-xl overflow-hidden
                 bg-white border border-slate-200 shadow-sm
                 hover:border-emerald-200/70 hover:shadow-md
                 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-emerald-700/40
                 transition-all duration-300"
    >
      {/* Favori */}
      <button
        onClick={handleFavorite}
        className={`absolute z-10 m-3 self-end p-2 rounded-full
                    bg-white/85 text-slate-600 shadow
                    hover:scale-105 active:scale-95
                    dark:bg-slate-900/85 dark:text-slate-200
                    transition
                    ${liked ? 'text-emerald-600 dark:text-emerald-400' : ''}`}
        title={liked ? 'Favorilerde' : 'Favorilere ekle'}
      >
        {liked ? <AiFillHeart className="text-xl" /> : <AiOutlineHeart className="text-xl" />}
      </button>

      {/* Görsel */}
      <Link to={`/product/${product.id}`} className="relative w-full aspect-[1/1] overflow-hidden">
        <img
          src={mainImageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.04] group-hover:opacity-0"
        />
        <img
          src={hoverImageUrl}
          alt={`${product.name} hover`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.04]"
        />
      </Link>

      {/* Bilgi */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <Link to={`/product/${product.id}`}>
          <h3
            className="text-base font-semibold tracking-tight
                       text-slate-900 hover:text-emerald-700
                       dark:text-slate-100 dark:hover:text-emerald-400
                       transition line-clamp-1"
            title={product.name}
          >
            {product.name || 'Ürün Adı Yok'}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
            {typeof product.price === 'number' ? `${product.price.toFixed(2)} ₺` : 'Fiyat Yok'}
          </p>

          {product.rating ? (
            <div
              className="text-sm flex items-center text-amber-600 dark:text-amber-400"
              aria-label={`Puan ${product.rating.toFixed(1)}`}
              title={`Puan: ${product.rating.toFixed(1)}`}
            >
              {'★'.repeat(Math.round(product.rating))}
              <span className="ml-1 text-slate-500 dark:text-slate-400 text-xs">
                ({product.rating.toFixed(1)})
              </span>
            </div>
          ) : (
            <span className="text-xs text-slate-400 dark:text-slate-500">Puan yok</span>
          )}
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
          {product.description || 'Bu ürün hakkında kısa bir açıklama yok.'}
        </p>

        {/* Sepete Ekle */}
        <div className="mt-auto pt-2 flex justify-end">
          <button
            onClick={handleAddToCart}
            className={`w-10 h-10 rounded-full flex items-center justify-center
                        bg-emerald-600 text-white shadow
                        hover:bg-emerald-700 active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-emerald-500
                        dark:bg-emerald-500 dark:hover:bg-emerald-400
                        transition ${isClicked ? 'animate-bounce' : ''}`}
            title="Sepete Ekle"
            aria-label="Sepete Ekle"
          >
            <FiShoppingCart className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
