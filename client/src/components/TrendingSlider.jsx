<div className="relative">

  {/* SOL OK */}
  <button
    onClick={prev}
    className="
      absolute left-4 top-1/2 -translate-y-1/2 z-20
      flex items-center justify-center
      w-11 h-11 rounded-full
      bg-white/70 dark:bg-slate-800/60
      backdrop-blur-md
      border border-slate-300/60 dark:border-slate-600/40
      shadow-lg
      hover:bg-white dark:hover:bg-slate-700
      hover:scale-110 active:scale-95
      transition-all duration-300
    "
  >
    <ChevronLeft className="w-6 h-6 text-slate-900 dark:text-white" />
  </button>

  {/* SAĞ OK */}
  <button
    onClick={next}
    className="
      absolute right-4 top-1/2 -translate-y-1/2 z-20
      flex items-center justify-center
      w-11 h-11 rounded-full
      bg-white/70 dark:bg-slate-800/60
      backdrop-blur-md
      border border-slate-300/60 dark:border-slate-600/40
      shadow-lg
      hover:bg-white dark:hover:bg-slate-700
      hover:scale-110 active:scale-95
      transition-all duration-300
    "
  >
    <ChevronRight className="w-6 h-6 text-slate-900 dark:text-white" />
  </button>

</div>
