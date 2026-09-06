"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

type ViewState = "signup" | "check_email";

export default function SignupPortal() {
  const [view, setView] = useState<ViewState>("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
      }
    });

    if (error) {
      toast.error(error.message);
    } else {
      setView("check_email");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-brand-charcoal">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-brand-black border border-brand-white/10 p-8 rounded-sm shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <h1 className="font-heading text-3xl font-bold text-brand-white">
            {view === "signup" ? "CREATE ACCOUNT" : "CHECK YOUR EMAIL"}
          </h1>
          <p className="text-brand-white/50 text-sm mt-3">
            {view === "signup" 
              ? "Join Nashik Dhol to chat with us and manage bookings."
              : `We've sent a confirmation link to ${email || "your email"}.`}
          </p>
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {view === "signup" && (
              <motion.form 
                key="signup"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSignup} 
                className="space-y-4"
              >
                <div>
                  <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 block mb-2">FULL NAME</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 block mb-2">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" 
                    placeholder="user@example.com" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 block mb-2">PASSWORD</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" 
                    placeholder="••••••••" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 block mb-2">CONFIRM PASSWORD</label>
                  <input 
                    type="password" 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" 
                    placeholder="••••••••" 
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-brand-red text-brand-black font-bold tracking-[0.1em] hover:bg-brand-white transition-all duration-300 mt-6 disabled:opacity-70 flex items-center justify-center gap-3 rounded-sm"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="uppercase text-sm">Create Account</span>
                  )}
                </button>

                <div className="text-center mt-6">
                  <span className="text-xs text-brand-white/50">Already have an account? </span>
                  <Link href="/login" className="text-xs text-brand-white hover:text-brand-red transition-colors font-bold uppercase tracking-wider">
                    Sign In
                  </Link>
                </div>
              </motion.form>
            )}

            {view === "check_email" && (
              <motion.div 
                key="check_email"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <p className="text-sm text-brand-white/70 mb-8">
                  Please confirm your email address by clicking the link we just sent you. 
                  Once confirmed, you can log in to your dashboard.
                </p>
                
                <Link 
                  href="/login"
                  className="inline-block text-xs text-brand-white/50 hover:text-brand-white transition-colors uppercase tracking-wider font-bold"
                >
                  ← Back to Login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="mt-8 pt-6 border-t border-brand-white/10 flex items-center justify-between relative z-10 text-[10px] font-bold tracking-[0.1em] text-brand-white/30 uppercase">
          <Link href="/" className="hover:text-brand-white/70 transition-colors">← Home</Link>
          <div className="flex gap-4">
            <Link href="/#contact" className="hover:text-brand-white/70 transition-colors">Support</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
