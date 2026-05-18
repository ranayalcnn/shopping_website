import React, { useState } from "react";

const ProductAccordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-4 px-6 flex justify-between items-center text-left"
      >
        <span className="text-lg font-medium">{title}</span>
        <span className="text-2xl">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-6 pb-6 text-slate-600 dark:text-slate-300">
          {children}
        </div>
      )}
    </div>
  );
};

export default ProductAccordion;
