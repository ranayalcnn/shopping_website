import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EffectWrapper from "../components/EffectWrapper";
import ProductCard from "../components/ProductCard";
import InfoSection from "../components/InfoSection"; // ⭐ EKLENDİ
import { Trash2, Minus, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

const FREE_SHIPPING_LIMIT = 300;

const BagPage = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);

    const rec = saved.sort(() => 0.5 - Math.random()).slice(0, 3);
    setRecommended(rec);
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = cart.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "new10") {
      setDiscount(0.1);
      toast.success("10% discount applied!");
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.error("Item removed from your bag");
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const total = Math.round(subtotal - subtotal * discount);

  const progress = Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100);

  const deliveryStart = new Date();
  deliveryStart.setDate(deliveryStart.getDate() + 2);
  const deliveryEnd = new Date();
  deliveryEnd.setDate(deliveryEnd.getDate() + 4);

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-24">
        <div className="max-w-[1280px] mx-auto">
          {/* TITLE */}
          <EffectWrapper delay={0.1}>
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
              Your Bag
            </h1>
          </EffectWrapper>

          <EffectWrapper delay={0.15}>
            <p className="text-slate-600 dark:text-slate-400 mb-12">
              Review your items and complete your order.
            </p>
          </EffectWrapper>

          {cart.length === 0 ? (
            <div className="text-center mt-28">
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
                Your bag is empty.
              </p>

              <Link
                to="/products"
                className="px-8 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition shadow-lg"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* ITEMS */}
              <div className="lg:col-span-2 space-y-7">
                {cart.map((item, index) => (
                  <EffectWrapper key={index} delay={index * 0.1}>
                    <div className="flex items-center gap-6 p-6 rounded-2xl shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition">
                      <img
                        src={item.image}
                        className="w-32 h-32 object-cover rounded-xl shadow-md"
                      />

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                          {item.name}
                        </h3>

                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">
                          {item.description}
                        </p>

                        <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                          {item.price} ₺
                        </p>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="text-lg font-semibold text-slate-900 dark:text-white">
                            {item.quantity || 1}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, +1)}
                            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-3 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition shadow"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </EffectWrapper>
                ))}
              </div>

              {/* SUMMARY */}
              <EffectWrapper delay={0.2}>
                <div className="p-8 rounded-2xl shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">

                  {/* FREE SHIPPING BAR */}
                  <div className="mb-8">
                    <p className="text-slate-700 dark:text-slate-300 mb-2 font-medium">
                      {subtotal >= FREE_SHIPPING_LIMIT
                        ? "You reached free shipping!"
                        : `${FREE_SHIPPING_LIMIT - subtotal}₺ away from free shipping`}
                    </p>

                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${progress}%` }}
                        className="h-full bg-emerald-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* COUPON */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                      Discount Code
                    </h3>

                    <div className="flex gap-3">
                      <input
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 ring-emerald-500 transition"
                      />

                      <button
                        onClick={applyCoupon}
                        className="px-6 py-2 rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* DELIVERY */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                      Estimated Delivery
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                      {formatDate(deliveryStart)} – {formatDate(deliveryEnd)}
                    </p>
                  </div>

                  <div className="border-t border-slate-300 dark:border-slate-700 my-6"></div>

                  {/* TOTAL */}
                  <div className="flex justify-between text-2xl font-extrabold text-slate-900 dark:text-white mb-10">
                    <span>Total</span>
                    <span>{total} ₺</span>
                  </div>

                  {/* PAYMENT ICONS */}
                  <div className="flex items-center gap-3 mb-6 opacity-70">
                    <img src="/images/payment/visa.png" className="h-8" />
                    <img src="/images/payment/mastercard.png" className="h-8" />
                    <img src="/images/payment/paypal.png" className="h-8" />
                  </div>

                  <button className="w-full py-3 rounded-full bg-emerald-600 text-white font-semibold text-lg hover:bg-emerald-700 transition shadow-lg">
                    Proceed to Checkout
                  </button>
                </div>
              </EffectWrapper>
            </div>
          )}

          {/* RECOMMENDED */}
          {recommended.length > 0 && (
            <div className="mt-28">
              <EffectWrapper delay={0.1}>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                  You May Also Like
                </h2>
              </EffectWrapper>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {recommended.map((product, i) => (
                  <EffectWrapper key={i} delay={i * 0.1}>
                    <ProductCard product={product} />
                  </EffectWrapper>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ⭐ INFO SECTION EN ALTA EKLENDİ ⭐ */}
      <InfoSection />
    </>
  );
};

export default BagPage;
