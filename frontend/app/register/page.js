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
        <div className="w-full max-w-md p-8 rounded-xl bg-white dark:bg-zinc-900/40
                        border border-zinc-200 dark:border-zinc-800 shadow-sm
                        transition-all duration-300">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50">
              Create Account
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Join FlavorForge AI and generate smart product descriptions
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
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
              className="w-full py-2.5 mt-2 flex justify-center items-center"
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
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
            >
              Log In
            </Link>
          </p>

        </div>

      </main>
    </>
  );
}
