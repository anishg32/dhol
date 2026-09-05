"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, CheckCircle, Mail, Phone, Clock, MailOpen, MailQuestion } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function InboxDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/messages?page=${page}&limit=10`);
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages);
        setTotalPages(data.pagination.pages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const updateMessageStatus = async (id: string, isRead: boolean) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead }),
      });
      if (res.ok) {
        setMessages(messages.map(m => m.id === id ? { ...m, isRead } : m));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage({ ...selectedMessage, isRead });
        }
        if (!isRead) {
          toast.success("Marked as unread");
        }
      } else {
        toast.error("Failed to update message status");
      }
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("An error occurred");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSelectedMessage(null);
        fetchMessages();
        toast.success("Message deleted successfully");
      } else {
        toast.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Failed to delete message", error);
      toast.error("An error occurred");
    }
  };

  return (
    <main className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
      
      {/* Main List */}
      <div className={`flex-1 ${selectedMessage ? 'hidden lg:block' : 'block'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold font-heading">Inbox</h2>
        </div>

        <div className="bg-brand-black border border-brand-white/10 rounded-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-white/5 text-brand-white/70">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider text-[10px] uppercase w-12"></th>
                <th className="px-6 py-4 font-bold tracking-wider text-[10px] uppercase">Sender</th>
                <th className="px-6 py-4 font-bold tracking-wider text-[10px] uppercase">Message Preview</th>
                <th className="px-6 py-4 font-bold tracking-wider text-[10px] uppercase">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-white/10">
              {isLoading && messages.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-brand-white/50">Loading inbox...</td></tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="text-brand-white/50 font-bold tracking-widest uppercase mb-2">Your inbox is empty</div>
                    <div className="text-brand-white/30 text-xs">New contact enquiries will appear here.</div>
                  </td>
                </tr>
              ) : (
                messages.map((m) => (
                  <tr 
                    key={m.id} 
                    onClick={() => {
                      setSelectedMessage(m);
                      if (!m.isRead) updateMessageStatus(m.id, true);
                    }}
                    className={`hover:bg-brand-white/5 cursor-pointer transition-colors ${selectedMessage?.id === m.id ? 'bg-brand-white/5' : ''} ${!m.isRead ? 'bg-brand-white/5 font-bold' : 'text-brand-white/70'}`}
                  >
                    <td className="px-6 py-4 text-center">
                      {!m.isRead && <div className="w-2.5 h-2.5 rounded-full bg-brand-red mx-auto shadow-[0_0_8px_rgba(211,47,47,0.8)]"></div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`${!m.isRead ? 'text-brand-white' : ''}`}>{m.name}</div>
                      <div className="text-brand-white/50 text-xs font-normal mt-1">{m.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="truncate max-w-[200px] md:max-w-md font-normal text-brand-white/80">{m.message}</div>
                    </td>
                    <td className="px-6 py-4 text-xs whitespace-nowrap font-normal">
                      {format(new Date(m.createdAt), 'dd MMM yyyy, HH:mm')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 bg-brand-black border border-brand-white/20 rounded-sm disabled:opacity-50 text-sm hover:border-brand-white/40 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-brand-white/50">Page {page} of {totalPages}</span>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 bg-brand-black border border-brand-white/20 rounded-sm disabled:opacity-50 text-sm hover:border-brand-white/40 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Details Sidebar */}
      {selectedMessage && (
        <div className="w-full lg:w-[400px] shrink-0 bg-brand-black border border-brand-white/10 rounded-sm p-6 flex flex-col h-[calc(100vh-8rem)] sticky top-24 overflow-y-auto shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading text-xl font-bold">Message Details</h3>
            <button onClick={() => setSelectedMessage(null)} className="lg:hidden text-brand-white/50 hover:text-brand-white">
              ✕
            </button>
          </div>

          <div className="space-y-6 flex-1">
            {/* Action Bar */}
            <div className="flex gap-2">
               {selectedMessage.isRead ? (
                 <button 
                   onClick={() => updateMessageStatus(selectedMessage.id, false)}
                   className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold border border-brand-white/10 rounded-sm hover:bg-brand-white/5 transition-colors"
                 >
                   <MailQuestion size={14} /> Mark Unread
                 </button>
               ) : (
                 <button 
                   onClick={() => updateMessageStatus(selectedMessage.id, true)}
                   className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold border border-brand-white/10 rounded-sm hover:bg-brand-white/5 transition-colors"
                 >
                   <MailOpen size={14} /> Mark Read
                 </button>
               )}
            </div>

            {/* Header info */}
            <div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 mb-2">SENDER</div>
              <div className="font-bold text-xl mb-1">{selectedMessage.name}</div>
              <div className="text-sm space-y-2 text-brand-white/80 mt-3">
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-brand-white/50" /> 
                  <a href={`mailto:${selectedMessage.email}`} className="hover:text-brand-red transition-colors">{selectedMessage.email}</a>
                </p>
                {selectedMessage.phone && (
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="text-brand-white/50" /> 
                    <a href={`tel:${selectedMessage.phone}`} className="hover:text-brand-red transition-colors">{selectedMessage.phone}</a>
                  </p>
                )}
              </div>
            </div>

            <div className="h-px bg-brand-white/10 w-full" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50">RECEIVED</div>
                <div className="text-[10px] font-bold tracking-widest text-brand-white/30 flex items-center gap-1">
                  <Clock size={10} />
                  {format(new Date(selectedMessage.createdAt), "dd MMM yyyy, HH:mm")}
                </div>
              </div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 mt-4 mb-2">MESSAGE</div>
              <p className="text-sm bg-brand-charcoal p-4 rounded-sm border border-brand-white/5 whitespace-pre-wrap leading-relaxed">
                {selectedMessage.message}
              </p>
            </div>
            
            <div className="h-px bg-brand-white/10 w-full" />
            
            <div>
              <a 
                href={`mailto:${selectedMessage.email}?subject=Nashik Dhol Event Enquiry&body=Hi ${selectedMessage.name},%0D%0A%0D%0A`}
                onClick={() => toast.success("Opening email client to reply")}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold bg-brand-white/5 hover:bg-brand-white/10 border border-brand-white/10 rounded-sm transition-colors uppercase tracking-widest"
              >
                Reply
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-white/10">
            <button 
              onClick={() => deleteMessage(selectedMessage.id)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-brand-red border border-brand-red/30 rounded-sm hover:bg-brand-red hover:text-brand-black transition-colors"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
