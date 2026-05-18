import React from "react";

const PaymentMethodSelector = ({ method, setMethod }) => {
  return (
    <div className="space-y-3">
      <label className="text-slate-700 dark:text-slate-300 font-medium">
        Payment Method
      </label>

      <div className="space-y-2">
        <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer bg-white dark:bg-slate-900">
          <input
            type="radio"
            name="payment"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          Credit / Debit Card
        </label>

        <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer bg-white dark:bg-slate-900">
          <input
            type="radio"
            name="payment"
            checked={method === "paypal"}
            onChange={() => setMethod("paypal")}
          />
          PayPal
        </label>

        <label className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer bg-white dark:bg-slate-900">
          <input
            type="radio"
            name="payment"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          Cash on Delivery
        </label>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
