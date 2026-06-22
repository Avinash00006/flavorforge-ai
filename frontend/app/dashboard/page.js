// Import shared layout components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 py-20">

        <div className="max-w-6xl mx-auto">

          {/* Dashboard Heading */}
          <h1 className="text-5xl font-bold text-foreground">
            Dashboard
          </h1>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Manage your AI generated content and track activity.
          </p>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-900">
              <h2 className="text-3xl font-bold">0</h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Generated Descriptions
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-900">
              <h2 className="text-3xl font-bold">0</h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Saved Drafts
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gray-100 dark:bg-gray-900">
              <h2 className="text-3xl font-bold">0</h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                AI Requests
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}