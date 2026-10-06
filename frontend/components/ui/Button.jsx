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
  className = "",
  type = "button",
  ...props
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md shadow-orange-500/20 active:scale-95 cursor-pointer font-semibold",
    secondary:
      "bg-stone-200/80 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 hover:bg-stone-300 dark:hover:bg-stone-700 backdrop-blur-sm active:scale-95 cursor-pointer font-medium",
    outline:
      "border border-amber-500/80 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white dark:hover:text-stone-950 backdrop-blur-sm active:scale-95 cursor-pointer font-semibold",
  };

  const sizes = {
    sm: "px-3.5 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2.5
        rounded-xl
        transition-all
        duration-200
        select-none
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}