"use client";

import Button from './Button';

/**
 * Reusable Empty State Component
 * 
 * Renders a premium empty-state placeholder card when lists or search grids
 * return 0 results. Includes title, description, custom icon, and CTA.
 */
export default function EmptyState({ 
  title = "No content found", 
  description = "Get started by generating your first AI content asset.", 
  icon = "✨",
  actionText,
  onAction 
}) {
  return (
    <div className="py-20 px-6 border border-dashed border-zinc-200 dark:border-zinc-800 
                    rounded-2xl text-center space-y-6 bg-zinc-50/50 dark:bg-zinc-900/10 
                    backdrop-blur-sm transition-all duration-300 max-w-xl mx-auto my-8">
      
      {/* Icon Graphic */}
      <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-full 
                      mx-auto flex items-center justify-center text-3xl font-semibold
                      border border-orange-500/20 shadow-sm animate-pulse">
        {icon}
      </div>

      {/* Copy Text */}
      <div className="space-y-2">
        <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>

      {/* Optional Call to Action Button */}
      {actionText && onAction && (
        <div className="pt-2">
          <Button variant="primary" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
}
