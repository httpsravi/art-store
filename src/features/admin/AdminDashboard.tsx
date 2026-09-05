import { useState, useEffect } from "react";
import { type Artwork, type Inquiry } from "@/types/artwork";
import { fetchArtworks, fetchInquiries } from "@/services";
import { ArtworkManager } from "./ArtworkManager";
import { InquiriesList } from "./InquiriesList";
import { SecuritySettings } from "./SecuritySettings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              — Studio Dashboard
            </p>
            <h1 className="text-display text-4xl sm:text-6xl">Control Center</h1>
          </div>
          <button
            onClick={onLogout}
            className="self-start sm:self-auto text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground py-1"
          >
            Sign out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 md:mb-12 pb-6 border-b border-border/40">
          <button
            onClick={() => setActiveTab("works")}
            className={`text-xs uppercase tracking-[0.25em] pb-1 transition-all ${
              activeTab === "works"
                ? "text-foreground border-b border-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Manage Works
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`text-xs uppercase tracking-[0.25em] pb-1 relative transition-all ${
              activeTab === "inquiries"
                ? "text-foreground border-b border-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Inquiries
            {unreadCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-[9px] bg-foreground text-background font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`text-xs uppercase tracking-[0.25em] pb-1 transition-all ${
              activeTab === "settings"
                ? "text-foreground border-b border-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Security Settings
          </button>
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
