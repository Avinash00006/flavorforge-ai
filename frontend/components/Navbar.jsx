"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Monitor local storage to dynamically adjust layout actions
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // Hook listener for authentication updates
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    // Flush local JWT session keys
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    
    // Redirect to login view
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 p-4 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-extrabold tracking-tight hover:opacity-90 transition-opacity">
          FlavorForge AI
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/"
            className="hidden sm:inline-block hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium text-sm"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="hidden sm:inline-block hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium text-sm"
          >
            About
          </Link>

          <Link
            href="/dashboard"
            className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium text-sm"
          >
            Dashboard
          </Link>

          {isLoggedIn && (
            <Link
              href="/profile"
              className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium text-sm"
            >
              Profile
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium text-sm cursor-pointer bg-transparent border-none p-0 outline-none"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium text-sm"
            >
              Login
            </Link>
          )}
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}