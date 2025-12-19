import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchProducts } from "../api/productAPI";
import { toast } from "react-hot-toast";

import Breadcrumb from "../components/Breadcrumb";

import ProductImages from "../components/product/ProductImages";
import FavoriteButton from "../components/product/FavoriteButton";
import SizeSelector from "../components/product/SizeSelector";
import QuantitySelector from "../components/product/QuantitySelector";
import FeatureIcons from "../components/product/FeatureIcons";
import ProductAccordion from "../components/product/ProductAccordion";
import RecommendedProducts from "../components/product/RecommendedProducts";
import ReviewList from "../components/product/ReviewList";
import ReviewForm from "../components/product/ReviewForm";

import { FiShoppingCart } from "react-icons/fi";

const SIZES = ["XS", "S", "M", "L", "XL"];

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [buttonAnimate, setButtonAnimate] = useState(false);
  const [reviews, setReviews] = useState([]);

  const SAMPLE_REVIEWS = [
    {
      name: "Emily R.",
      rating: 5,
      comment: "Amazing fabric quality! Better than expected.",
      date: "2024-12-10",
    },
    {
      name: "Jessica M.",
      rating: 4,
      comment: "Color matches the photos. I sized up and it fits perfectly.",
      date: "2024-12-09",
    },
    {
      name: "Sarah K.",
      rating: 5,
      comment: "Super fast shipping and very comfortable material!",
      date: "2024-12-08",
    },
  ];

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
      setMainImage(data.image);
    };

    const loadRecommended = async () => {
      const all = await fetchProducts();
      setRecommended(all.filter((p) => p.id !== Number(id)).slice(0, 4));
    };

    loadProduct();
    loadRecommended();

    const stored = JSON.parse(localStorage.getItem(`reviews_${id}`) || "[]");
    if (stored.length === 0) {
      setReviews(SAMPLE_REVIEWS);
      localStorage.setItem(`reviews_${id}`, JSON.stringify(SAMPLE_REVIEWS));
    } else {
      setReviews(stored);
    }
  }, [id]);

  const addReview = (review) => {
    const updated = [...reviews, review];
    setReviews(updated);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
    toast.success("Review submitted successfully.");
  };

  const addToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size first.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart!");

    setButtonAnimate(true);
    setTimeout(() => setButtonAnimate(false), 250);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center
                      bg-white dark:bg-slate-900
                      text-slate-900 dark:text-slate-100">
        Loading…
      </div>
    );
  }

  return (
    /* 🌑 FULL SCREEN WRAPPER — BEYAZLIK SIFIR */
    <div className="w-full min-h-screen
                    bg-white dark:bg-slate-900
                    text-slate-900 dark:text-slate-100">

      {/* CONTENT CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-6 py-14">

        <Breadcrumb />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-8">

          <ProductImages
            mainImage={mainImage}
            setMainImage={setMainImage}
            product={product}
          />

          <div className="space-y-8">

            <h1 className="text-4xl font-semibold">{product.name}</h1>
            <p className="text-3xl font-bold">{product.price} ₺</p>

            <FeatureIcons />

            <p className="text-slate-700 dark:text-slate-300">
              {product.description}
            </p>

            <SizeSelector
              sizes={SIZES}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
            />

            <button
              onClick={addToCart}
              className={`
                w-full py-4 rounded-xl
                flex items-center justify-center gap-3
                text-lg font-medium transition-all
                ${
                  selectedSize
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed"
                }
                ${buttonAnimate ? "scale-105" : ""}
              `}
            >
              <FiShoppingCart className="text-2xl" />
              Add to Cart
            </button>

            <div className="space-y-4">
              <ProductAccordion title="Material">
                Premium cotton blend.
              </ProductAccordion>
              <ProductAccordion title="Care Instructions">
                Machine wash cold.
              </ProductAccordion>
              <ProductAccordion title="Shipping">
                Free shipping within 2–4 business days.
              </ProductAccordion>
            </div>

          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
          <ReviewList reviews={reviews} />
          <ReviewForm onAddReview={addReview} />
        </div>

        {/* RECOMMENDED */}
        <div className="mt-24">
          <RecommendedProducts products={recommended} />
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
