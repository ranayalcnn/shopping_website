<div className="relative">

  {/* Sol Ok */}
  <button
    onClick={handlePrev}
    className="
      absolute left-4 top-1/2 -translate-y-1/2 z-20
      flex items-center justify-center
      w-12 h-12 rounded-full
      bg-gradient-to-br from-emerald-400/50 via-sky-400/40 to-purple-400/50
      dark:bg-gradient-to-br dark:from-emerald-500/30 dark:via-sky-500/30 dark:to-purple-500/30
      backdrop-blur-xl border border-white/50 dark:border-white/20
      shadow-[0_0_20px_rgba(0,0,0,0.15)]
      hover:shadow-[0_0_30px_rgba(76,201,240,0.6)]
      hover:scale-110 active:scale-95 transition-all duration-300
    "
  >
    <ChevronLeft className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
  </button>

  {/* Sağ Ok */}
  <button
    onClick={handleNext}
    className="
      absolute right-4 top-1/2 -translate-y-1/2 z-20
      flex items-center justify-center
      w-12 h-12 rounded-full
      bg-gradient-to-br from-pink-400/50 via-violet-400/40 to-indigo-400/50
      dark:bg-gradient-to-br dark:from-pink-500/30 dark:via-violet-500/30 dark:to-indigo-500/30
      backdrop-blur-xl border border-white/50 dark:border-white/20
      shadow-[0_0_20px_rgba(0,0,0,0.15)]
      hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]
      hover:scale-110 active:scale-95 transition-all duration-300
    "
  >
    <ChevronRight className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
  </button>

</div>
