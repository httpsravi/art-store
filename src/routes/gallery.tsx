import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MEDIUMS, fetchArtworks } from "@/services";
import { type Artwork } from "@/types/artwork";
import { PLACEHOLDER_WORKS } from "@/constants/placeholders";
import { ArtworkCard } from "@/components/common/ArtworkCard";

const searchSchema = z.object({
  medium: z.enum(["all", "charcoal", "paintings", "sketches"]).optional().catch("all"),
});

export const Route = createFileRoute("/gallery")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Gallery Archive // Ravitej" },
      {
        name: "description",
        content:
          "Browse original charcoal, oil paintings, and graphite sketches by Ravitej. Hand-crafted original art available worldwide.",
      },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const { medium = "all" } = Route.useSearch();
  const [works, setWorks] = useState<Artwork[]>([]);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  useEffect(() => {
    fetchArtworks(medium as "all" | "charcoal" | "paintings" | "sketches" | undefined)
      .then((data) => {
        setWorks(data.length > 0 ? data : PLACEHOLDER_WORKS);
      })
      .catch(() => {
        setWorks(PLACEHOLDER_WORKS);
      });
  }, [medium]);

  const filtered =
    medium && medium !== "all" ? works.filter((a) => a.medium === medium) : works;

  return (
    <div style={{ minHeight: "100vh", background: "var(--cp-bg)", overflowX: "hidden" }}>
      <Navbar />

      <main style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        {/* ─── HEADER ─── */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "36px 16px 0",
            position: "relative",
          }}
        >
          {/* Section Indicator Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(245,240,0,0.08)",
              border: "1px solid rgba(245,240,0,0.25)",
              padding: "4px 10px",
              marginBottom: "16px",
            }}
          >
            <span style={{ width: "6px", height: "6px", background: "var(--cp-yellow)", borderRadius: "50%", display: "inline-block" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "var(--cp-yellow)",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              ARCHIVE // COLLECTION 2049
            </span>
          </div>

          {/* Title & Description Layout */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.8rem, 10vw, 8rem)",
                textTransform: "uppercase",
                lineHeight: 0.9,
                color: "var(--cp-text)",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              ARTWORK <span style={{ color: "var(--cp-yellow)", textShadow: "0 0 30px rgba(245,240,0,0.2)" }}>GALLERY.</span>
            </h1>
            <p
              style={{
                fontSize: "13px",
                color: "var(--cp-muted)",
                lineHeight: 1.6,
                maxWidth: "540px",
                margin: 0,
              }}
            >
              Original 1-of-1 physical artworks. Each piece is signed, certificate verified, and shipped in custom archival packaging.
            </p>
          </div>

          {/* ─── MOBILE FILTER TABS & WORK COUNTER BAR ─── */}
          <div
            style={{
              borderTop: "1px solid rgba(245,240,0,0.15)",
              borderBottom: "1px solid rgba(245,240,0,0.15)",
              padding: "12px 0",
              marginBottom: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* Filter Tabs Scroll Container */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                paddingBottom: "4px",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {MEDIUMS.map((m) => {
                const active = (medium ?? "all") === m.id;
                const hovered = activeHover === m.id;
                return (
                  <Link
                    key={m.id}
                    to="/gallery"
                    search={{ medium: m.id }}
                    id={`filter-${m.id}`}
                    onMouseEnter={() => setActiveHover(m.id)}
                    onMouseLeave={() => setActiveHover(null)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "8px 14px",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                      background: active
                        ? "var(--cp-yellow)"
                        : hovered
                        ? "rgba(245,240,0,0.1)"
                        : "rgba(18,21,16,0.6)",
                      color: active ? "#0A0B09" : hovered ? "var(--cp-yellow)" : "var(--cp-muted)",
                      border: `1px solid ${active ? "var(--cp-yellow)" : "rgba(245,240,0,0.2)"}`,
                      fontWeight: active ? 700 : 400,
                    }}
                  >
                    {m.label}
                  </Link>
                );
              })}
            </div>

            {/* Total Results HUD Strip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "6px",
                borderTop: "1px dashed rgba(245,240,0,0.1)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--cp-dim)",
                }}
              >
                FILTER // {medium.toUpperCase()}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "var(--cp-muted)",
                  }}
                >
                  TOTAL:
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "16px",
                    color: "var(--cp-yellow)",
                    lineHeight: 1,
                  }}
                >
                  {String(filtered.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── ARTWORK GRID ─── */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
                border: "1px solid rgba(245,240,0,0.15)",
                background: "var(--cp-surface)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--cp-muted)",
                  marginBottom: "16px",
                }}
              >
                // NO ARTWORKS FOUND IN THIS CATEGORY.
              </p>
              <Link to="/gallery" search={{ medium: "all" }} className="cyber-btn" style={{ display: "inline-flex" }}>
                VIEW ALL WORKS →
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                gap: "16px",
              }}
            >
              {filtered.map((a, i) => (
                <ArtworkCard key={a.id} art={a} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
