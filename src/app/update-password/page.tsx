"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UpdatePasswordPortal() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const supabase = createClient();
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
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
    
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    } else {
      toast.success("Password updated successfully!");
      router.push("/dashboard");
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
          <h1 className="font-heading text-3xl font-bold text-brand-white">
            NEW PASSWORD
          </h1>
          <p className="text-brand-white/50 text-sm mt-3">
            Please enter your new password below.
          </p>
        </div>

        <div className="relative z-10">
          <form 
            onSubmit={handleUpdatePassword} 
            className="space-y-4"
          >
            <div>
              <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 block mb-2">NEW PASSWORD</label>
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
                <span className="uppercase text-sm">Update Password</span>
              )}
            </button>
          </form>
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
