"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLoginPortal() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "unauthorized") {
      toast.error("Access Denied: This account is not authorized to view the admin area.");
      window.history.replaceState({}, document.title, "/admin/login");
    }
  }, []);

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
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-white/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <div className="inline-block px-4 py-1.5 border border-brand-white/20 bg-brand-white/5 backdrop-blur-sm rounded-full mb-4">
            <span className="font-heading tracking-[0.2em] text-[10px] text-brand-white uppercase font-bold">
              AUTHORIZED PERSONNEL ONLY
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-brand-white tracking-widest">
            ADMIN PORTAL
          </h1>
        </div>

        <div className="relative z-10">
          <form 
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
                className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-white/50 transition-colors" 
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
                className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-white/50 transition-colors" 
                placeholder="••••••••" 
              />
            </div>
            
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-brand-white text-brand-black font-bold tracking-[0.2em] hover:bg-gray-200 transition-all duration-300 mt-6 disabled:opacity-70 flex items-center justify-center gap-3 rounded-sm"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="uppercase text-xs">Sign In</span>
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-8 pt-6 border-t border-brand-white/10 flex items-center justify-center relative z-10">
          <Link 
            href="/" 
            className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 hover:text-brand-white transition-colors uppercase"
          >
            ← Back to Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
