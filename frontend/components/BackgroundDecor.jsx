/**
 * BackgroundDecor Component
 * 
 * Provides an atmospheric, culinary-focused background for FlavorForge AI.
 * Pure server-rendered JSX component for zero hydration overhead and zero layout shift:
 * - Light Mode: Carrara marble, soft morning golden warmth & light vapor.
 * - Dark Mode: Volcanic slate, glowing saffron embers & flavor chemistry nodes.
 */
export default function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none"
    >
      {/* ☀️ Light Mode Background Image */}
      <img
        src="/flavorforge-bg-light.jpg"
        alt=""
        className="fixed inset-0 w-full h-full object-cover object-center opacity-70 dark:hidden transition-opacity duration-500"
      />

      {/* ☀️ Light Mode Gradient Overlay for Perfect Text Contrast */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#fbf9f5]/50 via-[#fbf9f5]/75 to-[#fbf9f5]/95 dark:hidden" />

      {/* 🌙 Dark Mode Background Image */}
      <img
        src="/flavorforge-bg-dark.jpg"
        alt=""
        className="fixed inset-0 w-full h-full object-cover object-center opacity-50 hidden dark:block transition-opacity duration-500"
      />

      {/* 🌙 Dark Mode Gradient Overlay for Deep Contrast & Readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0f0e0c]/60 via-[#0f0e0c]/80 to-[#0f0e0c]/98 hidden dark:block" />

      {/* ☀️ Ambient Honey & Golden Sunlight Glow (Light Mode) */}
      <div className="fixed -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-b from-amber-300/30 via-orange-200/20 to-transparent rounded-full blur-[130px] dark:hidden" />

      {/* 🌙 Ambient Ember & Saffron Core Glow (Dark Mode) */}
      <div className="fixed -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[420px] bg-gradient-to-b from-amber-500/20 via-orange-600/15 to-transparent rounded-full blur-[150px] hidden dark:block" />

      {/* Subtle Culinary Flavor-Grid Texture for Depth */}
      <div className="fixed inset-0 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] dark:bg-[radial-gradient(#44403c_1px,transparent_1px)] [background-size:28px_28px] opacity-40 dark:opacity-30" />
    </div>
  );
}
