import { GithubIcon, LinkedinIcon, MailIcon, FlameIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200/80 dark:border-stone-800/80 mt-20 py-10 bg-[#fbf9f5]/50 dark:bg-[#0f0e0c]/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <FlameIcon className="w-4 h-4 text-amber-500" />
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            © 2026 <span className="font-semibold text-stone-800 dark:text-stone-200">FlavorForge AI</span>. Precision Culinary Intelligence.
          </p>
        </div>

        <div className="flex items-center gap-5 sm:gap-6">
          <a
            href="https://github.com/Avinash00006"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm font-medium"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/sairam-avinash-koneti/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm font-medium"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <a
            href="/#about"
            className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm font-medium"
          >
            <span>About</span>
          </a>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm font-medium"
          >
            <MailIcon className="w-4 h-4" />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
