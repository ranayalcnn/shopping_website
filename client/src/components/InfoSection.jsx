// src/components/InfoSection.jsx
import React from "react";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Phone,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "Encrypted checkout",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "1–3 day shipping",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    desc: "14-day return policy",
  },
  {
    icon: Phone,
    title: "Support",
    desc: (
      <>
        <span className="block">+90 555 444 33 22</span>
        <span className="block">support@shop.com</span>
        <span className="block">Istanbul, Türkiye</span>
      </>
    ),
  },
];

const InfoSection = () => {
  return (
    <section className="w-full py-12 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      
      <div
        className="
          w-full max-w-[1500px] mx-auto px-6
          flex items-center justify-between gap-12
          overflow-x-auto scrollbar-hide whitespace-nowrap
        "
      >
        {/* INFO ITEMS */}
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="
                flex items-center gap-4 flex-none
                hover:opacity-90 transition
              "
            >
              {/* SMALLER MODERN ICON */}
              <div
                className="
                  w-10 h-10 rounded-full flex items-center justify-center
                  bg-slate-200/70 dark:bg-slate-700/60
                  border border-slate-300 dark:border-slate-600
                  text-slate-700 dark:text-slate-200
                "
              >
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white leading-tight">
                  {item.title}
                </h3>
                <p className="text-[13px] text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}

        {/* DIVIDER */}
        <div className="h-8 w-px bg-slate-300 dark:bg-slate-700 opacity-60 flex-none" />

        {/* SOCIAL ICONS — Instagram-Style Minimal Buttons */}
        <div className="flex items-center gap-4 flex-none">
          {[Instagram, Twitter, Youtube].map((Icon, i) => (
            <button
              key={i}
              className="
                w-10 h-10 rounded-full flex items-center justify-center
                border border-slate-300 dark:border-slate-600
                bg-slate-200/70 dark:bg-slate-700/60
                text-slate-700 dark:text-slate-200
                hover:bg-slate-300 dark:hover:bg-slate-600
                hover:text-slate-900 dark:hover:text-white
                transition
              "
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
