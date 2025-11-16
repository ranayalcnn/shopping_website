import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchProducts } from "../api/productAPI";

import ProductImages from "../components/product/ProductImages";
import FavoriteButton from "../components/product/FavoriteButton";
import SizeSelector from "../components/product/SizeSelector";
import QuantitySelector from "../components/product/QuantitySelector";
import FeatureIcons from "../components/product/FeatureIcons";
import ProductAccordion from "../components/product/ProductAccordion";
import RecommendedProducts from "../components/product/RecommendedProducts";

import { FiShoppingCart } from "react-icons/fi";

const SIZES = ["XS", "S", "M", "L", "XL"];

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
      setMainImage(data.image);
    };
    load();

    const loadAll = async () => {
      const all = await fetchProducts();
      setRecommended(all.filter((p) => p.id !== Number(id)).slice(0, 4));
    };
    loadAll();
  }, [id]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (list.includes(Number(id))) setIsFavorite(true);
  }, [id]);

  const toggleFavorite = () => {
    const list = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated = isFavorite
      ? list.filter((i) => i !== Number(id))
      : [...list, Number(id)];

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (!product) return <div className="p-20 text-center">Loading…</div>;

  return (
    <div
      className="min-h-screen px-4 py-14 max-w-7xl mx-auto
      bg-white dark:bg-slate-900
      text-slate-900 dark:text-slate-100
      transition-colors duration-300"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <ProductImages
          mainImage={mainImage}
          setMainImage={setMainImage}
          product={product}
          onOpenModal={() => {}}
        />

        <div className="space-y-8">

          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-semibold tracking-tight">
              {product.name}
            </h1>
            <FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
          </div>

          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {product.price} ₺
          </p>

          <FeatureIcons />

          <p className="text-slate-700 dark:text-slate-300">
            {product.description}
          </p>

          <SizeSelector
            sizes={SIZES}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />

          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

          <button
            className={`
              w-full py-4 rounded-xl flex items-center justify-center gap-3 
              text-lg font-medium transition shadow-lg
              ${
                selectedSize
                  ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                  : "bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400 cursor-not-allowed"
              }
            `}
          >
            <FiShoppingCart className="text-2xl" />
            Add to Cart
          </button>

          <div className="space-y-4">
            <ProductAccordion title="Material">Premium cotton blend.</ProductAccordion>
            <ProductAccordion title="Care Instructions">
              Machine wash cold. Do not bleach.
            </ProductAccordion>
            <ProductAccordion title="Shipping">
              Free shipping 2–4 business days.
            </ProductAccordion>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <RecommendedProducts products={recommended} />
      </div>
    </div>
  );
};

export default ProductDetails;
