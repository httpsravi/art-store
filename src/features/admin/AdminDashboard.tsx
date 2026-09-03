import { useState, useEffect } from "react";
import { type Artwork, type Inquiry } from "@/types/artwork";
import { fetchArtworks, fetchInquiries } from "@/services";
import { ArtworkManager } from "./ArtworkManager";
import { InquiriesList } from "./InquiriesList";
import { SecuritySettings } from "./SecuritySettings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const TABS = [
  { id: "works" as const, label: "MANAGE WORKS" },
  { id: "inquiries" as const, label: "INQUIRIES" },
  { id: "settings" as const, label: "SECURITY" },
];

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [works, setWorks] = useState<Artwork[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"works" | "inquiries" | "settings">("works");

  useEffect(() => {
    const token = sessionStorage.getItem("ravitej.token") || "";
    loadDashboardData(token);
  }, []);

  const loadDashboardData = async (token: string) => {
    try {
      const artData = await fetchArtworks();
      setWorks(artData);

      const inqData = await fetchInquiries(token);
      setInquiries(inqData.inquiries);
      setUnreadCount(inqData.unreadCount);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cp-bg)" }}>
      <Navbar />
      <main
        style={{
          paddingTop: "128px",
          paddingBottom: "80px",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "128px 24px 80px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: "12px" }}>
              // STUDIO DASHBOARD
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                textTransform: "uppercase",
                color: "var(--cp-text)",
                lineHeight: 0.95,
              }}
            >
              CONTROL
              <br />
              <span style={{ color: "var(--cp-yellow)" }}>CENTER</span>
            </h1>
          </div>
          <button
            onClick={onLogout}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--cp-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 0",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--cp-yellow)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "var(--cp-muted)";
            }}
          >
            SIGN OUT →
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "4px",
            marginBottom: "48px",
            paddingBottom: "24px",
            borderBottom: "1px solid rgba(245,240,0,0.15)",
          }}
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "8px 16px",
                  background: active ? "var(--cp-yellow)" : "transparent",
                  color: active ? "#0A0B09" : "var(--cp-muted)",
                  border: `1px solid ${active ? "var(--cp-yellow)" : "rgba(245,240,0,0.2)"}`,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
              >
                {tab.label}
                {tab.id === "inquiries" && unreadCount > 0 && (
                  <span
                    style={{
                      marginLeft: "8px",
                      padding: "1px 6px",
                      fontSize: "9px",
                      fontWeight: 700,
                      background: active ? "#0A0B09" : "var(--cp-yellow)",
                      color: active ? "var(--cp-yellow)" : "#0A0B09",
                      borderRadius: "2px",
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {activeTab === "works" && <ArtworkManager works={works} setWorks={setWorks} />}
        {activeTab === "inquiries" && (
          <InquiriesList
            inquiries={inquiries}
            setInquiries={setInquiries}
            unreadCount={unreadCount}
            setUnreadCount={setUnreadCount}
          />
        )}
        {activeTab === "settings" && <SecuritySettings />}
      </main>
      <Footer />
    </div>
  );
}
