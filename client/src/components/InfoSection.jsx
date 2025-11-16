// src/components/InfoSection.jsx
import React from "react";
import { ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import EffectWrapper from "./EffectWrapper";

const InfoSection = () => {
  return (
    <section className="mt-24 bg-slate-900 dark:bg-slate-800 text-white py-20 px-4">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* 1 - Güvenli Ödeme */}
        <EffectWrapper delay={0.1}>
          <div className="flex flex-col items-center text-center gap-4">
            <ShieldCheck className="w-14 h-14 text-emerald-400" />
            <h3 className="text-2xl font-bold tracking-tight">
              Secure Payment
            </h3>
            <p className="text-white/70 max-w-sm">
              256-bit SSL encryption and trusted payment partners provide a safe shopping experience.
            </p>
          </div>
        </EffectWrapper>

        {/* 2 - Hızlı Kargo */}
        <EffectWrapper delay={0.25}>
          <div className="flex flex-col items-center text-center gap-4">
            <Truck className="w-14 h-14 text-emerald-400" />
            <h3 className="text-2xl font-bold tracking-tight">
              Fast Shipping
            </h3>
            <p className="text-white/70 max-w-sm">
              Your orders are carefully packaged and delivered within 1-3 business days.
            </p>
          </div>
        </EffectWrapper>

        {/* 3 - Kolay İade */}
        <EffectWrapper delay={0.4}>
          <div className="flex flex-col items-center text-center gap-4">
            <RefreshCcw className="w-14 h-14 text-emerald-400" />
            <h3 className="text-2xl font-bold tracking-tight">
              Easy Returns
            </h3>
            <p className="text-white/70 max-w-sm">
              Not satisfied? You can return or exchange your order within 14 days hassle-free.
            </p>
          </div>
        </EffectWrapper>

      </div>
    </section>
  );
};

export default InfoSection;
