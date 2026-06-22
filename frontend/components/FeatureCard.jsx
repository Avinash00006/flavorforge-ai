export default function FeatureCard({
  title,
  description,
}) {
  return (
    <div
      className="
        border
        border-gray-200
        dark:border-gray-700

        rounded-lg
        p-6

        bg-white
        dark:bg-zinc-900
      "
    >
      {/* Card Title */}
      <h3
        className="
          text-xl
          font-semibold

          text-black
          dark:text-white
        "
      >
        {title}
      </h3>

      {/* Card Description */}
      <p
        className="
          mt-3

          text-gray-700
          dark:text-gray-400
        "
      >
        {description}
      </p>
    </div>
  );
}