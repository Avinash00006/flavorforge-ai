export default function FeatureCard({
  title,
  description,
  icon = "✨"
}) {
  return (
    <div
      className="
        border
        border-stone-200/80
        dark:border-stone-800/80
        rounded-2xl
        p-7
        bg-white/75
        dark:bg-stone-900/60
        backdrop-blur-md
        hover:border-amber-500/50
        hover:shadow-xl
        hover:shadow-amber-500/5
        transition-all
        duration-300
        hover:-translate-y-1
        space-y-4
        group
      "
    >
      {/* Icon Wrapper */}
      <div className="w-13 h-13 bg-gradient-to-br from-amber-500/15 to-orange-500/10 text-amber-600 dark:text-amber-400 rounded-xl 
                      flex items-center justify-center text-2xl font-bold 
                      border border-amber-500/25 shadow-xs group-hover:scale-105 transition-transform duration-200">
        {icon}
      </div>

      <div className="space-y-2">
        {/* Card Title */}
        <h3
          className="
            text-xl
            font-bold
            text-stone-950
            dark:text-stone-50
            group-hover:text-amber-600
            dark:group-hover:text-amber-400
            transition-colors
          "
        >
          {title}
        </h3>

        {/* Card Description */}
        <p
          className="
            text-sm
            text-stone-600
            dark:text-stone-400
            leading-relaxed
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}