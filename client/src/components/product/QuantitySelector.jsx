import React from "react";

const QuantitySelector = ({ quantity, setQuantity }) => {
  return (
    <div className="space-y-3">
      <p className="font-medium">Quantity</p>

      <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden w-fit">
        <button
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          –
        </button>
        <div className="px-4 py-2">{quantity}</div>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
