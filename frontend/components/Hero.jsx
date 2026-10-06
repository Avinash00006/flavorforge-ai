import Link from "next/link";
import { SparklesIcon, BoltIcon, LeafIcon, ShoppingBagIcon, ArrowRightIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="text-center pt-24 pb-16 px-6 relative">
      {/* Sensory AI Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-xs backdrop-blur-md">
        <SparklesIcon className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
        AI Product Intelligence for Modern Food Brands
      </div>

      {/* Main Headline */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-stone-900 dark:text-stone-50 max-w-4xl mx-auto leading-tight">
        Forge Irresistible Food Brands with{" "}
        <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
          Sensory AI
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
        Transform ingredients and flavor profiles into compelling product narratives, brand positioning matrices, and e-commerce marketing copies in seconds.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link
          href="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <SparklesIcon className="w-4 h-4" />
          <span>Launch Generator</span>
        </Link>

        <a
          href="#features"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900/60 backdrop-blur-md hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5"
        >
          <span>See How It Works</span>
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>

      {/* Feature Highlights Ribbon */}
      <div className="mt-14 pt-8 border-t border-stone-200/60 dark:border-stone-800/60 max-w-3xl mx-auto flex flex-wrap justify-center items-center gap-5 sm:gap-8 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
        <div className="flex items-center gap-2">
          <BoltIcon className="w-4 h-4 text-amber-500" />
          <span>Google Gemini Powered</span>
        </div>
        <span className="hidden sm:inline text-stone-300 dark:text-stone-700">•</span>
        <div className="flex items-center gap-2">
          <LeafIcon className="w-4 h-4 text-emerald-500" />
          <span>Sensory Flavor Mapping</span>
        </div>
        <span className="hidden sm:inline text-stone-300 dark:text-stone-700">•</span>
        <div className="flex items-center gap-2">
          <ShoppingBagIcon className="w-4 h-4 text-amber-500" />
          <span>E-Commerce Ready Copy</span>
        </div>
      </div>
    </section>
  );
}