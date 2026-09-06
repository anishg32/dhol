"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ViewState = "user_otp" | "verify_otp" | "admin_login";

export default function LoginPortal() {
  const [view, setView] = useState<ViewState>("user_otp");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "unauthorized") {
      toast.error("Access Denied: This account is not authorized to view the admin area.");
      window.history.replaceState({}, document.title, "/login");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setView("admin_login"); // Assuming they tried to access admin
    }
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("OTP sent to your email!");
      setView("verify_otp");
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    } else {
      toast.success("Successfully logged in!");
      router.push("/");
    }
  };

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    } else {
      router.push("/admin");
    }
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
          {view === "admin_login" && (
            <div className="inline-block px-4 py-1.5 border border-brand-red/30 bg-brand-red/5 backdrop-blur-sm rounded-full mb-4">
              <span className="font-heading tracking-[0.2em] text-[10px] text-brand-red uppercase font-bold">
                AUTHORIZED PERSONNEL ONLY
              </span>
            </div>
          )}
          <h1 className="font-heading text-3xl font-bold text-brand-white">
            {view === "admin_login" ? "ADMIN PORTAL" : "WELCOME"}
          </h1>
          <p className="text-brand-white/50 text-sm mt-3">
            {view === "admin_login" 
              ? "Please sign in with your admin credentials."
              : view === "verify_otp"
                ? "Enter the 6-digit code sent to your email."
                : "Sign in with your email to continue."}
          </p>
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {view === "user_otp" && (
              <motion.form 
                key="user_otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSendOtp} 
                className="space-y-4"
              >
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
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-brand-red text-brand-black font-bold tracking-[0.1em] hover:bg-brand-white transition-all duration-300 mt-6 disabled:opacity-70 flex items-center justify-center gap-3 rounded-sm"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="uppercase text-sm">Send Secure Code</span>
                  )}
                </button>
              </motion.form>
            )}

            {view === "verify_otp" && (
              <motion.form 
                key="verify_otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleVerifyOtp} 
                className="space-y-4"
              >
                <div>
                  <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 block mb-2">6-DIGIT SECURE CODE</label>
                  <input 
                    type="text" 
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors text-center font-mono tracking-[0.5em] text-xl" 
                    placeholder="••••••" 
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading || otp.length < 6}
                  className="w-full py-4 bg-brand-red text-brand-black font-bold tracking-[0.1em] hover:bg-brand-white transition-all duration-300 mt-6 disabled:opacity-70 flex items-center justify-center gap-3 rounded-sm"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="uppercase text-sm">Verify & Login</span>
                  )}
                </button>
                <div className="text-center mt-4">
                  <button 
                    type="button" 
                    onClick={() => setView("user_otp")}
                    className="text-xs text-brand-white/50 hover:text-brand-white transition-colors"
                  >
                    Change Email
                  </button>
                </div>
              </motion.form>
            )}

            {view === "admin_login" && (
              <motion.form 
                key="admin_login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleAdminSignIn} 
                className="space-y-4"
              >
                <div>
                  <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 block mb-2">ADMIN EMAIL</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" 
                    placeholder="admin@example.com" 
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
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-white text-black font-bold tracking-[0.1em] hover:bg-gray-200 transition-all duration-300 mt-6 disabled:opacity-70 flex items-center justify-center gap-3 rounded-sm"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="uppercase text-sm">Sign In</span>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        
        <div className="mt-8 pt-6 border-t border-brand-white/10 flex items-center justify-between relative z-10 text-[10px] font-bold tracking-[0.1em] text-brand-white/30 uppercase">
          <Link 
            href="/" 
            className="hover:text-brand-white/70 transition-colors"
          >
            ← Home
          </Link>

          <div className="flex gap-4">
            <Link 
              href="/#contact" 
              className="hover:text-brand-white/70 transition-colors"
            >
              Support
            </Link>
            
            {view === "admin_login" ? (
              <button 
                onClick={() => { setView("user_otp"); setPassword(""); }}
                className="hover:text-brand-white transition-colors"
              >
                User Login
              </button>
            ) : (
              <button 
                onClick={() => { setView("admin_login"); setOtp(""); }}
                className="hover:text-brand-white transition-colors"
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
