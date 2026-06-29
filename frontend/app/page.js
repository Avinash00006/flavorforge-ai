import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-10">
          Core Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Product Descriptions"
            description="Generate professional AI-powered food product descriptions."
          />

          <FeatureCard
            title="Brand Positioning"
            description="Create unique branding content tailored for food businesses."
          />

          <FeatureCard
            title="Marketing Copy"
            description="Generate engaging marketing and e-commerce content instantly."
          />
        </div>
      </section>

      <Footer />
      
    </>
  );
}