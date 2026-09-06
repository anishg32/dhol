"use client";

import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";

type Message = {
  id: string;
  message: string;
  adminReply: string | null;
  createdAt: Date;
};

export default function DashboardChatClient({ 
  initialMessages,
  userEmail
}: { 
  initialMessages: Message[],
  userEmail: string
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userEmail.split("@")[0], // default name to email prefix
          email: userEmail,
          message: newMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      // Optimistically add to UI
      const newMsg: Message = {
        id: data.messageId || Math.random().toString(),
        message: newMessage,
        adminReply: null,
        createdAt: new Date(),
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-brand-white/30">
            <p className="uppercase tracking-widest text-xs font-bold">No messages yet</p>
            <p className="text-sm mt-2">Send a message to start chatting with the admins.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="space-y-4">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-brand-red text-brand-black max-w-[80%] p-4 rounded-l-xl rounded-tr-xl">
                  <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                  <p className="text-[9px] font-bold tracking-wider mt-2 opacity-60 text-right">
                    {format(new Date(msg.createdAt), "MMM d, h:mm a")}
                  </p>
                </div>
              </div>

              {/* Admin Reply */}
              {msg.adminReply && (
                <div className="flex justify-start">
                  <div className="bg-brand-white/10 border border-brand-white/20 text-brand-white max-w-[80%] p-4 rounded-r-xl rounded-tl-xl">
                    <p className="text-[10px] font-bold text-brand-red mb-1 uppercase tracking-wider">Nashik Dhol Admin</p>
                    <p className="text-sm whitespace-pre-wrap">{msg.adminReply}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-4 bg-brand-charcoal/50 border-t border-brand-white/10">
        <form onSubmit={handleSendMessage} className="flex gap-2 relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 bg-brand-black border border-brand-white/20 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-brand-red transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !newMessage.trim()}
            className="bg-brand-red text-brand-black font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-full hover:bg-brand-white transition-colors disabled:opacity-50"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </>
  );
}
