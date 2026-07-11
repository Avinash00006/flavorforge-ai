"use client";

/**
 * User Profile Page (Protected)
 * 
 * Displays the active logged-in user session properties retrieved
 * from localStorage. Protected from unauthenticated access by RouteGuard.
 */

import { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RouteGuard from "../../components/RouteGuard";

export default function ProfilePage() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Retrieve session values from localStorage on mount
    setUserName(localStorage.getItem('userName') || 'Active User');
    setUserEmail(localStorage.getItem('userEmail') || 'user@brand.com');
  }, []);

  return (
    <RouteGuard>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-6">
        
        {/* Profile Details Card */}
        <div className="w-full max-w-md p-8 rounded-xl bg-white dark:bg-zinc-900/40
                        border border-zinc-200 dark:border-zinc-800 shadow-sm
                        transition-all duration-300">
          
          <div className="text-center mb-6">
            {/* User Icon Avatar */}
            <div className="w-20 h-20 bg-orange-500/10 text-orange-500 rounded-full 
                            mx-auto flex items-center justify-center text-3xl font-bold mb-4
                            border border-orange-500/20">
              {userName.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50">
              User Profile
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              FlavorForge AI Account Credentials
            </p>
          </div>

          <div className="space-y-4 border-t border-zinc-100 dark:border-zinc-800 pt-6">
            
            {/* Display Name Field */}
            <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800/50">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Full Name</span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{userName}</span>
            </div>

            {/* Display Email Field */}
            <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800/50">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Email Address</span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{userEmail}</span>
            </div>

            {/* Display Role / Status */}
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Account Status</span>
              <span className="text-xs px-2.5 py-1 font-semibold rounded-full bg-green-500/10 text-green-500 border border-green-500/30">
                Active Session
              </span>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </RouteGuard>
  );
}
