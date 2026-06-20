export default function FeatureCard({
  title,
  description,
}) {
  return (
    <div className="border border-gray-700 rounded-lg p-6 bg-zinc-900">
      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-gray-400">
        {description}
      </p>
    </div>
  );
}