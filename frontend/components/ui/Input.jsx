"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../Icons";

/**
 * Input Component
 * 
 * Versatile input field supporting labels, error feedback, custom icons,
 * and built-in show/hide password visibility toggle with animated SVG eye icons.
 * 
 * Props:
 * - label: Optional input header label
 * - placeholder: Placeholder text
 * - type: HTML input type (defaults to 'text')
 * - value: Controlled input value
 * - onChange: Change event handler
 * - error: Optional error string to display below the input
 * - id: HTML element ID
 * - icon: Left-aligned decorative icon
 * - rightIcon: Optional right-aligned icon
 * - showPasswordToggle: Boolean flag (defaults to true) to enable eye toggle for password inputs
 * - className: Custom Tailwind classes
 */
export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  id,
  icon,
  rightIcon,
  showPasswordToggle = true,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const effectiveType = isPassword ? (showPassword ? "text" : "password") : type;

  // Generate a standard web-safe ID from the label if no explicit ID is provided
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          name={inputId}
          type={effectiveType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full
            border
            border-stone-200/80
            dark:border-stone-800/80
            rounded-xl
            ${icon ? 'pl-10' : 'px-4'}
            ${isPassword && showPasswordToggle ? 'pr-11' : rightIcon ? 'pr-11' : 'pr-4'}
            py-2.5
            text-sm

            bg-white/90
            dark:bg-stone-900/90

            text-stone-900
            dark:text-stone-50
            placeholder-stone-400
            dark:placeholder-stone-500

            focus:outline-none
            focus:ring-2
            focus:ring-amber-500/20
            focus:border-amber-500
            disabled:opacity-50
            transition-all
            shadow-xs
            ${className}
          `}
          {...props}
        />

        {/* Interactive password visibility toggle button */}
        {isPassword && showPasswordToggle ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-amber-600 dark:text-stone-500 dark:hover:text-amber-400 transition-colors focus:outline-none cursor-pointer"
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5 transition-transform duration-150 hover:scale-110" />
            ) : (
              <EyeIcon className="w-5 h-5 transition-transform duration-150 hover:scale-110" />
            )}
          </button>
        ) : rightIcon ? (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
            {rightIcon}
          </div>
        ) : null}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}