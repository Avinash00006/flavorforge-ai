import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold text-white">
          About FlavorForge AI
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl">
          FlavorForge AI helps food businesses generate
          professional product descriptions, branding content,
          and marketing copy using Artificial Intelligence.
        </p>
      </main>

      <Footer />
    </>
  );
}