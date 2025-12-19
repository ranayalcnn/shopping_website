import React from "react";

const ProductImages = ({ mainImage, setMainImage, product, onOpenModal }) => {
  const images = [product.image, product.hoverImage].filter(Boolean);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-6">

      {/* THUMBNAILS */}
      <div className="flex lg:flex-col gap-4 order-2 lg:order-1">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`
              w-20 h-28 rounded-xl overflow-hidden
              bg-black/[0.03] dark:bg-white/[0.05]
              transition
              ${
                mainImage === img
                  ? "ring-2 ring-emerald-500"
                  : "hover:ring-1 hover:ring-slate-400/40"
              }
            `}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div
        onClick={onOpenModal}
        className="
          order-1 lg:order-2
          aspect-[3/4]
          rounded-3xl
          overflow-hidden
          cursor-zoom-in

          bg-black/[0.02]
          dark:bg-white/[0.04]
        "
      >
        <img
          src={mainImage}
          alt={product.name}
          className="
            w-full h-full
            object-cover
            transition-transform duration-500
            hover:scale-105
          "
        />
      </div>
    </div>
  );
};

export default ProductImages;
