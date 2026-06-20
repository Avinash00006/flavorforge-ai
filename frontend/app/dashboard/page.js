import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl">
          This dashboard will host AI content generation,
          project management, and analytics features in future
          development phases.
        </p>
      </main>

      <Footer />
    </>
  );
}