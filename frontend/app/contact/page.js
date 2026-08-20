'use client';

import { useState, useEffect } from 'react';
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
  
  // Custom states for form hiding and countdown spam-lock
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Monitor spam protection status and run cooldown countdown in the background
  useEffect(() => {
    const checkCooldown = () => {
      const lastSubmitted = localStorage.getItem('lastContactSubmitted');
      if (lastSubmitted) {
        const timePassed = Date.now() - parseInt(lastSubmitted, 10);
        const cooldownPeriod = 5 * 60 * 1000; // 5 minutes in milliseconds
        if (timePassed < cooldownPeriod) {
          setSubmitted(true);
          setTimeLeft(Math.ceil((cooldownPeriod - timePassed) / 1000));
        } else {
          setSubmitted(false);
          setTimeLeft(0);
        }
      }
    };

    // Initial check on mount
    checkCooldown();

    // Re-check every second to update countdown display
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check cooldown state first
    if (timeLeft > 0) {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      toast.error(`Spam Protection: Please wait ${minutes}m ${seconds}s before sending another message.`);
      return;
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
      setTimeLeft(300); // Set initial 5 minutes countdown
      
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
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm backdrop-blur-md">
          {submitted ? (
            // Success View (Form disappears, showing status card)
            <div className="text-center py-6">
              {/* Success Badge Icon */}
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full 
                              mx-auto flex items-center justify-center text-4xl font-bold mb-6
                              border border-green-500/20 shadow-xs animate-pulse">
                ✅
              </div>
              <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 mb-3">
                Message Sent!
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed max-w-sm mx-auto">
                Thank you for reaching out. Your secure message has been successfully delivered. The developer will contact you shortly.
              </p>
              
              <div className="mt-8 space-y-4">
                <Button
                  onClick={() => router.push('/dashboard')}
                  className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors duration-200"
                >
                  Go to Dashboard
                </Button>
                
                {timeLeft > 0 && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold tracking-wide">
                    ⏱️ Spam protection active. Cooldown ends in: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
                  </p>
                )}
              </div>
            </div>
          ) : (
            // Form View
            <>
              <div className="mb-8 text-center">
                {/* Contact Icon Avatar */}
                <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-2xl 
                                mx-auto flex items-center justify-center text-3xl font-bold mb-4
                                border border-orange-500/20 shadow-xs">
                  ✉️
                </div>
                <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-zinc-50">
                  Contact Developer
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm font-medium">
                  Send a secure message directly to the developer's inbox.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Message
                  </label>
                  <textarea
                    className="w-full min-h-[120px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 disabled:opacity-50 transition-all"
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
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
