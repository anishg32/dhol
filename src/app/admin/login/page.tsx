"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        window.location.href = "/admin";
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-charcoal flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-brand-black border border-brand-white/10 p-8 rounded-sm shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1.5 border border-brand-red/30 bg-brand-red/5 backdrop-blur-sm rounded-full mb-4">
            <span className="font-heading tracking-[0.2em] text-[10px] text-brand-red uppercase font-bold">
              AUTHORIZED PERSONNEL ONLY
            </span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-brand-white">ADMIN LOGIN</h1>
        </div>

        {error && (
          <div className="bg-brand-red/10 border border-brand-red text-brand-red px-4 py-3 rounded-sm mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">EMAIL ADDRESS</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-brand-white/20 px-0 py-3 text-brand-white focus:outline-none focus:border-brand-red transition-colors" 
              placeholder="admin@teamaliyanz.com" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">PASSWORD</label>
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
            className="w-full py-4 bg-brand-red text-brand-black font-bold tracking-[0.2em] hover:bg-brand-white transition-all duration-300 mt-8 disabled:opacity-70 flex items-center justify-center group"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="group-hover:scale-105 transition-transform">ACCESS DASHBOARD</span>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
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
