"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Calendar, Inbox } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    if (pathname === "/admin/login") return;

    const fetchUnreadCount = async () => {
      try {
        const res = await fetch("/api/messages/unread-count");
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch unread count", error);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [pathname]);

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-brand-charcoal text-brand-white flex flex-col">
      <header className="bg-brand-black border-b border-brand-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="font-heading text-xl font-bold">DHOL <span className="text-brand-red">ADMIN</span></h1>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/admin" 
                className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors ${pathname === '/admin' ? 'text-brand-red' : 'text-brand-white/50 hover:text-brand-white'}`}
              >
                <Calendar size={16} /> Bookings
              </Link>
              <Link 
                href="/admin/inbox" 
                className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors relative ${pathname === '/admin/inbox' ? 'text-brand-red' : 'text-brand-white/50 hover:text-brand-white'}`}
              >
                <Inbox size={16} /> Inbox
                {unreadCount > 0 && (
                  <span className="flex items-center justify-center bg-brand-red text-white text-[10px] w-5 h-5 rounded-full absolute -top-3 -right-6 shadow-[0_0_8px_rgba(211,47,47,0.8)]">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              href="/"
              className="text-xs font-bold tracking-widest text-brand-white/50 hover:text-brand-white transition-colors uppercase"
            >
              Back to Website
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-brand-white/70 hover:text-brand-white transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="md:hidden bg-brand-black border-b border-brand-white/10 flex">
        <Link 
          href="/admin" 
          className={`flex-1 py-3 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors ${pathname === '/admin' ? 'text-brand-red bg-brand-white/5' : 'text-brand-white/50'}`}
        >
          <Calendar size={14} /> Bookings
        </Link>
        <Link 
          href="/admin/inbox" 
          className={`flex-1 py-3 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors relative ${pathname === '/admin/inbox' ? 'text-brand-red bg-brand-white/5' : 'text-brand-white/50'}`}
        >
          <Inbox size={14} /> 
          Inbox
          {unreadCount > 0 && (
            <span className="flex items-center justify-center bg-brand-red text-white text-[10px] w-4 h-4 rounded-full ml-2 shadow-[0_0_8px_rgba(211,47,47,0.8)]">
              {unreadCount}
            </span>
          )}
        </Link>
      </div>

      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
