export default function FeatureCard({
  title,
  description,
}) {
  return (
    <div
      className="
        border
        border-zinc-200
        dark:border-zinc-800

        rounded-lg
        p-6

        bg-white
        dark:bg-zinc-900/40
        shadow-xs
      "
    >
      {/* Card Title */}
      <h3
        className="
          text-xl
          font-bold

          text-zinc-950
          dark:text-zinc-50
        "
      >
        {title}
      </h3>

      {/* Card Description */}
      <p
        className="
          mt-3
          text-sm

          text-zinc-600
          dark:text-zinc-400
        "
      >
        {description}
      </p>
    </div>
  );
}