import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Lock } from "lucide-react";

import AnimatedWrapper from "../components/AnimatedWrapper";
import PaymentMethodSelector from "../components/checkout/PaymentMethodSelector";
import AddressFields from "../components/checkout/AddressFields";
import OrderReview from "../components/checkout/OrderReview";
import Breadcrumb from "../components/Breadcrumb";
import InfoSection from "../components/InfoSection";

const CheckoutPage = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const subtotal = cart.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  const shipping = subtotal > 300 ? 0 : 29;
  const total = subtotal + shipping;

  // FORM STATES
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [method, setMethod] = useState("card");

  const [saveAddress, setSaveAddress] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const [errors, setErrors] = useState({});

  // LOAD SAVED DATA
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedAddress") || "{}");
    if (saved?.name) {
      setName(saved.name);
      setAddress(saved.address);
      setCountry(saved.country);
      setCity(saved.city);
      setZip(saved.zip);
    }

    const savedCardData = JSON.parse(localStorage.getItem("savedCard") || "{}");
    if (savedCardData?.masked) {
      setCard(savedCardData.masked);
    }
  }, []);

  const formatCardNumber = (v) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const inputStyle = (field) => `
    mt-1 w-full px-4 py-3 rounded-xl
    bg-slate-100 dark:bg-slate-800
    border ${errors[field] ? "border-red-500" : "border-slate-300 dark:border-slate-700"}
    text-slate-900 dark:text-white
    transition focus:outline-none focus:ring-2
    ${errors[field] ? "focus:ring-red-500" : "focus:ring-emerald-500"}
  `;

  const validate = () => {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Full name is required.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!country) newErrors.country = "Country is required.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!zip.trim()) newErrors.zip = "ZIP code is required.";

    if (method === "card") {
      if (card.replace(/\s/g, "").length !== 16)
        newErrors.card = "Card number must contain 16 digits.";
      if (!/^\d\d\/\d\d$/.test(expiry))
        newErrors.expiry = "Expiry date must follow MM/YY.";
      if (cvv.length !== 3)
        newErrors.cvv = "CVV must contain 3 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = () => {
    if (!validate()) {
      toast.error("Please correct the highlighted fields.");
      return;
    }

    if (saveAddress) {
      localStorage.setItem(
        "savedAddress",
        JSON.stringify({ name, address, country, city, zip })
      );
    }

    if (saveCard && method === "card") {
      const digits = card.replace(/\s/g, "");
      localStorage.setItem(
        "savedCard",
        JSON.stringify({ masked: "**** **** **** " + digits.slice(-4) })
      );
    }

    toast.success("Payment completed successfully!");
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-20">
        <div className="max-w-[1280px] mx-auto">

          {/* 🔹 BREADCRUMB */}
          <div className="mb-6">
            <Breadcrumb />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-12">

              {/* SHIPPING */}
              <AnimatedWrapper>
                <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
                  <h2 className="text-3xl font-bold mb-6">
                    Shipping Information
                  </h2>

                  <div className="mb-6">
                    <label className="font-medium">Full Name</label>
                    <input
                      className={inputStyle("name")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="font-medium">Address</label>
                    <textarea
                      rows={3}
                      className={inputStyle("address")}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm">{errors.address}</p>
                    )}
                  </div>

                  <AddressFields
                    inputStyle={inputStyle}
                    country={country}
                    setCountry={setCountry}
                    city={city}
                    setCity={setCity}
                    zip={zip}
                    setZip={setZip}
                  />

                  <div className="mt-6 flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                      className="w-5 h-5 accent-emerald-600"
                    />
                    <span className="text-slate-700 dark:text-slate-300">
                      Save this address
                    </span>
                  </div>
                </div>
              </AnimatedWrapper>

              {/* PAYMENT */}
              <AnimatedWrapper>
                <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">
                  <PaymentMethodSelector
                    method={method}
                    setMethod={setMethod}
                  />

                  {method === "card" && (
                    <div className="mt-6 space-y-4">
                      <input
                        className={inputStyle("card")}
                        placeholder="1234 5678 9012 3456"
                        value={card}
                        onChange={(e) =>
                          setCard(formatCardNumber(e.target.value))
                        }
                      />

                      <div className="flex gap-4">
                        <input
                          className={inputStyle("expiry")}
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                        />
                        <input
                          className={inputStyle("cvv")}
                          placeholder="CVV"
                          maxLength={3}
                          value={cvv}
                          onChange={(e) =>
                            setCvv(e.target.value.replace(/\D/g, ""))
                          }
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={saveCard}
                          onChange={(e) => setSaveCard(e.target.checked)}
                          className="w-5 h-5 accent-emerald-600"
                        />
                        <span className="text-slate-700 dark:text-slate-300">
                          Save this card
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedWrapper>

            </div>

            {/* ORDER SUMMARY */}
            <AnimatedWrapper>
              <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl">

                <OrderReview cart={cart} />

                <div className="border-t my-6"></div>

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subtotal} ₺</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `${shipping} ₺`}</span>
                </div>

                <div className="flex justify-between text-2xl font-bold mt-4">
                  <span>Total</span>
                  <span>{total} ₺</span>
                </div>

                <div className="flex items-center gap-2 mt-6 opacity-70">
                  <Lock className="w-5 h-5" />
                  <span>SSL Secured Payment</span>
                </div>

                <button
                  onClick={handlePay}
                  className="w-full py-4 mt-8 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition shadow-lg"
                >
                  Complete Payment
                </button>

                <Link
                  to="/cart"
                  className="block text-center mt-4 text-slate-500 hover:underline"
                >
                  Edit Cart
                </Link>
              </div>
            </AnimatedWrapper>

          </div>
        </div>
      </div>

      {/* 🔹 INFO SECTION */}
      <InfoSection />
    </>
  );
};

export default CheckoutPage;
