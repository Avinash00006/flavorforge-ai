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
}) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {label && (
        <label className="font-medium text-black dark:text-white">
          {label}
        </label>
      )}

      {/* Input field */}
<input
  type={type}
  value={value}
  onChange={onChange}
  placeholder={placeholder}
  className="
    border
    border-gray-300
    dark:border-gray-600
    rounded-lg
    px-4
    py-3

    bg-white
    dark:bg-gray-800

    text-black
    dark:text-white

    focus:outline-none
    focus:ring-2
    focus:ring-orange-500
  "
/>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}