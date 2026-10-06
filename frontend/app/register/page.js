"use client";

/**
 * Register Page Component
 * 
 * Renders the user registration form, allowing users to sign up
 * using email, name, and password. Links error/success notifications
 * to react-hot-toast. Redirects to `/login` upon success.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BoltIcon } from '../../components/Icons';

// Backend base URL configuration
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function RegisterPage() {
  const router = useRouter();
  
  // Local state parameters
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Standard client-side checks
    if (!name || !email || !password) {
      toast.error('Please fill in all registration fields.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error?.message || resData.message || 'Registration failed.');
      }

      toast.success('Registration successful! Redirecting to login...');
      // Redirect to login page on success
      router.push('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-6">
        
        {/* Registration Card */}
        <div className="w-full max-w-md p-8 rounded-2xl bg-white/80 dark:bg-stone-900/70
                        border border-stone-200/80 dark:border-stone-800/80 shadow-xl shadow-amber-500/5
                        backdrop-blur-xl transition-all duration-300">
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-orange-500/20">
              <BoltIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-black text-stone-950 dark:text-stone-50 tracking-tight">
              Create Account
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
              Join FlavorForge AI and forge sensory food narratives
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Input */}
            <Input
              label="Full Name"
              placeholder="e.g. John Doe"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="register-name"
            />

            {/* Email Input */}
            <Input
              label="Email Address"
              placeholder="e.g. user@brand.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="register-email"
            />

            {/* Password Input */}
            <Input
              label="Password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="register-password"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 mt-2 flex justify-center items-center font-semibold"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Register'
              )}
            </Button>
          </form>

          {/* Redirection Link */}
          <p className="text-center text-sm text-stone-500 dark:text-stone-400 mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-amber-600 dark:text-amber-400 hover:text-orange-600 transition-colors"
            >
              Sign In
            </Link>
          </p>

        </div>

      </main>

      <Footer />
    </>
  );
}
