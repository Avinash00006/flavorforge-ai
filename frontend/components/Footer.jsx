export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-20 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          © 2026 FlavorForge AI. All rights reserved.
        </p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <a
            href="#"
            className="text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors text-sm"
          >
            GitHub
          </a>

          <a
            href="#"
            className="text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors text-sm"
          >
            LinkedIn
          </a>

          <a
            href="#"
            className="text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors text-sm"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}