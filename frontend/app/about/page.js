// Import shared components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      {/* Main content area */}
      <main className="min-h-screen px-6 py-20">

        {/* Container keeps content centered */}
        <div className="max-w-5xl mx-auto text-center">

          {/* Page Title */}
          <h1 className="text-5xl font-bold text-foreground">
            About FlavorForge AI
          </h1>

          {/* Introduction */}
          <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
            FlavorForge AI helps food businesses create
            professional product descriptions, brand positioning,
            and marketing copy using Artificial Intelligence.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-xs">
              <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                Product Descriptions
              </h2>

              <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm text-left">
                Generate engaging food product descriptions instantly.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-xs">
              <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                Brand Positioning
              </h2>

              <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm text-left">
                Build a unique identity for your food brand.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-xs">
              <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                Marketing Copy
              </h2>

              <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm text-left">
                Create marketing content optimized for sales.
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}