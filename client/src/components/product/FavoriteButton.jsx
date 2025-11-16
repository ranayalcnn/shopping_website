import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const FavoriteButton = ({ isFavorite, toggleFavorite }) => {
  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? (
        <AiFillHeart className="text-red-500 text-3xl" />
      ) : (
        <AiOutlineHeart className="text-slate-600 dark:text-slate-300 text-3xl" />
      )}
    </button>
  );
};

export default FavoriteButton;
