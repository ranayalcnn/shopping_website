import React from "react";

const ProductImages = ({ mainImage, setMainImage, product, onOpenModal }) => {
  return (
    <div className="space-y-6">

      <div
        className="
          w-full max-h-[650px]
          rounded-2xl overflow-hidden
          bg-slate-200 dark:bg-slate-700
          shadow-md dark:shadow-none
          flex items-center justify-center
          cursor-zoom-in
        "
        onClick={onOpenModal}
      >
        <img
          src={mainImage}
          alt={product.name}
          className="
            w-full h-full object-contain
            p-6 lg:p-10
            mix-blend-multiply dark:mix-blend-screen
            transition-all duration-500
          "
        />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {[product.image, product.hoverImage]
          .filter(Boolean)
          .map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(img)}
              className={`
                w-20 h-20 rounded-xl overflow-hidden
                bg-slate-200 dark:bg-slate-700
                border transition-all flex-shrink-0
                ${
                  mainImage === img
                    ? "border-slate-900 dark:border-white"
                    : "border-slate-300 dark:border-slate-600 hover:border-slate-400"
                }
              `}
            >
              <img
                src={img}
                className="
                  w-full h-full object-contain p-2
                  mix-blend-multiply dark:mix-blend-screen
                "
              />
            </button>
          ))}
      </div>
    </div>
  );
};

export default ProductImages;
