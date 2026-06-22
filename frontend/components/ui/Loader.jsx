// components/ui/Loader.jsx

/**
 * Loader Component
 * Props:
 * - size: sm | md | lg
 */

export default function Loader({ size = "md" }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizes[size]} border-orange-500 border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}