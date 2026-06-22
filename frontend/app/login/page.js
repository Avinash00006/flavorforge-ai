// Import reusable components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Input, Button } from "../../components/ui";

export default function Login() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-6">

        {/* Login Card */}
        <div className="w-full max-w-md p-8 rounded-xl bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-800 shadow-lg">

          <h1 className="text-3xl font-bold text-black dark:text-white">
            Welcome Back
          </h1>

          <p className="text-center mt-3 text-gray-700 dark:text-gray-300">
            Login to continue using FlavorForge AI.
          </p>

          <div className="mt-8 space-y-4">

            <Input
              label="Email Address"
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button variant="primary">
              Login
            </Button>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}