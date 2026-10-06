'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { MailIcon, GithubIcon, LinkedinIcon } from '../../components/Icons';

// Resolve backend server endpoint dynamically
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ContactPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Custom state for form hiding
  const [submitted, setSubmitted] = useState(false);

  // Monitor spam protection status on mount
  useEffect(() => {
    const lastSubmitted = localStorage.getItem('lastContactSubmitted');
    if (lastSubmitted) {
      const timePassed = Date.now() - parseInt(lastSubmitted, 10);
      const cooldownPeriod = 5 * 60 * 1000; // 5 minutes in milliseconds
      if (timePassed < cooldownPeriod) {
        setSubmitted(true);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check cooldown state first
    const lastSubmitted = localStorage.getItem('lastContactSubmitted');
    if (lastSubmitted) {
      const timePassed = Date.now() - parseInt(lastSubmitted, 10);
      const cooldownPeriod = 5 * 60 * 1000;
      if (timePassed < cooldownPeriod) {
        toast.error('You have already sent a message recently. Please try again later.');
        return;
      }
    }

    // Basic form validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      toast.error("Contact service not configured: 'NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY' is missing in Vercel.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        access_key: accessKey.trim().replace(/['"]/g, ''),
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        subject: "FlavorForge AI - Developer Message"
      };

      // Submit directly from the client's browser to bypass Cloudflare server-side WAF blocks
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Failed to send message.');
      }

      toast.success('Message sent successfully!');
      
      // Save submission timestamp to prevent spam
      localStorage.setItem('lastContactSubmitted', Date.now().toString());
      setSubmitted(true);
      
      // Clear form inputs
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
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg bg-white/80 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 rounded-2xl p-8 shadow-xl shadow-amber-500/5 backdrop-blur-xl">
          {submitted ? (
            // Success View (Form disappears, showing status card)
            <div className="text-center py-6">
              {/* Success Badge Icon */}
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full 
                              mx-auto flex items-center justify-center text-4xl font-bold mb-6
                              border border-green-500/20 shadow-xs animate-pulse">
                ✅
              </div>
              <h1 className="text-3xl font-black text-stone-950 dark:text-stone-50 mb-3 tracking-tight">
                Message Sent!
              </h1>
              <p className="text-stone-500 dark:text-stone-400 text-sm font-medium leading-relaxed max-w-sm mx-auto">
                Thank you for reaching out. Your secure message has been successfully delivered. The developer will contact you shortly.
              </p>
              
              <div className="mt-8">
                <Button
                  onClick={() => router.push('/dashboard')}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-md shadow-orange-500/20 transition-all duration-200"
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          ) : (
            // Form View
            <>
              <div className="mb-8 text-center">
                {/* Contact Icon Avatar */}
                <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-orange-600 text-white rounded-2xl 
                                mx-auto flex items-center justify-center mb-4
                                shadow-md shadow-orange-500/20">
                  <MailIcon className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-black text-stone-950 dark:text-stone-50 tracking-tight">
                  Contact Developer
                </h1>
                <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm font-medium">
                  Send a message directly regarding FlavorForge AI features and feedback.
                </p>

                {/* Developer Social Links */}
                <div className="flex justify-center gap-3 mt-4">
                  <a
                    href="https://github.com/Avinash00006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200/80 dark:border-stone-800/80 bg-white/60 dark:bg-stone-900/60 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/40 transition-colors shadow-xs"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sairam-avinash-koneti/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200/80 dark:border-stone-800/80 bg-white/60 dark:bg-stone-900/60 text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/40 transition-colors shadow-xs"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                    Message
                  </label>
                  <textarea
                    className="w-full min-h-[120px] rounded-xl border border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-50 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 disabled:opacity-50 transition-all shadow-xs"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3 font-semibold"
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
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
