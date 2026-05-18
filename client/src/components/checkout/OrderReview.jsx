import React from "react";

const OrderReview = ({ cart }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Order Review</h3>

      {cart.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-3 rounded-xl border bg-white dark:bg-slate-800"
        >
          <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm opacity-70">{item.price} ₺ — Qty {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderReview;
