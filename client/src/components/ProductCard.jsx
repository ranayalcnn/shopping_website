import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "react-hot-toast";

const ProductCard = ({ product, onFavoriteChange }) => {
  const [liked, setLiked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (product?.id && saved.includes(product.id)) setLiked(true);
  }, [product?.id]);

  const handleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;

    if (!liked) {
      updated = [...saved, product.id];
      toast.success("Added to Favorites");
    } else {
      updated = saved.filter((id) => id !== product.id);
      toast.error("Removed from Favorites");
      if (onFavoriteChange) onFavoriteChange(product.id);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setLiked(!liked);
  };

  const handleAddToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...savedCart, product]));
    toast.success("Added to Bag");
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  if (!product) return null;

  return (
    <div
      className="
        group relative w-full
        rounded-2xl overflow-hidden

        /* 🔥 CARD BACKGROUND (SAME EVERYWHERE) */
        bg-slate-100 dark:bg-slate-900

        border border-slate-200 dark:border-slate-700

        transition
        hover:border-emerald-400
        dark:hover:border-emerald-500/60
      "
    >
      {/* FAVORITE */}
      <button
        onClick={handleFavorite}
        className="
          absolute top-3 right-3 z-10
          h-9 w-9 rounded-full
          bg-white/80 dark:bg-slate-800/80
          backdrop-blur
          border border-slate-200 dark:border-slate-700
          flex items-center justify-center
          hover:scale-110 transition
        "
      >
        {liked ? (
          <AiFillHeart className="text-red-500 text-lg" />
        ) : (
          <AiOutlineHeart className="text-slate-600 dark:text-slate-300 text-lg" />
        )}
      </button>

      {/* IMAGE */}
      <Link
        to={`/product/${product.id}`}
        className="
          block w-full aspect-[3/4]
          overflow-hidden
          bg-slate-200 dark:bg-slate-800
        "
      >
        <img
          src={product.image}
          alt={product.name}
          className="
            w-full h-full
            object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />
      </Link>

      {/* INFO */}
      <div
        className="
          relative p-4
          bg-slate-100 dark:bg-slate-900
        "
      >
        {/* subtle separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-slate-200 dark:bg-slate-700" />

        <Link to={`/product/${product.id}`}>
          <h3
            className="
              text-sm font-medium
              text-slate-900 dark:text-slate-100
              hover:text-emerald-600 dark:hover:text-emerald-400
              transition
            "
          >
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {product.price} ₺
          </span>

          <button
            onClick={handleAddToCart}
            className={`
              h-9 w-9 rounded-full
              flex items-center justify-center
              bg-emerald-600 text-white
              hover:bg-emerald-700
              dark:bg-emerald-500 dark:hover:bg-emerald-400
              transition ${isClicked ? "animate-bounce" : ""}
            `}
          >
            <FiShoppingCart className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
