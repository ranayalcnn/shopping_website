import React, { useEffect } from "react";

const RemoveItemModal = ({ item, onCancel, onConfirm }) => {
  if (!item) return null;

  // ESC ile kapatma
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onCancel} // backdrop click
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()} // modal içi tıklamayı engelle
      >
        <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
          Remove item?
        </h3>

        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Are you sure you want to remove
          <span className="font-semibold"> {item.name}</span> from your bag?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:opacity-80 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(item.id)}
            className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveItemModal;
