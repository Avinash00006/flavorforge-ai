import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Login() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold text-white">
          Login
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl">
          User authentication and account management will be
          implemented during the authentication phase of the
          project.
        </p>
      </main>

      <Footer />
    </>
  );
}