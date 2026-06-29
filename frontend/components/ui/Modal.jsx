// components/ui/Modal.jsx

"use client";

import { useEffect } from "react";

/**
 * Modal Component
 * Props:
 * - isOpen
 * - onClose
 * - title
 * - children
 */

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-xs">
      <div className="bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 w-[90%] max-w-md shadow-xl transition-colors duration-200">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-150 dark:border-zinc-800">
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}