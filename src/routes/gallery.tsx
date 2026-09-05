import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MEDIUMS } from "@/services";
import { ArtworkCard } from "@/components/common/ArtworkCard";
import { useArtworksQuery } from "@/hooks/useArtworks";
import { gsap } from "gsap";

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
  const { data: works = [], isLoading, error: queryError, refetch } = useArtworksQuery(medium);
  const fetchError = queryError ? queryError.message : null;
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const filterStripRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Gallery Header GSAP Entrance
  useEffect(() => {
    if (typeof window === "undefined" || !headerRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".gallery-header-item",
        { opacity: 0, y: 30, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.8, stagger: 0.12, ease: "back.out(1.4)" }
      ).fromTo(
        filterStripRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Grid Refilter Stagger Animation on Medium Change
  useEffect(() => {
    if (typeof window === "undefined" || !gridRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (gridRef.current && gridRef.current.children.length > 0) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: "back.out(1.5)",
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, [medium, works]);

  const filtered =
    medium && medium !== "all" ? works.filter((a) => a.medium === medium) : works;

  return (
    <div style={{ minHeight: "100vh", background: "var(--cp-bg)", overflowX: "hidden" }}>
      <Navbar />

      <main style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        {/* ─── HEADER ─── */}
        <div
          ref={headerRef}
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "36px 16px 0",
            position: "relative",
          }}
        >
          {/* Section Indicator Badge */}
          <div
            className="gallery-header-item"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#F5E000",
              border: "2px solid #0B0C10",
              boxShadow: "3px 3px 0px #0B0C10",
              padding: "6px 14px",
              marginBottom: "20px",
            }}
          >
            <span style={{ width: "8px", height: "8px", background: "#0B0C10", borderRadius: "50%", display: "inline-block" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "#0B0C10",
                textTransform: "uppercase",
                fontWeight: 900,
              }}
            >
              ARCHIVE // COLLECTION 2049
            </span>
          </div>

          {/* Title & Description Layout */}
          <div
            className="gallery-header-item"
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
                color: "#0B0C10",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              ARTWORK <span style={{ color: "#E6B800" }}>GALLERY.</span>
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#4A4D58",
                lineHeight: 1.6,
                maxWidth: "540px",
                margin: 0,
                fontWeight: 500,
              }}
            >
              Original 1-of-1 physical artworks. Each piece is signed, certificate verified, and shipped in custom archival packaging.
            </p>
          </div>

          {/* ─── MOBILE FILTER TABS & WORK COUNTER BAR ─── */}
          <div
            ref={filterStripRef}
            style={{
              borderTop: "2px solid #0B0C10",
              borderBottom: "2px solid #0B0C10",
              padding: "16px 0",
              marginBottom: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              background: "#FFFFFF",
            }}
          >
            {/* Filter Tabs Scroll Container */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
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
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "10px 18px",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                      background: active
                        ? "#0B0C10"
                        : hovered
                        ? "#F5E000"
                        : "#F1F3F9",
                      color: active ? "#FFFFFF" : "#0B0C10",
                      border: "2px solid #0B0C10",
                      boxShadow: active ? "4px 4px 0px #E6B800" : "none",
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
                paddingTop: "10px",
                borderTop: "1px dashed rgba(11,12,16,0.15)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#4A4D58",
                }}
              >
                FILTER // {medium.toUpperCase()}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "#4A4D58",
                  }}
                >
                  TOTAL:
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "18px",
                    color: "#0B0C10",
                    background: "#F5E000",
                    padding: "2px 8px",
                    border: "1px solid #0B0C10",
                    lineHeight: 1,
                  }}
                >
                  {String(filtered.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── ARTWORK GRID / LOADING / ERROR / EMPTY ─── */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          {isLoading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                gap: "20px",
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    border: "2px solid #0B0C10",
                    padding: "16px",
                    aspectRatio: "4/5",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(90deg, #F8F9FC 0%, #E4E7F0 50%, #F8F9FC 100%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 1.5s infinite",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      zIndex: 2,
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: "#0B0C10",
                      fontWeight: 800,
                    }}
                  >
                    // LOADING ARCHIVE #{idx}...
                  </div>
                </div>
              ))}
            </div>
          ) : fetchError ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
                border: "2px solid #0B0C10",
                background: "#FFFFFF",
                boxShadow: "6px 6px 0px #0B0C10",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#E60039",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                // ERROR LOADING GALLERY: {fetchError}
              </p>
              <button
                onClick={() => refetch()}
                className="cyber-btn"
                style={{ display: "inline-flex" }}
              >
                RETRY ARCHIVE FETCH →
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
                border: "2px solid #0B0C10",
                background: "#FFFFFF",
                boxShadow: "6px 6px 0px #0B0C10",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#0B0C10",
                  marginBottom: "20px",
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
              ref={gridRef}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                gap: "20px",
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
