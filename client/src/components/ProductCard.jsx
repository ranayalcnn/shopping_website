import React from 'react';

const ProductCard = ({ product }) => {
  if (!product) return null;

  console.log("🟩 Kart verisi:", product);

  return (
    <div className="flex flex-col items-center border rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 bg-white">
      <img
        src={
          product.image && product.image.startsWith('http')
            ? product.image
            : 'https://via.placeholder.com/300x300.png?text=No+Image'
        }
        alt={product.name || 'Ürün'}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold text-center text-gray-800">
        {product.name || 'Ürün Adı Yok'}
      </h2>
      <p className="text-green-600 font-bold mt-1">
        {product.price !== undefined ? `${product.price} ₺` : 'Fiyat Bilinmiyor'}
      </p>
      <p className="text-sm mt-2 text-gray-600 text-center">
        {product.description || 'Açıklama yok.'}
      </p>
    </div>
  );
};

export default ProductCard;
