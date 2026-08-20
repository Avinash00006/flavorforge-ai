'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

// Resolve backend server endpoint dynamically
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ContactPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error?.message || resData.message || 'Failed to send message.');
      }

      toast.success('Message sent successfully! The developer will contact you shortly.');
      
      // Clear form inputs on success
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm backdrop-blur-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-zinc-50">
              Contact Developer
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm font-medium">
              Send a secure message directly to the developer's inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Name
              </label>
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                className="w-full min-h-[120px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm text-zinc-950 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50 transition-all"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors duration-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending Message...</span>
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
