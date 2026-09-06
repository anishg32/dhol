import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import DashboardChatClient from "./DashboardChatClient";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | Nashik Dhol",
};

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/login");
  }

  // Fetch all messages for this user
  const messages = await prisma.message.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" }, // Oldest to newest for chat layout
  });

  return (
    <div className="min-h-screen bg-brand-charcoal text-brand-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-wider">
              YOUR <span className="text-brand-red">DASHBOARD</span>
            </h1>
            <p className="text-brand-white/50 text-sm mt-1">Logged in as {user.email}</p>
          </div>
          <Link 
            href="/" 
            className="px-6 py-2 border border-brand-white/20 hover:border-brand-red text-sm font-bold tracking-[0.1em] transition-colors rounded-sm uppercase"
          >
            Back to Site
          </Link>
        </div>

        <div className="bg-brand-black border border-brand-white/10 rounded-sm overflow-hidden flex flex-col h-[600px] shadow-2xl relative">
          <div className="p-4 border-b border-brand-white/10 bg-brand-black/80 backdrop-blur-md relative z-10">
            <h2 className="font-bold tracking-[0.1em] uppercase text-sm">Support Chat</h2>
            <p className="text-[10px] text-brand-white/50 tracking-wider">TALK DIRECTLY WITH THE ADMINS</p>
          </div>
          
          <DashboardChatClient initialMessages={messages} userEmail={user.email || ""} />
        </div>
      </div>
    </div>
  );
}
