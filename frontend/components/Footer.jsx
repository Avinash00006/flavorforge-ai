export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400">
          © 2026 FlavorForge AI. All rights reserved.
        </p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white">
            GitHub
          </a>

          <a href="#" className="text-gray-400 hover:text-white">
            LinkedIn
          </a>

          <a href="#" className="text-gray-400 hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}