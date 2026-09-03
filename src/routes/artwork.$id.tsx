import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ImageSlider } from "@/components/common/ImageSlider";
import { type Artwork } from "@/types/artwork";
import { fetchArtworkById } from "@/services";

export const Route = createFileRoute("/artwork/$id")({
  component: ArtworkDetail,
  notFoundComponent: () => (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--cp-bg)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(3rem, 10vw, 6rem)",
            textTransform: "uppercase",
            color: "var(--cp-yellow)",
            marginBottom: "16px",
          }}
        >
          NOT FOUND
        </p>
        <Link
          to="/gallery"
          className="cyber-btn-secondary"
          style={{ display: "inline-flex" }}
        >
          ← BACK TO GALLERY
        </Link>
      </div>
    </div>
  ),
});

function ArtworkDetail() {
  const { id } = Route.useParams();
  const [art, setArt] = useState<Artwork | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);

  useEffect(() => {
    setLoaded(false);
    fetchArtworkById(id)
      .then((found) => {
        setArt(found);
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setArt(null);
        setLoaded(true);
      });
  }, [id]);

  if (loaded && !art) {
    throw notFound();
  }

  if (!art) return null;

  const allImages: string[] =
    art.images && art.images.length > 0 ? art.images : art.image ? [art.image] : [];

  // Artwork number (last chars of id)
  const artNum = String(Math.abs(art.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % 999)
    .padStart(3, "0");

  return (
    <div style={{ minHeight: "100vh", background: "var(--cp-bg)" }}>
      <Navbar />

      <main style={{ paddingTop: "96px", paddingBottom: "80px" }}>
        {/* Back nav */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "24px 24px 0",
          }}
        >
          <Link
            to="/gallery"
            id="artwork-back-link"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--cp-muted)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--cp-yellow)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--cp-muted)";
            }}
          >
            ← BACK TO GALLERY
          </Link>
        </div>

        {/* Main content grid */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "32px auto 0",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* ─── LEFT: Image ─── */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
          >
            {/* Frame corner decorations */}
            <div
              style={{
                position: "absolute",
                top: "-8px",
                left: "-8px",
                width: "32px",
                height: "32px",
                borderTop: `2px solid ${imgHovered ? "var(--cp-yellow)" : "rgba(245,240,0,0.4)"}`,
                borderLeft: `2px solid ${imgHovered ? "var(--cp-yellow)" : "rgba(245,240,0,0.4)"}`,
                zIndex: 3,
                transition: "border-color 0.3s ease",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-8px",
                right: "-8px",
                width: "32px",
                height: "32px",
                borderBottom: `2px solid ${imgHovered ? "var(--cp-cyan)" : "rgba(0,229,255,0.3)"}`,
                borderRight: `2px solid ${imgHovered ? "var(--cp-cyan)" : "rgba(0,229,255,0.3)"}`,
                zIndex: 3,
                transition: "border-color 0.3s ease",
                pointerEvents: "none",
              }}
            />

            {/* Neon border on hover */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: imgHovered
                  ? "0 0 0 1px rgba(245,240,0,0.5), 0 0 40px rgba(245,240,0,0.08)"
                  : "0 0 0 1px rgba(245,240,0,0.15)",
                transition: "box-shadow 0.35s ease",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />

            <div style={{ aspectRatio: "1/1", overflow: "hidden" }}>
              <ImageSlider images={allImages} title={art.title} />
            </div>

            {/* Floating metadata badge */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                background: "rgba(12,14,10,0.85)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(245,240,0,0.25)",
                padding: "10px 16px",
                zIndex: 4,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "8px",
                  letterSpacing: "0.2em",
                  color: "var(--cp-yellow)",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                ARTWORK // {artNum}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color: "var(--cp-muted)",
                  textTransform: "uppercase",
                }}
              >
                {art.medium} · {art.year}
                {allImages.length > 1 && ` · ${allImages.length} VIEWS`}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Dossier ─── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {/* HUD identifier */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--cp-yellow)",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ width: "20px", height: "1px", background: "var(--cp-yellow)", display: "inline-block", opacity: 0.6 }} />
              ARTWORK // {artNum}
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                textTransform: "uppercase",
                lineHeight: 0.92,
                color: "var(--cp-text)",
                marginBottom: "32px",
              }}
            >
              {art.title}
            </h1>

            {/* Cyber divider */}
            <div className="cyber-divider" style={{ marginBottom: "32px" }} />

            {/* Description */}
            <p
              style={{
                fontSize: "15px",
                color: "var(--cp-muted)",
                lineHeight: 1.8,
                marginBottom: "32px",
              }}
            >
              {art.description}
            </p>

            {/* Specs table */}
            <div
              style={{
                border: "1px solid rgba(245,240,0,0.12)",
                marginBottom: "32px",
              }}
            >
              {[
                { label: "MEDIUM", value: art.medium.charAt(0).toUpperCase() + art.medium.slice(1) },
                { label: "YEAR", value: String(art.year) },
                { label: "DIMENSIONS", value: art.dimensions },
                { label: "EDITION", value: "ORIGINAL · 1 OF 1" },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr",
                    borderBottom: i < 3 ? "1px solid rgba(245,240,0,0.08)" : "none",
                    padding: "12px 16px",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--cp-muted)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      color: "var(--cp-text)",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Status badges */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "32px",
              }}
            >
              <div className="status-badge">AVAILABLE</div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  border: "1px solid rgba(0,229,255,0.3)",
                  color: "var(--cp-cyan)",
                  background: "rgba(0,229,255,0.06)",
                }}
              >
                ✓ AUTHENTICITY VERIFIED
              </div>
            </div>

            {/* Cyber divider */}
            <div className="cyber-divider" style={{ marginBottom: "24px" }} />

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: "24px",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--cp-muted)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  PRICE
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    color: "var(--cp-yellow)",
                    letterSpacing: "0.03em",
                    lineHeight: 1,
                    textShadow: "0 0 30px rgba(245,240,0,0.3)",
                  }}
                >
                  ₹{art.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Link
                to="/contact"
                search={{ subject: `Purchase: ${art.title}` }}
                id="artwork-acquire-cta"
                className="cyber-btn"
                style={{ display: "flex", justifyContent: "center" }}
              >
                ACQUIRE ARTWORK →
              </Link>
              <Link
                to="/contact"
                search={{ subject: `Question about ${art.title}` }}
                id="artwork-question-cta"
                className="cyber-btn-secondary"
                style={{ display: "flex", justifyContent: "center" }}
              >
                ASK A QUESTION
              </Link>
            </div>

            {/* Shipping note */}
            <p
              style={{
                marginTop: "20px",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--cp-dim)",
                lineHeight: 1.7,
              }}
            >
              // SHIPPED WORLDWIDE IN CUSTOM ARCHIVAL CRATE.
              <br />
              ALLOW 7–14 DAYS FOR FRAMING.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
