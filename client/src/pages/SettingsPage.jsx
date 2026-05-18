import React, { useState } from "react";
import AnimatedWrapper from "../components/AnimatedWrapper";

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`w-11 h-6 flex items-center rounded-full transition
      ${enabled ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700"}`}
  >
    <span
      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition
        ${enabled ? "translate-x-5" : "translate-x-1"}`}
    />
  </button>
);

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promoEmails, setPromoEmails] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(false);

  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("TRY");

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-16">
      <div className="max-w-[1100px] mx-auto space-y-12">

        {/* HEADER */}
        <AnimatedWrapper>
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              Account Settings
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Manage your personal information and shopping preferences.
            </p>
          </div>
        </AnimatedWrapper>

        {/* ACCOUNT INFORMATION */}
        <AnimatedWrapper>
          <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-6">Account Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400">
                  Full Name
                </label>
                <input
                  placeholder="Jane Doe"
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400">
                  Email Address
                </label>
                <input
                  disabled
                  value="jane.doe@email.com"
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-700 opacity-70 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400">
                  Phone Number
                </label>
                <input
                  placeholder="+90 5xx xxx xx xx"
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>
            </div>
          </section>
        </AnimatedWrapper>

        {/* SHOPPING PREFERENCES */}
        <AnimatedWrapper>
          <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-6">Shopping Preferences</h2>

            <div className="grid md:grid-cols-3 gap-6 items-end">
              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border"
                >
                  <option value="en">English</option>
                  <option value="tr">Türkçe</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-slate-600 dark:text-slate-400">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border"
                >
                  <option value="TRY">TRY ₺</option>
                  <option value="USD">USD $</option>
                  <option value="EUR">EUR €</option>
                </select>
              </div>

              <div className="flex items-center justify-between mt-6">
                <span className="text-slate-700 dark:text-slate-300">
                  Dark Mode
                </span>
                <Toggle enabled={darkMode} onChange={toggleDarkMode} />
              </div>
            </div>
          </section>
        </AnimatedWrapper>

        {/* NOTIFICATIONS */}
        <AnimatedWrapper>
          <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-6">
              Notification Preferences
            </h2>

            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span>Order updates & shipping status</span>
                <Toggle
                  enabled={orderUpdates}
                  onChange={() => setOrderUpdates(!orderUpdates)}
                />
              </div>

              <div className="flex justify-between items-center">
                <span>Promotions & discounts</span>
                <Toggle
                  enabled={promoEmails}
                  onChange={() => setPromoEmails(!promoEmails)}
                />
              </div>

              <div className="flex justify-between items-center">
                <span>Back in stock alerts</span>
                <Toggle
                  enabled={stockAlerts}
                  onChange={() => setStockAlerts(!stockAlerts)}
                />
              </div>
            </div>
          </section>
        </AnimatedWrapper>

        {/* ADDRESS & BILLING */}
        <AnimatedWrapper>
          <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-6">
              Address & Billing
            </h2>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="text-slate-600 dark:text-slate-400">
                Manage your saved shipping and billing addresses.
              </p>

              <button className="
                px-6 py-3 rounded-full
                bg-slate-900 text-white
                dark:bg-white dark:text-slate-900
                hover:opacity-90 transition
              ">
                Manage Addresses
              </button>
            </div>
          </section>
        </AnimatedWrapper>

      </div>
    </div>
  );
};

export default SettingsPage;
