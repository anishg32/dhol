"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Check for unauthorized error from middleware
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "unauthorized") {
      toast.error("Access Denied: This account is not authorized.");
      // Clean up URL
      window.history.replaceState({}, document.title, "/admin/login");
    }
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-brand-charcoal">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-brand-black border border-brand-white/10 p-8 rounded-sm shadow-2xl relative overflow-hidden"
      >
        {/* Subtle cinematic light effect */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <div className="inline-block px-4 py-1.5 border border-brand-red/30 bg-brand-red/5 backdrop-blur-sm rounded-full mb-4">
            <span className="font-heading tracking-[0.2em] text-[10px] text-brand-red uppercase font-bold">
              AUTHORIZED PERSONNEL ONLY
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-brand-white">ADMIN PORTAL</h1>
          <p className="text-brand-white/50 text-sm mt-3">
            Please sign in with your authorized Google account to access the dashboard.
          </p>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="relative z-10 w-full py-4 bg-white text-black font-bold tracking-[0.1em] hover:bg-gray-200 transition-all duration-300 mt-4 disabled:opacity-70 flex items-center justify-center gap-3 group rounded-sm"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FaGoogle className="text-xl" />
              <span className="group-hover:scale-105 transition-transform uppercase text-sm">Sign in with Google</span>
            </>
          )}
        </button>
        
        <div className="mt-8 text-center relative z-10">
          <Link 
            href="/" 
            className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 hover:text-brand-white transition-colors uppercase flex items-center justify-center gap-2"
          >
            ← Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
