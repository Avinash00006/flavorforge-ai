// components/ui/Input.jsx

/**
 * Input Component
 * Props:
 * - label
 * - placeholder
 * - type
 * - value
 * - onChange
 * - error
 */

export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  id,
}) {
  // Generate a standard web-safe ID from the label if no explicit ID is provided
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-md">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        name={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          border
          border-zinc-200
          dark:border-zinc-800
          rounded-lg
          px-4
          py-2.5
          text-sm

          bg-white
          dark:bg-zinc-900

          text-zinc-900
          dark:text-zinc-50
          placeholder-zinc-400
          dark:placeholder-zinc-500

          focus:outline-none
          focus:ring-2
          focus:ring-orange-500/20
          focus:border-orange-500
          transition-all
        "
      />

      {error && (
        <p className="text-red-500 text-xs mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}