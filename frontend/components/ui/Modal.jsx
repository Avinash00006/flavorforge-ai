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
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm px-4">
      <div className="bg-[#fbf9f5]/95 dark:bg-[#141210]/95 text-stone-900 dark:text-stone-50 border border-stone-200/80 dark:border-stone-800/80 rounded-2xl p-7 w-full max-w-xl shadow-2xl backdrop-blur-xl transition-all duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-stone-200/80 dark:border-stone-800/80">
          <h2 className="text-xl font-bold tracking-tight text-stone-950 dark:text-stone-50">{title}</h2>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors text-base cursor-pointer"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}