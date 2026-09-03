import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MEDIUMS, fetchArtworks } from "@/services";
import { type Artwork } from "@/types/artwork";
import { PLACEHOLDER_WORKS } from "@/constants/placeholders";
import { ArtworkCard } from "@/components/common/ArtworkCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ravitej // Cyberpunk Art Marketplace" },
      {
        name: "description",
        content:
          "Original futuristic charcoal, oil paintings, and graphite sketches by Ravitej. Hand-crafted original art shipped worldwide.",
      },
    ],
  }),
  component: Home,
});

const MEDIUM_META: Record<string, { index: string; tag: string; description: string }> = {
  charcoal: { index: "01", tag: "SHADOW // SOLID", description: "Raw carbon marks on archival paper. Pure physical texture." },
  paintings: { index: "02", tag: "PIGMENT // PULSE", description: "Heavy oil on canvas. Vibrant chaos sculpted into form." },
  sketches: { index: "03", tag: "VECTOR // DRAFT", description: "Graphite velocity studies. Raw energy in high contrast." },
};

function Home() {
  const [works, setWorks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetchArtworks()
      .then((data) => {
        setWorks(data.length > 0 ? data : PLACEHOLDER_WORKS);
      })
      .catch(() => {
        setWorks(PLACEHOLDER_WORKS);
      });
  }, []);

  const featured = works.slice(0, 6);

  return (
    <div style={{ minHeight: "100vh", background: "var(--cp-bg)", overflowX: "hidden" }}>
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO SECTION — High-Tech Poster UI
          ═══════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          paddingTop: "90px",
          paddingBottom: "40px",
        }}
      >
        {/* Background Cyber Grid */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(245,240,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,0,0.05) 1px, transparent 1px)",
            backgroundSize: "clamp(40px, 8vw, 80px) clamp(40px, 8vw, 80px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Dynamic Glow Orbs for Mobile Depth */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "20%",
            left: "-10%",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(245,240,0,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-10%",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Corner HUD Brackets */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "100px",
            left: "16px",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderTop: "2px solid var(--cp-yellow)",
              borderLeft: "2px solid var(--cp-yellow)",
            }}
          />
        </div>
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "40px",
            right: "16px",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderBottom: "2px solid var(--cp-cyan)",
              borderRight: "2px solid var(--cp-cyan)",
            }}
          />
        </div>

        {/* HUD Telemetry Labels (Desktop & Mobile view) */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "100px",
            right: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-end",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {["SYS//RAVI.DAVINCI", "DROP_2049", "ONLINE // 100%"].map((label) => (
            <span
              key={label}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "8px",
                letterSpacing: "0.2em",
                color: "var(--cp-dim)",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Main Hero Container */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 20px",
            width: "100%",
          }}
        >
          {/* Top Ticker / Category Pills */}
          <div
            className="animate-fade-up"
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "24px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                background: "var(--cp-yellow)",
                color: "#0A0B09",
                padding: "3px 8px",
                fontWeight: 700,
                display: "inline-block",
              }}
            >
              ORIGINAL ART
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--cp-cyan)",
                border: "1px solid rgba(0,229,255,0.4)",
                padding: "3px 8px",
                background: "rgba(0,229,255,0.05)",
                display: "inline-block",
              }}
            >
              WORLDWIDE SHIPPING
            </span>
          </div>

          {/* UNIQUE ORBITRON DISPLAY HEADLINE */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <h1
              className="animate-fade-up delay-100"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.8rem, 11vw, 11rem)",
                lineHeight: 0.9,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                color: "var(--cp-text)",
                margin: 0,
                wordBreak: "break-word",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "var(--cp-text)",
                  textShadow: "0 0 30px rgba(255,255,255,0.1)",
                }}
              >
                RAVI
              </span>
              <span
                style={{
                  display: "block",
                  color: "var(--cp-yellow)",
                  textShadow: "0 0 50px rgba(245,240,0,0.35)",
                }}
              >
                DAVINCI.
              </span>
            </h1>
          </div>

          {/* Sub Content — Grid for Mobile & Desktop */}
          <div
            className="animate-fade-up delay-300"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "24px",
              alignItems: "end",
              marginTop: "32px",
            }}
          >
            {/* Description */}
            <div
              style={{
                background: "rgba(18,21,16,0.8)",
                backdropFilter: "blur(10px)",
                borderLeft: "3px solid var(--cp-yellow)",
                padding: "16px 20px",
                borderTop: "1px solid rgba(245,240,0,0.15)",
                borderRight: "1px solid rgba(245,240,0,0.15)",
                borderBottom: "1px solid rgba(245,240,0,0.15)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--cp-yellow)",
                  marginBottom: "8px",
                  fontWeight: 700,
                }}
              >
                // ARTWORK DIRECTIVE
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--cp-muted)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Raw charcoal, heavy acrylics, and graphite studies. Hand-drawn physical pieces infused with rebellious cyber aesthetics.
              </p>
            </div>

            {/* Mobile & Desktop Action Buttons */}
            <div
              className="animate-fade-up delay-500"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%",
              }}
            >
              <Link
                to="/gallery"
                id="hero-gallery-cta"
                className="cyber-btn"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: "12px",
                  padding: "16px 24px",
                  textAlign: "center",
                }}
              >
                EXPLORE GALLERY →
              </Link>
              <Link
                to="/contact"
                id="hero-commission-cta"
                className="cyber-btn-secondary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: "11px",
                  padding: "14px 24px",
                  textAlign: "center",
                }}
              >
                COMMISSION A CUSTOM PIECE
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="animate-float"
          style={{
            position: "relative",
            marginTop: "40px",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "8px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--cp-dim)",
            }}
          >
            SCROLL DOWN
          </span>
          <div
            style={{
              width: "1px",
              height: "24px",
              background: "linear-gradient(180deg, var(--cp-yellow), transparent)",
            }}
          />
        </div>

        {/* Bottom Accent Bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, var(--cp-yellow), var(--cp-cyan), var(--cp-green))",
            zIndex: 5,
          }}
        />
      </section>

      {/* ═══════════════════════════════════════
          CATEGORIES SECTION — Mobile Optimized Stack
          ═══════════════════════════════════════ */}
      <section
        id="categories"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 20px",
        }}
      >
        <div style={{ marginBottom: "40px" }}>
          <div className="section-label" style={{ marginBottom: "12px" }}>
            MEDIUM ARCHIVE // SELECTION
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 7vw, 5rem)",
              textTransform: "uppercase",
              lineHeight: 0.95,
              color: "var(--cp-text)",
              margin: 0,
            }}
          >
            DISCIPLINE & <span style={{ color: "var(--cp-yellow)" }}>MEDIUM.</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "16px",
          }}
        >
          {MEDIUMS.filter((m) => m.id !== "all").map((m) => {
            const meta = MEDIUM_META[m.id] ?? {
              index: "00",
              tag: "MEDIUM",
              description: "",
            };
            const count = works.filter((a) => a.medium === m.id).length;
            return (
              <MediumCard
                key={m.id}
                to="/gallery"
                search={{ medium: m.id }}
                index={meta.index}
                tag={meta.tag}
                label={m.label}
                description={meta.description}
                count={count}
              />
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED WORKS — Collectible Grid
          ═══════════════════════════════════════ */}
      <section
        id="featured-works"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 20px 80px",
        }}
      >
        <div className="yellow-strip" style={{ marginBottom: "48px" }} />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "36px",
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: "8px" }}>
              DROP // 07
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                textTransform: "uppercase",
                lineHeight: 0.95,
                color: "var(--cp-text)",
                margin: 0,
              }}
            >
              FEATURED <span style={{ color: "var(--cp-yellow)" }}>WORKS.</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            id="featured-see-all"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--cp-yellow)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: "1px solid rgba(245,240,0,0.3)",
              paddingBottom: "4px",
            }}
          >
            VIEW ALL ARTWORKS →
          </Link>
        </div>

        {/* Artwork Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "20px",
          }}
        >
          {featured.map((a, i) => (
            <ArtworkCard key={a.id} art={a} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          COMMISSION CTA — Interactive Cyber Box
          ═══════════════════════════════════════ */}
      <section
        id="commission-cta"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 20px 100px",
        }}
      >
        <div
          style={{
            position: "relative",
            border: "1px solid rgba(245,240,0,0.3)",
            background: "rgba(18,21,16,0.95)",
            padding: "clamp(32px, 6vw, 64px) clamp(20px, 5vw, 48px)",
            overflow: "hidden",
          }}
        >
          {/* Brackets */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "24px",
              height: "24px",
              borderTop: "2px solid var(--cp-yellow)",
              borderLeft: "2px solid var(--cp-yellow)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "24px",
              height: "24px",
              borderBottom: "2px solid var(--cp-cyan)",
              borderRight: "2px solid var(--cp-cyan)",
            }}
          />

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--cp-yellow)",
              marginBottom: "16px",
            }}
          >
            // CUSTOM COMMISSION PROTOCOL
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 6vw, 4.5rem)",
              textTransform: "uppercase",
              lineHeight: 0.95,
              color: "var(--cp-text)",
              marginBottom: "20px",
            }}
          >
            WANT A <span style={{ color: "var(--cp-yellow)" }}>CUSTOM</span> PIECE?
          </h2>

          <p
            style={{
              fontSize: "14px",
              color: "var(--cp-muted)",
              lineHeight: 1.7,
              maxWidth: "540px",
              marginBottom: "32px",
            }}
          >
            Direct commissions are currently open for custom canvas portraits, anime art, and large charcoal pieces.
          </p>

          <Link
            to="/contact"
            id="commission-start-cta"
            className="cyber-btn"
            style={{
              display: "inline-flex",
              justifyContent: "center",
              width: "100%",
              maxWidth: "320px",
              fontSize: "11px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            INITIATE COMMISSION →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ── MEDIUM CARD COMPONENT ── */
function MediumCard({
  to,
  search,
  index,
  tag,
  label,
  description,
  count,
}: {
  to: string;
  search: Record<string, string>;
  index: string;
  tag: string;
  label: string;
  description: string;
  count: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={to}
      search={search}
      id={`medium-card-${label.toLowerCase()}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          background: hovered ? "rgba(24,28,20,0.95)" : "var(--cp-surface)",
          border: `1px solid ${hovered ? "var(--cp-yellow)" : "rgba(245,240,0,0.2)"}`,
          padding: "28px 24px",
          minHeight: "220px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "all 0.3s ease",
          boxShadow: hovered ? "0 0 25px rgba(245,240,0,0.12)" : "none",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "var(--cp-yellow)",
              fontWeight: 700,
            }}
          >
            {index} // {tag}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "8px",
              letterSpacing: "0.15em",
              color: "var(--cp-dim)",
              border: "1px solid rgba(245,240,0,0.15)",
              padding: "2px 6px",
            }}
          >
            {count} {count === 1 ? "PIECE" : "PIECES"}
          </span>
        </div>

        <div style={{ marginTop: "24px" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              textTransform: "uppercase",
              color: hovered ? "var(--cp-yellow)" : "var(--cp-text)",
              margin: 0,
              lineHeight: 1,
              transition: "color 0.2s ease",
            }}
          >
            {label}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--cp-muted)",
              marginTop: "8px",
              marginBottom: "16px",
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "var(--cp-cyan)",
              textTransform: "uppercase",
              display: "inline-block",
            }}
          >
            BROWSE COLLECTION →
          </span>
        </div>
      </div>
    </Link>
  );
}
