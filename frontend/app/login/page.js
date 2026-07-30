"use client";

/**
 * Login Page Component
 * 
 * Handles credentials validation and OAuth triggers.
 * Stores authenticated JWT session tokens in localStorage on success
 * and redirects users to the secure dashboard.
 */

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

// Backend base URL configuration
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Login() {
  const router = useRouter();
  
  // Local state parameters
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Monitor OAuth failure errors from query parameters
  useEffect(() => {
    // Check if redirect query string contains login failure indicators
    const params = new URLSearchParams(window.location.search);
    if (params.get('error') === 'OAuthFailed') {
      toast.error('Google Sign-In failed. Please try again.');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error?.message || resData.message || 'Login failed.');
      }

      // Save JWT session details locally
      localStorage.setItem('token', resData.token);
      localStorage.setItem('userEmail', resData.data.email);
      localStorage.setItem('userName', resData.data.name);

      toast.success('Login successful! Redirecting...');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect directly to the Express Google OAuth route
    window.location.href = `${API_BASE}/api/auth/google`;
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-6">

        {/* Login Card */}
        <div className="w-full max-w-md p-8 rounded-xl bg-white dark:bg-zinc-900/40
                        border border-zinc-200 dark:border-zinc-800 shadow-sm
                        transition-all duration-300">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Welcome Back
            </h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-sm">
              Log in to continue using FlavorForge AI
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <Input
              label="Email Address"
              placeholder="e.g. user@brand.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="login-email"
            />

            {/* Password Input */}
            <Input
              label="Password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="login-password"
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
                'Log In'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
            </div>
            <span className="relative bg-white dark:bg-zinc-950 px-4 text-xs uppercase text-zinc-400">
              or continue with
            </span>
          </div>

          {/* Google Sign-in Trigger */}
          <Button
            type="button"
            variant="secondary"
            onClick={handleGoogleLogin}
            className="w-full py-2.5 flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            {/* Google Icon SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.354 0 3.39 2.76 1.523 6.755l3.743 3.01z"
              />
              <path
                fill="#FBBC05"
                d="M1.523 6.755A6.994 6.994 0 0 0 1 12c0 1.927.477 3.736 1.323 5.336l3.75-3.09a7.07 7.07 0 0 1-.807-2.246 7.07 7.07 0 0 1 0-4.436l-3.743-3.01z"
              />
              <path
                fill="#4285F4"
                d="M12 24c3.245 0 5.973-1.073 7.964-2.927l-3.864-3.009c-1.127.755-2.564 1.209-4.1 1.209-3.2 0-5.918-2.164-6.882-5.09l-3.791 3.127C3.182 21.218 7.273 24 12 24z"
              />
              <path
                fill="#34A853"
                d="M23.491 12.273c0-.818-.082-1.609-.227-2.373H12v4.518h6.445a5.532 5.532 0 0 1-2.4 3.627l3.864 3.009c2.263-2.09 3.582-5.173 3.582-8.781z"
              />
            </svg>
            Google
          </Button>

          {/* Registration Redirect Link */}
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-orange-500 hover:text-orange-600 transition-colors"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </>
  );
}