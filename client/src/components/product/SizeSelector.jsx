import React from "react";

const SizeSelector = ({ sizes, selectedSize, setSelectedSize }) => {
  return (
    <div className="space-y-3">
      <p className="font-medium">Select Size</p>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`
              px-4 py-2 rounded-xl text-sm border transition
              ${
                selectedSize === size
                  ? "border-slate-900 dark:border-white bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "border-slate-300 dark:border-slate-700 hover:border-slate-500"
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>

      {!selectedSize && (
        <p className="mt-2 text-sm text-red-500">Please select a size.</p>
      )}
    </div>
  );
};

export default SizeSelector;
