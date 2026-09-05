"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, RefreshCw, Trash2, CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";

type Booking = {
  id: string;
  bookingId: string;
  customerName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
  expectedCrowd: string;
  requirements: string | null;
  status: string;
  notificationStatus: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/bookings?page=${page}&limit=10&search=${search}&status=${statusFilter}`);
      const data = await res.json();
      if (res.ok) {
        setBookings(data.bookings);
        setTotalPages(data.pagination.pages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchBookings();
    
    // Polling every 30 seconds for new bookings
    const interval = setInterval(fetchBookings, 30000);
    return () => clearInterval(interval);
  }, [fetchBookings]);



  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchBookings();
        if (selectedBooking && selectedBooking.id === id) {
          setSelectedBooking({ ...selectedBooking, status: newStatus });
        }
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSelectedBooking(null);
        fetchBookings();
      }
    } catch (error) {
      console.error("Failed to delete booking", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "Confirmed": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "Completed": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "Cancelled": return "text-brand-red bg-brand-red/10 border-brand-red/20";
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <main className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Main List */}
        <div className={`flex-1 ${selectedBooking ? 'hidden lg:block' : 'block'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold font-heading">Bookings</h2>
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-white/50" size={16} />
                <input 
                  type="text" 
                  placeholder="Search by ID, name, phone..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full bg-brand-black border border-brand-white/20 rounded-sm pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-red transition-colors"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="bg-brand-black border border-brand-white/20 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-brand-red transition-colors appearance-none"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button 
                onClick={() => fetchBookings()}
                className="p-2 bg-brand-black border border-brand-white/20 rounded-sm hover:border-brand-white transition-colors"
              >
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          <div className="bg-brand-black border border-brand-white/10 rounded-sm overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-white/5 text-brand-white/70">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-wider text-[10px] uppercase">Booking ID</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-[10px] uppercase">Customer</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-[10px] uppercase">Event Details</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-[10px] uppercase">Date & Time</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-[10px] uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-white/10">
                {isLoading && bookings.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-brand-white/50">Loading...</td></tr>
                ) : bookings.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-brand-white/50">No bookings found.</td></tr>
                ) : (
                  bookings.map((b) => (
                    <tr 
                      key={b.id} 
                      onClick={() => setSelectedBooking(b)}
                      className={`hover:bg-brand-white/5 cursor-pointer transition-colors ${selectedBooking?.id === b.id ? 'bg-brand-white/5' : ''}`}
                    >
                      <td className="px-6 py-4 font-mono text-xs">{b.bookingId}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold">{b.customerName}</div>
                        <div className="text-brand-white/50 text-xs">{b.mobileNumber}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="capitalize">{b.eventType}</div>
                        <div className="text-brand-white/50 text-xs truncate max-w-[150px]">{b.eventLocation}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{format(new Date(b.eventDate), 'dd MMM yyyy')}</div>
                        <div className="text-brand-white/50 text-xs">{b.eventStartTime} - {b.eventEndTime}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${getStatusColor(b.status)}`}>
                          {b.status}
                        </span>
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
                className="px-4 py-2 bg-brand-black border border-brand-white/20 rounded-sm disabled:opacity-50 text-sm"
              >
                Previous
              </button>
              <span className="text-sm text-brand-white/50">Page {page} of {totalPages}</span>
              <button 
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 bg-brand-black border border-brand-white/20 rounded-sm disabled:opacity-50 text-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Details Sidebar */}
        {selectedBooking && (
          <div className="w-full lg:w-[400px] shrink-0 bg-brand-black border border-brand-white/10 rounded-sm p-6 flex flex-col h-[calc(100vh-8rem)] sticky top-24 overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-xl font-bold">Booking Details</h3>
              <button onClick={() => setSelectedBooking(null)} className="lg:hidden text-brand-white/50 hover:text-brand-white">
                ✕
              </button>
            </div>

            <div className="space-y-6 flex-1">
              {/* Status Actions */}
              <div className="bg-brand-charcoal p-4 rounded-sm border border-brand-white/10">
                <div className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 mb-3">UPDATE STATUS</div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => updateStatus(selectedBooking.id, "Pending")} className={`py-2 text-xs font-bold border rounded-sm ${selectedBooking.status === "Pending" ? "bg-yellow-500/20 border-yellow-500 text-yellow-500" : "border-brand-white/10 hover:bg-brand-white/5"}`}>Pending</button>
                  <button onClick={() => updateStatus(selectedBooking.id, "Confirmed")} className={`py-2 text-xs font-bold border rounded-sm ${selectedBooking.status === "Confirmed" ? "bg-green-500/20 border-green-500 text-green-500" : "border-brand-white/10 hover:bg-brand-white/5"}`}>Confirm</button>
                  <button onClick={() => updateStatus(selectedBooking.id, "Completed")} className={`py-2 text-xs font-bold border rounded-sm ${selectedBooking.status === "Completed" ? "bg-blue-500/20 border-blue-500 text-blue-500" : "border-brand-white/10 hover:bg-brand-white/5"}`}>Complete</button>
                  <button onClick={() => updateStatus(selectedBooking.id, "Cancelled")} className={`py-2 text-xs font-bold border rounded-sm ${selectedBooking.status === "Cancelled" ? "bg-brand-red/20 border-brand-red text-brand-red" : "border-brand-white/10 hover:bg-brand-white/5"}`}>Cancel</button>
                </div>
              </div>

              {/* Info blocks */}
              <div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 mb-1">BOOKING ID</div>
                <div className="font-mono">{selectedBooking.bookingId}</div>
                <div className="text-xs text-brand-white/40 mt-1">Received {format(new Date(selectedBooking.createdAt), "dd MMM yyyy, HH:mm")}</div>
              </div>

              <div className="h-px bg-brand-white/10 w-full" />

              <div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 mb-2">CUSTOMER INFO</div>
                <div className="font-bold text-lg mb-1">{selectedBooking.customerName}</div>
                <div className="text-sm space-y-1 text-brand-white/80">
                  <p>📞 <a href={`tel:${selectedBooking.mobileNumber}`} className="hover:text-brand-red">{selectedBooking.mobileNumber}</a></p>
                  <p>💬 <a href={`https://wa.me/${selectedBooking.whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" className="hover:text-[#25D366]">{selectedBooking.whatsappNumber}</a> (WA)</p>
                  <p>✉️ <a href={`mailto:${selectedBooking.email}`} className="hover:text-brand-red">{selectedBooking.email}</a></p>
                </div>
              </div>

              <div className="h-px bg-brand-white/10 w-full" />

              <div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 mb-2">EVENT DETAILS</div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-brand-white/50 block text-xs">Type</span>
                    <span className="capitalize">{selectedBooking.eventType}</span>
                  </div>
                  <div>
                    <span className="text-brand-white/50 block text-xs">Date & Time</span>
                    <span>{format(new Date(selectedBooking.eventDate), "EEEE, dd MMMM yyyy")}</span>
                    <br />
                    <span className="text-brand-red">{selectedBooking.eventStartTime} - {selectedBooking.eventEndTime}</span>
                  </div>
                  <div>
                    <span className="text-brand-white/50 block text-xs">Location</span>
                    <span>{selectedBooking.eventLocation}</span>
                  </div>
                  <div>
                    <span className="text-brand-white/50 block text-xs">Expected Crowd</span>
                    <span>{selectedBooking.expectedCrowd}</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-brand-white/10 w-full" />

              <div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 mb-2">REQUIREMENTS</div>
                <p className="text-sm bg-brand-charcoal p-3 rounded-sm border border-brand-white/5">
                  {selectedBooking.requirements || <span className="text-brand-white/30 italic">No additional requirements provided.</span>}
                </p>
              </div>
              
              <div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-brand-white/50 mb-2">SYSTEM</div>
                <div className="text-xs flex items-center gap-2">
                  Notification: 
                  <span className={`
                    ${selectedBooking.notificationStatus === 'sent' ? 'text-green-500' : ''}
                    ${selectedBooking.notificationStatus === 'failed' ? 'text-brand-red' : ''}
                    ${selectedBooking.notificationStatus === 'pending' ? 'text-yellow-500' : ''}
                    uppercase tracking-wider font-bold
                  `}>
                    {selectedBooking.notificationStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-brand-white/10">
              <button 
                onClick={() => deleteBooking(selectedBooking.id)}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-brand-red border border-brand-red/30 rounded-sm hover:bg-brand-red hover:text-brand-black transition-colors"
              >
                <Trash2 size={16} /> Delete Booking
              </button>
            </div>
          </div>
        )}
      </main>
  );
}
