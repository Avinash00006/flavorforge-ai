"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="
        p-2
        rounded-xl
        border
        border-stone-300/80
        dark:border-stone-700/80
        bg-white/70
        dark:bg-stone-900/70
        backdrop-blur-md
        hover:border-amber-500/60
        dark:hover:border-amber-400/60
        hover:text-amber-500
        transition-all
        duration-200
        flex
        items-center
        justify-center
        text-sm
        shadow-xs
        active:scale-95
        cursor-pointer
      "
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}