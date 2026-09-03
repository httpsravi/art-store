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
    <section style={{ maxWidth: "800px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            textTransform: "uppercase",
            color: "var(--cp-text)",
          }}
        >
          INQUIRIES ({filteredInquiries.length})
        </h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {(["all", "unread", "read"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setInquiryFilter(filter)}
              style={{
                padding: "6px 12px",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: `1px solid ${inquiryFilter === filter ? "var(--cp-yellow)" : "rgba(245,240,0,0.2)"}`,
                background: inquiryFilter === filter ? "var(--cp-yellow)" : "transparent",
                color: inquiryFilter === filter ? "#0A0B09" : "var(--cp-muted)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {filteredInquiries.length === 0 ? (
        <div
          style={{
            border: "1px solid rgba(245,240,0,0.12)",
            padding: "64px",
            textAlign: "center",
            background: "var(--cp-surface)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--cp-muted)",
          }}
        >
          NO INQUIRIES MATCHING FILTER.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {filteredInquiries.map((inq) => (
            <div
              key={inq._id}
              style={{
                border: `1px solid ${inq.read ? "rgba(245,240,0,0.1)" : "var(--cp-yellow)"}`,
                padding: "24px",
                background: "var(--cp-surface)",
                transition: "all 0.2s ease",
                opacity: inq.read ? 0.75 : 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "8px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--cp-dim)",
                    }}
                  >
                    {new Date(inq.createdAt).toLocaleDateString()} at{" "}
                    {new Date(inq.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "18px",
                      textTransform: "uppercase",
                      color: "var(--cp-text)",
                      marginTop: "4px",
                    }}
                  >
                    {inq.name}
                  </h3>
                  <a
                    href={`mailto:${inq.email}`}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      color: "var(--cp-cyan)",
                      textDecoration: "none",
                      wordBreak: "break-all",
                    }}
                  >
                    {inq.email}
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {!inq.read && (
                    <button
                      onClick={() => handleMarkRead(inq._id)}
                      className="cyber-btn"
                      style={{
                        fontSize: "9px",
                        padding: "6px 12px",
                        letterSpacing: "0.15em",
                      }}
                    >
                      MARK READ
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteInquiry(inq._id)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      padding: "6px 12px",
                      border: "1px solid rgba(245,240,0,0.15)",
                      background: "none",
                      color: "var(--cp-muted)",
                      cursor: "pointer",
                      transition: "color 0.2s ease, border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--cp-red)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--cp-red)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--cp-muted)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,240,0,0.15)";
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(245,240,0,0.08)",
                  paddingTop: "16px",
                  marginTop: "8px",
                }}
              >
                {inq.subject && (
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--cp-text)",
                      marginBottom: "8px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    SUBJECT: {inq.subject}
                  </p>
                )}
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--cp-muted)",
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                  }}
                >
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
