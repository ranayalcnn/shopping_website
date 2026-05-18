import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Trash2, Minus, Plus, Lock } from "lucide-react";

import AnimatedWrapper from "../components/AnimatedWrapper";
import ProductCard from "../components/ProductCard";
import InfoSection from "../components/InfoSection";
import Breadcrumb from "../components/Breadcrumb";
import RemoveItemModal from "../components/RemoveItemModal";
import { fetchProducts } from "../api/productAPI";

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL"];
const FREE_SHIPPING_LIMIT = 300;

const BagPage = () => {
  const [cart, setCart] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);

    const loadRecommended = async () => {
      const all = await fetchProducts();
      const cartIds = saved.map((i) => i.id);
      setRecommended(all.filter((p) => !cartIds.includes(p.id)).slice(0, 4));
    };

    loadRecommended();
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const updateSize = (id, newSize) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, size: newSize } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success(`Size updated to ${newSize}`);
  };

  const removeItem = (item) => setItemToRemove(item);

  const confirmRemoveItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.error("Item removed from your bag");
    setItemToRemove(null);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const shipping = subtotal > FREE_SHIPPING_LIMIT ? 0 : 29;
  const total = subtotal + shipping;

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-20">
        <div className="max-w-[1280px] mx-auto">

          <div className="mb-6">
            <Breadcrumb />
          </div>

          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Shopping Bag
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Review your selected items before checkout.
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                Your bag is currently empty.
              </p>
              <Link
                to="/new"
                className="px-8 py-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-lg"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

              {/* LEFT – ITEMS */}
              <div className="lg:col-span-2 space-y-8">
                {cart.map((item, index) => (
                  <AnimatedWrapper key={index}>
                    <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">

                      <div className="flex gap-6">

                        <Link to={`/product/${item.id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-28 h-28 object-cover rounded-xl"
                          />
                        </Link>

                        <div className="flex-1">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="text-xl font-semibold hover:underline">
                              {item.name}
                            </h3>
                          </Link>

                          <p className="text-slate-500 dark:text-slate-400 mt-1">
                            {item.price} ₺
                          </p>

                          {/* SIZE */}
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-sm">Size:</span>
                            <select
                              value={item.size || ""}
                              onChange={(e) =>
                                updateSize(item.id, e.target.value)
                              }
                              className="
                                px-4 py-1.5 rounded-xl text-sm font-medium
                                bg-white dark:bg-slate-900
                                border border-slate-300 dark:border-slate-700
                                text-slate-900 dark:text-white
                                focus:outline-none
                                focus:border-emerald-500
                                focus:ring-2 focus:ring-emerald-500/30
                                transition
                              "
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {AVAILABLE_SIZES.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* QUANTITY */}
                          <div className="flex items-center gap-4 mt-5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800"
                            >
                              <Minus className="w-4 h-4" />
                            </button>

                            <span className="font-semibold">
                              {item.quantity || 1}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, +1)}
                              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item)}
                          className="text-slate-400 hover:text-red-500 transition"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </div>
                  </AnimatedWrapper>
                ))}
              </div>

              {/* RIGHT – SUMMARY */}
              <AnimatedWrapper>
                <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">

                  <div className="flex justify-between mb-3">
                    <span>Subtotal</span>
                    <span>{subtotal} ₺</span>
                  </div>

                  <div className="flex justify-between mb-3">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `${shipping} ₺`}</span>
                  </div>

                  <div className="flex justify-between text-2xl font-bold mt-6">
                    <span>Total</span>
                    <span>{total} ₺</span>
                  </div>

                  <div className="flex items-center gap-2 mt-6 opacity-70">
                    <Lock className="w-5 h-5" />
                    <span>SSL Secured Checkout</span>
                  </div>

                  <Link to="/checkout">
                    <button className="w-full py-4 mt-8 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition shadow-lg">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </AnimatedWrapper>
            </div>
          )}

          {recommended.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-bold mb-6">
                You may also like
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {recommended.map((product) => (
                  <AnimatedWrapper key={product.id}>
                    <ProductCard product={product} />
                  </AnimatedWrapper>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <InfoSection />

      <RemoveItemModal
        item={itemToRemove}
        onCancel={() => setItemToRemove(null)}
        onConfirm={confirmRemoveItem}
      />
    </>
  );
};

export default BagPage;
