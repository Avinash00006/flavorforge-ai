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
        <div className="w-full max-w-md p-8 rounded-xl bg-zinc-50 dark:bg-zinc-900/40
            border border-zinc-200 dark:border-zinc-800 shadow-md">

          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50">
            Welcome Back
          </h1>

          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm">
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