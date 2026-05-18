import React, { useState } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

const FilterBar = ({
  categories = [],
  category,
  setCategory,
  sortOption,
  setSortOption,
  totalCount = 0,
}) => {
  const [open, setOpen] = useState(false);

  const clearAll = () => {
    setCategory("all");
    setSortOption("default");
  };

  return (
    <div
      className="
        rounded-2xl
        border border-slate-200 dark:border-slate-700
        bg-white/80 dark:bg-slate-900/70
        backdrop-blur-xl
        shadow-sm
        transition-all
        overflow-hidden
      "
    >
      {/* HEADER — HER ZAMAN GÖRÜNÜR */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex items-center justify-between
          px-6 py-4
          text-left
          transition
        "
      >
        <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
          <SlidersHorizontal className="w-5 h-5 text-emerald-500" />
          Filters
          <span className="text-xs text-slate-500">
            ({totalCount})
          </span>
        </div>

        <ChevronDown
          className={`
            w-5 h-5 text-slate-500
            transition-transform duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* CONTENT — AÇILIR / KAPANIR */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* CATEGORY */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="
                  rounded-xl px-3 py-2
                  bg-white dark:bg-slate-800
                  border border-slate-300 dark:border-slate-600
                  text-sm
                  focus:outline-none focus:ring-2 focus:ring-emerald-500
                "
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* SORT */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Sort by
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="
                  rounded-xl px-3 py-2
                  bg-white dark:bg-slate-800
                  border border-slate-300 dark:border-slate-600
                  text-sm
                  focus:outline-none focus:ring-2 focus:ring-emerald-500
                "
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name">Name: A → Z</option>
              </select>
            </div>

            {/* INFO + CLEAR */}
            <div className="flex flex-col justify-between text-sm text-slate-500 dark:text-slate-400">
              <div>
                Showing{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {totalCount}
                </span>{" "}
                products
              </div>

              <button
                onClick={clearAll}
                className="
                  mt-4 flex items-center gap-1 text-sm
                  text-slate-500 hover:text-red-500
                  transition
                "
              >
                <X className="w-4 h-4" />
                Clear all
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
