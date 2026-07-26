export default function FeatureCard({
  title,
  description,
  icon = "✨"
}) {
  return (
    <div
      className="
        border
        border-zinc-200
        dark:border-zinc-800
        rounded-xl
        p-6
        bg-white
        dark:bg-zinc-900/40
        hover:shadow-md
        transition-all
        duration-200
        space-y-4
      "
    >
      {/* Icon Wrapper */}
      <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-xl 
                      flex items-center justify-center text-2xl font-bold 
                      border border-orange-500/20 shadow-sm">
        {icon}
      </div>

      <div className="space-y-2">
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
            text-sm
            text-zinc-600
            dark:text-zinc-400
            leading-relaxed
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}