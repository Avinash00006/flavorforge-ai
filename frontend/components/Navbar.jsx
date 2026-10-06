"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { UserIcon, FlameIcon } from "./Icons";

export default function Navbar() {
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

  return (
    <nav className="sticky top-0 z-40 bg-[#fbf9f5]/85 dark:bg-[#0f0e0c]/85 backdrop-blur-xl text-stone-900 dark:text-stone-100 border-b border-stone-200/80 dark:border-stone-800/80 px-6 py-3.5 transition-colors duration-200 shadow-xs">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
            <FlameIcon className="w-5 h-5 text-white" />
          </span>
          <span className="text-xl font-black tracking-tight text-stone-950 dark:text-stone-50">
            FlavorForge <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium text-sm"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium text-sm"
          >
            Dashboard
          </Link>

          {isLoggedIn ? (
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-stone-900/70 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/40 transition-all font-medium text-sm shadow-xs"
            >
              <UserIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>Profile</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium text-sm"
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