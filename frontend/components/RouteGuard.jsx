"use client";

/**
 * Route Guard Component
 * 
 * Protects client-side views (like /dashboard and /profile) from guest access.
 * Checks for a JWT token in localStorage on mount. If absent, redirects to /login.
 * Renders a clean loading spinner while verifying client-side state.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check local storage for JWT auth token
    const token = localStorage.getItem('token');
    
    if (!token) {
      setAuthorized(false);
      // Redirect unauthenticated user back to login page
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Render a clean, animated loading layout while client state resolves
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse">
            Verifying your session...
          </p>
        </div>
      </div>
    );
  }

  // Renders protected page children if token is found
  return children;
}
