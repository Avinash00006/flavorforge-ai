import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 p-4 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-extrabold tracking-tight">FlavorForge AI</h1>

        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium text-sm"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium text-sm"
          >
            About
          </Link>

          <Link
            href="/dashboard"
            className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium text-sm"
          >
            Dashboard
          </Link>

          <Link
            href="/login"
            className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium text-sm"
          >
            Login
          </Link>
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}