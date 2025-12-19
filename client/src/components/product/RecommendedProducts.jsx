import React from "react";
import { Link } from "react-router-dom";

const RecommendedProducts = ({ products }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">
        You May Also Like
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="
              group relative
              rounded-2xl overflow-hidden
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-700
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-xl dark:hover:shadow-2xl
            "
          >
            {/* IMAGE AREA */}
            <div
              className="
                w-full aspect-square
                flex items-center justify-center p-5
                bg-gradient-to-br
                from-slate-100 to-slate-200
                dark:from-slate-800 dark:to-slate-700
              "
            >
              <img
                src={p.image}
                alt={p.name}
                className="
                  w-full h-full object-contain
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />
            </div>

            {/* INFO */}
            <div className="p-4 space-y-1">
              <p className="
                font-semibold text-slate-900 dark:text-slate-100
                line-clamp-1
              ">
                {p.name}
              </p>

              <p className="
                font-bold
                text-emerald-700 dark:text-emerald-400
              ">
                {p.price} ₺
              </p>
            </div>

            {/* subtle hover ring */}
            <span
              className="
                pointer-events-none absolute inset-0 rounded-2xl
                ring-1 ring-transparent
                group-hover:ring-emerald-500/30
                transition
              "
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
