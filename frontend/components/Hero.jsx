export default function Hero() {
  return (
    <section className="text-center py-20 px-6">
      <h1 className="text-5xl font-bold text-white">
        FlavorForge AI
      </h1>

      <h2 className="mt-4 text-2xl text-gray-300">
        AI Product Intelligence for Modern Food Brands
      </h2>

      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
        Transform food products into compelling brands using
        AI-powered content generation, product descriptions,
        and marketing copy.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button className="bg-black text-white px-6 py-3 rounded-lg">
          Get Started
        </button>

        <button className="border border-black px-6 py-3 rounded-lg">
          Learn More
        </button>
      </div>
    </section>
  );
}