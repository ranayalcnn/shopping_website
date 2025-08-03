import React from 'react';
import { X, Search } from 'lucide-react'; // lucide-react ikon kütüphanesi

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="container mx-auto px-6 mt-12">
      <div className="relative max-w-xl mx-auto">
        {/* Arama ikonu */}
        <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />

        {/* Input */}
        <input
          type="text"
          placeholder="Ürün ara..."
          className="w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {/* Clear butonu */}
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
