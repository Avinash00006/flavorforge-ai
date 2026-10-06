import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import { DocumentIcon, TargetIcon, MegaphoneIcon, ArrowRightIcon, LeafIcon, BoltIcon, ShoppingBagIcon } from "../components/Icons";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      {/* Core Capabilities Section */}
      <section id="features" className="max-w-6xl mx-auto px-6 pt-8 pb-20 scroll-mt-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-50">
            Engineered for Food Founders & Creators
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400 max-w-xl mx-auto text-base">
            Turn complex flavor notes and ingredients into captivating customer-ready messaging in one click.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Product Descriptions"
            description="Generate professional AI-powered food product descriptions highlighting aroma, texture, and origin."
            icon={<DocumentIcon className="w-6 h-6" />}
          />

          <FeatureCard
            title="Brand Positioning"
            description="Create distinct brand matrices, target audience resonance, and USP messaging tailored for food businesses."
            icon={<TargetIcon className="w-6 h-6" />}
          />

          <FeatureCard
            title="Marketing Copy"
            description="Generate high-converting e-commerce copy, social hooks, and packaging narratives instantly."
            icon={<MegaphoneIcon className="w-6 h-6" />}
          />
        </div>
      </section>

      {/* About / Sensory AI Philosophy Section */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-20 border-t border-stone-200/60 dark:border-stone-800/60 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            About FlavorForge AI
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-50 tracking-tight">
            Bridging Flavor Science with <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Precision AI</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
            FlavorForge AI was created for culinary artisans, emerging CPG founders, and hospitality brands who need words that taste as vivid as their recipes. By pairing gastronomic principles with Google Gemini intelligence, we turn complex ingredient chemistry into irresistible marketing hooks.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-7 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/75 dark:bg-stone-900/60 backdrop-blur-md hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 space-y-3">
            <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <LeafIcon className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50">
              Sensory Flavor Science
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              Maps aromatic top notes, mouthfeel, acidity, and umami into evocative language that triggers physiological cravings in your audience.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/75 dark:bg-stone-900/60 backdrop-blur-md hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 space-y-3">
            <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <BoltIcon className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50">
              Founder-Speed Execution
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              Eliminate costly copywriting agencies and writer's block. Go from raw ingredient formulas to retail-ready labels in under 10 seconds.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/75 dark:bg-stone-900/60 backdrop-blur-md hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 space-y-3">
            <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <ShoppingBagIcon className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50">
              Omnichannel Ready
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              Export formats built directly for Shopify product pages, Amazon bullet points, packaging nutritional claims, and Instagram hooks.
            </p>
          </div>
        </div>

        {/* Quick Launch CTA Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-50">
              Ready to transform your food products?
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base max-w-lg">
              Start generating conversion-tested product copy and sensory branding matrices today with FlavorForge AI.
            </p>
          </div>
          <a
            href="/dashboard"
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Open Dashboard</span>
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}