// components/ui/Button.jsx

/**
 * Button Component
 * Props:
 * - children
 * - variant: primary | secondary | outline
 * - size: sm | md | lg
 * - onClick
 * - disabled
 */

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
}) {
  const variants = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white shadow-xs active:scale-98",
    secondary:
      "bg-zinc-800 dark:bg-zinc-200 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-100 shadow-xs active:scale-98",
    outline:
      "border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white active:scale-98",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3",
    lg: "px-7 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg
        font-medium
        transition-all
        duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );
}