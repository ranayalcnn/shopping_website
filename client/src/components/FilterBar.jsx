import React from 'react';

const FilterBar = ({ categories, category, setCategory, sortOption, setSortOption }) => {
  return (
    <div
      className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8
                 rounded-xl px-5 py-3
                 bg-slate-100 dark:bg-slate-800/70
                 border border-slate-200 dark:border-slate-700
                 backdrop-blur-sm transition-colors duration-300"
    >
      {/* Kategori */}
      <div className="flex items-center gap-2">
        <label className="text-slate-800 dark:text-slate-200 font-medium">Kategori:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg px-3 py-1.5
                     bg-white dark:bg-slate-900
                     text-slate-800 dark:text-slate-200
                     border border-slate-300 dark:border-slate-600
                     focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400
                     transition-colors duration-200"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'Tümü' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sıralama */}
      <div className="flex items-center gap-2">
        <label className="text-slate-800 dark:text-slate-200 font-medium">Sırala:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="rounded-lg px-3 py-1.5
                     bg-white dark:bg-slate-900
                     text-slate-800 dark:text-slate-200
                     border border-slate-300 dark:border-slate-600
                     focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400
                     transition-colors duration-200"
        >
          <option value="default">Varsayılan</option>
          <option value="price-asc">Fiyat (Artan)</option>
          <option value="price-desc">Fiyat (Azalan)</option>
          <option value="name">İsme Göre</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
