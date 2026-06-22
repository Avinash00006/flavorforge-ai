import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">FlavorForge AI</h1>

        <div className="flex items-center gap-5">
          <Link href="/"
          className="hover:text-orange-400 transition"
          >Home</Link>

          <Link href="/about"
          className="hover:text-orange-400 transition"
          >About</Link>

          <Link href="/dashboard"
          className="hover:text-orange-400 transition"
          >Dashboard</Link>

          <Link href="/login"
          className="hover:text-orange-400 transition"
          >Login</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}