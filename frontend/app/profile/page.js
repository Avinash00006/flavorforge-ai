"use client";

/**
 * User Profile Page (Protected)
 * 
 * Displays the active logged-in user session properties retrieved
 * from localStorage. Protected from unauthenticated access by RouteGuard.
 * Provides intuitive account logout capabilities.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RouteGuard from "../../components/RouteGuard";
import { UserIcon, MailIcon, CheckCircleIcon, LogoutIcon } from "../../components/Icons";

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Retrieve session values from localStorage on mount
    setUserName(localStorage.getItem('userName') || 'Active User');
    setUserEmail(localStorage.getItem('userEmail') || 'user@brand.com');
  }, []);

  const handleLogout = () => {
    // Flush active JWT credentials and notify application listeners
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.dispatchEvent(new Event('storage'));
    toast.success('Logged out successfully.');
    router.replace('/login');
  };

  return (
    <RouteGuard>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center px-6 py-16">
        
        {/* Profile Details Card */}
        <div className="w-full max-w-md p-8 rounded-2xl bg-white/80 dark:bg-stone-900/70
                        border border-stone-200/80 dark:border-stone-800/80 shadow-xl shadow-amber-500/5
                        backdrop-blur-xl transition-all duration-300">
          
          <div className="text-center mb-6">
            {/* User Icon Avatar */}
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 rounded-full 
                            mx-auto flex items-center justify-center text-3xl font-extrabold mb-4
                            border border-amber-500/30 shadow-md shadow-amber-500/10">
              {userName.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl font-black text-stone-950 dark:text-stone-50 tracking-tight">
              User Profile
            </h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              FlavorForge AI Account Credentials
            </p>
          </div>

          <div className="space-y-4 border-t border-stone-200/80 dark:border-stone-800/80 pt-6">
            
            {/* Display Name Field */}
            <div className="flex justify-between items-center py-2.5 border-b border-stone-200/50 dark:border-stone-800/50">
              <span className="text-sm flex items-center gap-2 text-stone-500 dark:text-stone-400">
                <UserIcon className="w-4 h-4 text-amber-500" />
                Full Name
              </span>
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">{userName}</span>
            </div>

            {/* Display Email Field */}
            <div className="flex justify-between items-center py-2.5 border-b border-stone-200/50 dark:border-stone-800/50">
              <span className="text-sm flex items-center gap-2 text-stone-500 dark:text-stone-400">
                <MailIcon className="w-4 h-4 text-amber-500" />
                Email Address
              </span>
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">{userEmail}</span>
            </div>

            {/* Display Role / Status */}
            <div className="flex justify-between items-center py-2.5">
              <span className="text-sm flex items-center gap-2 text-stone-500 dark:text-stone-400">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                Account Status
              </span>
              <span className="text-xs px-2.5 py-1 font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Active Session
              </span>
            </div>

          </div>

          {/* Account Logout Action */}
          <div className="mt-8 pt-6 border-t border-stone-200/80 dark:border-stone-800/80">
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-500/5 hover:bg-red-500/10 text-red-600 dark:text-red-400 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 hover:border-red-500/30 shadow-xs cursor-pointer active:scale-[0.99]"
            >
              <LogoutIcon className="w-4 h-4" />
              <span>Log Out of FlavorForge</span>
            </button>
          </div>

        </div>

      </main>

      <Footer />
    </RouteGuard>
  );
}
