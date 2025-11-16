import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "react-hot-toast";

const createPlaceholderUrls = (id) => {
  const size = 400;
  return {
    main: `https://placehold.co/${size}x${size}/cbd5e1/334155?text=Product+${id}`,
    hover: `https://placehold.co/${size}x${size}/e2e8f0/065f46?text=View`,
  };
};

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const placeholder = useMemo(
    () => createPlaceholderUrls(product?.id || Math.random()),
    [product?.id]
  );

  // FAVORİ DURUMU
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (product?.id && saved.includes(product.id)) setLiked(true);
  }, [product?.id]);

  const handleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;

    if (!liked) {
      updated = [...saved, product.id];
      toast.success(`${product.name} favorilere eklendi`);
    } else {
      updated = saved.filter((id) => id !== product.id);
      toast.error(`${product.name} favorilerden çıkarıldı`);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setLiked(!liked);
  };

  // ⭐⭐ SEPETE EKLEME (BAG) GERÇEK EKLEME ⭐⭐
  const handleAddToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const updated = [...savedCart, product];

    localStorage.setItem("cart", JSON.stringify(updated));

    toast.success(`${product.name} sepete eklendi`);

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 400);
  };

  if (!product) return null;

  const mainImage =
    product.image?.startsWith("http") || product.image?.startsWith("/")
      ? product.image
      : placeholder.main;

  const hoverImage =
    product.hoverImage?.startsWith("http") || product.hoverImage?.startsWith("/")
      ? product.hoverImage
      : placeholder.hover;

  const ratingValue = product.rating ?? 4;

  return (
    <div
      className="
      relative group flex flex-col w-full rounded-2xl overflow-hidden
      bg-slate-100 dark:bg-slate-900
      border border-slate-300 dark:border-slate-700
      shadow-md hover:shadow-xl
      transition-all duration-300
    "
    >
      {/* FAVORİ BUTONU */}
      <button
        onClick={handleFavorite}
        className="
          absolute top-3 right-3 z-20
          h-10 w-10 rounded-full
          bg-white dark:bg-slate-800
          border border-slate-300 dark:border-slate-700
          flex items-center justify-center shadow
          hover:scale-110 active:scale-95 transition
        "
      >
        {liked ? (
          <AiFillHeart className="text-red-500 text-xl" />
        ) : (
          <AiOutlineHeart className="text-slate-600 dark:text-slate-200 text-xl" />
        )}
      </button>

      {/* IMAGE AREA */}
      <Link
        to={`/product/${product.id}`}
        className="
        relative w-full aspect-square
        bg-slate-200 dark:bg-slate-800
        flex items-center justify-center overflow-hidden
      "
      >
        {/* main */}
        <img
          src={mainImage}
          alt={product.name}
          className="
            absolute inset-0 w-full h-full object-cover
            transition duration-500
            group-hover:opacity-0 group-hover:scale-110
          "
        />

        {/* hover */}
        <img
          src={hoverImage}
          alt=""
          className="
            absolute inset-0 w-full h-full object-cover
            opacity-0 transition duration-500
            group-hover:opacity-100 group-hover:scale-110
          "
        />
      </Link>

      {/* INFO */}
      <div className="p-4 flex flex-col gap-3">

        {/* NAME */}
        <Link to={`/product/${product.id}`}>
          <h3
            className="
            text-base font-semibold line-clamp-1
            text-slate-900 dark:text-white
            hover:text-emerald-600 dark:hover:text-emerald-400
            transition
          "
          >
            {product.name}
          </h3>
        </Link>

        {/* PRICE + RATING */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {product.price} ₺
          </p>

          <div className="text-sm text-amber-500 dark:text-amber-400">
            {"★".repeat(Math.round(ratingValue))}
          </div>
        </div>

        {/* DESC */}
        <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
          {product.description}
        </p>

        {/* ADD TO CART */}
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleAddToCart}
            className={`
              h-11 w-11 rounded-full flex items-center justify-center
              bg-emerald-600 text-white shadow-lg
              hover:bg-emerald-700 active:scale-95
              dark:bg-emerald-500 dark:hover:bg-emerald-400
              transition ${isClicked ? "animate-bounce" : ""}
            `}
          >
            <FiShoppingCart className="text-xl" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
