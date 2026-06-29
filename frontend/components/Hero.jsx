import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center py-20 px-6">
      <h1 className="text-5xl font-bold text-zinc-950 dark:text-zinc-50">
        FlavorForge AI
      </h1>

      {/* Hero subtitle */}
      <h2 className="mt-4 text-2xl font-medium text-zinc-900 dark:text-zinc-100">
        AI Product Intelligence for Modern Food Brands
      </h2>

      <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
        Transform food products into compelling brands using
        AI-powered content generation, product descriptions,
        and marketing copy.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/dashboard"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          Get Started
        </Link>

        <Link
          href="/about"
          className="inline-block border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
