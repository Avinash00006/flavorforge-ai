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
 * - icon
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
  className = "",
  ...props
}) {
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
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full
            border
            border-stone-200/80
            dark:border-stone-800/80
            rounded-xl
            ${icon ? 'pl-10 pr-4' : 'px-4'}
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
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}