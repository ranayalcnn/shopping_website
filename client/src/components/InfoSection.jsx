// src/components/InfoSection.jsx
import React from "react";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Phone,
  Mail,
  MapPin,
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
    title: "Contact Us",
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
    <section className="w-full py-12 border-t border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4">
      <div
        className="
          max-w-[1250px] mx-auto
          flex flex-nowrap items-start justify-center
          gap-12
          overflow-x-auto overflow-y-hidden
          scrollbar-hide
        "
      >
        {/* BİLGİLER */}
        {items.map((item, i) => {
          const Icon = item.icon;

          return (
            <React.Fragment key={i}>
              {/* Info Item */}
              <div className="flex items-start gap-3 flex-none">
                <Icon className="w-6 h-6 text-navy-700 dark:text-navy-300" />

                <div className="whitespace-nowrap">
                  <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:flex flex-none h-10 w-px bg-slate-300 dark:bg-slate-700 opacity-60" />
            </React.Fragment>
          );
        })}

        {/* SOSYAL MEDYA */}
        <div className="flex items-center gap-4 flex-none">
          <a
            href="#"
            className="text-slate-800 dark:text-slate-200 hover:text-navy-700 dark:hover:text-navy-300 transition"
          >
            <Instagram className="w-6 h-6" />
          </a>

          <a
            href="#"
            className="text-slate-800 dark:text-slate-200 hover:text-navy-700 dark:hover:text-navy-300 transition"
          >
            <Twitter className="w-6 h-6" />
          </a>

          <a
            href="#"
            className="text-slate-800 dark:text-slate-200 hover:text-navy-700 dark:hover:text-navy-300 transition"
          >
            <Youtube className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
