import { useState } from "react";
import { type Inquiry } from "@/types/artwork";
import { markInquiryRead, deleteInquiry } from "@/services";

export function InquiriesList({
  inquiries,
  setInquiries,
  unreadCount,
  setUnreadCount,
}: {
  inquiries: Inquiry[];
  setInquiries: (inquiries: Inquiry[]) => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
}) {
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "unread" | "read">("all");

  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryFilter === "unread") return !inq.read;
    if (inquiryFilter === "read") return inq.read;
    return true;
  });

  async function handleMarkRead(id: string) {
    const token = sessionStorage.getItem("ravitej.token") || "";
    try {
      await markInquiryRead(id, token);
      setInquiries(inquiries.map((inq) => (inq._id === id ? { ...inq, read: true } : inq)));
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to mark as read");
    }
  }

  async function handleDeleteInquiry(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    const token = sessionStorage.getItem("ravitej.token") || "";
    try {
      const inquiry = inquiries.find((inq) => inq._id === id);
      await deleteInquiry(id, token);
      setInquiries(inquiries.filter((inq) => inq._id !== id));
      if (inquiry && !inquiry.read) {
        setUnreadCount(Math.max(0, unreadCount - 1));
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to delete inquiry");
    }
  }

  return (
    <section className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-display text-3xl">Studio Inquiries ({filteredInquiries.length})</h2>

        <div className="flex flex-wrap gap-2">
          {(["all", "unread", "read"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setInquiryFilter(filter)}
              className={`px-3 py-1 text-[10px] uppercase tracking-widest border border-border ${
                inquiryFilter === filter
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {filteredInquiries.length === 0 ? (
        <div className="border border-border p-16 text-center bg-card/20 text-muted-foreground">
          No inquiries matching the selected filter.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredInquiries.map((inq) => (
            <div
              key={inq._id}
              className={`border p-6 bg-card/30 transition-all ${
                inq.read ? "border-border/40 opacity-75" : "border-foreground shadow-sm"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">
                    {new Date(inq.createdAt).toLocaleDateString()} at{" "}
                    {new Date(inq.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <h3 className="text-xl font-medium text-foreground">{inq.name}</h3>
                  <a
                    href={`mailto:${inq.email}`}
                    className="text-xs text-muted-foreground hover:text-foreground border-b border-border/50 break-all"
                  >
                    {inq.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 self-start sm:self-auto">
                  {!inq.read && (
                    <button
                      onClick={() => handleMarkRead(inq._id)}
                      className="px-3 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-widest hover:bg-foreground/80 transition-colors shrink-0"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteInquiry(inq._id)}
                    className="px-3 py-1.5 border border-border text-[10px] sm:text-xs uppercase tracking-widest hover:text-destructive hover:border-destructive/50 transition-colors shrink-0"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="border-t border-border/40 pt-4 mt-2">
                {inq.subject && (
                  <p className="text-sm font-semibold mb-2 text-foreground">
                    Subject: {inq.subject}
                  </p>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {inq.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
