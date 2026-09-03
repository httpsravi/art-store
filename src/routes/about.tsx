import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import artistPortrait from "@/assets/artist_portrait.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Artist Profile // Ravitej" },
      {
        name: "description",
        content: "About Ravitej — 19-year-old artist with over 7 years of experience in charcoal, oil, and graphite.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cp-bg)", overflowX: "hidden" }}>
      <Navbar />

      <main
        style={{
          paddingTop: "80px",
          paddingBottom: "80px",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 16px 80px",
        }}
      >
        {/* ─── HEADER ─── */}
        <div style={{ marginBottom: "36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(245,240,0,0.08)",
              border: "1px solid rgba(245,240,0,0.25)",
              padding: "4px 10px",
              marginBottom: "12px",
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
              ARTIST // DOSSIER
            </span>
          </div>

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
            RAVITEJ <span style={{ color: "var(--cp-yellow)", textShadow: "0 0 30px rgba(245,240,0,0.2)" }}>DAVINCI.</span>
          </h1>
        </div>

        {/* ─── PORTRAIT ON TOP FOR MOBILE / BALANCED ON DESKTOP ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "36px",
            alignItems: "start",
            marginBottom: "64px",
          }}
        >
          {/* Portrait Container — Smaller Compact Size */}
          <div
            style={{
              position: "relative",
              maxWidth: "220px",
              margin: "0 auto 12px",
              width: "100%",
            }}
          >
            {/* HUD Corner Brackets */}
            <div
              style={{
                position: "absolute",
                top: "-6px",
                left: "-6px",
                width: "18px",
                height: "18px",
                borderTop: "2px solid var(--cp-yellow)",
                borderLeft: "2px solid var(--cp-yellow)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-6px",
                right: "-6px",
                width: "18px",
                height: "18px",
                borderBottom: "2px solid var(--cp-cyan)",
                borderRight: "2px solid var(--cp-cyan)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />

            {/* Portrait Image Frame */}
            <div
              style={{
                aspectRatio: "4/5",
                maxHeight: "250px",
                overflow: "hidden",
                border: "1px solid rgba(245,240,0,0.3)",
                background: "var(--cp-surface)",
                position: "relative",
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={artistPortrait}
                alt="Ravitej — artist portrait"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "40%",
                  background: "linear-gradient(to top, rgba(10,12,8,0.85), transparent)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  right: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "8px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  RAVITEJ · INDIA
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "8px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--cp-yellow)",
                    fontWeight: 700,
                  }}
                >
                  VERIFIED // 001
                </span>
              </div>
            </div>
          </div>

          {/* Artist Bio & Technical Readout */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--cp-yellow)",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ width: "16px", height: "1px", background: "var(--cp-yellow)", display: "inline-block", opacity: 0.6 }} />
              ARTIST STATEMENT
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              <p style={{ fontSize: "14px", color: "var(--cp-text)", lineHeight: 1.7, margin: 0 }}>
                Hey, I'm Ravitej — a 19-year-old artist with over 7 years of dedicated practice bringing ideas to life through charcoal, graphite, and oil paint.
              </p>
              <p style={{ fontSize: "13.5px", color: "var(--cp-muted)", lineHeight: 1.7, margin: 0 }}>
                What began as an obsessive childhood hobby evolved into a global studio. My custom paintings and garments have reached collectors across India and the USA.
              </p>
              <p style={{ fontSize: "13.5px", color: "var(--cp-muted)", lineHeight: 1.7, margin: 0 }}>
                My work balances raw charcoal marks with fine detail — portraits, anime icons, and customized pieces infused with rebellious cyber energy.
              </p>
            </div>

            {/* Mobile Professional Telemetry Box */}
            <div
              style={{
                border: "1px solid rgba(245,240,0,0.2)",
                background: "rgba(18,21,16,0.85)",
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid rgba(245,240,0,0.12)",
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
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
                  PROFILE // TELEMETRY
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "8px",
                    color: "var(--cp-green)",
                    letterSpacing: "0.15em",
                  }}
                >
                  ● ONLINE
                </span>
              </div>

              {[
                { key: "STUDIO", value: "Karnataka, India" },
                { key: "PRACTICE", value: "7+ Years (Est. 2017)" },
                { key: "SHIPPING", value: "Worldwide Archival Crates" },
                { key: "COMMISSIONS", value: "OPEN FOR INQUIRIES", link: "/contact", isHighlight: true },
                { key: "MEDIUMS", value: "Charcoal · Oil · Graphite" },
              ].map(({ key, value, link, isHighlight }, idx) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    borderBottom: idx < 4 ? "1px solid rgba(245,240,0,0.08)" : "none",
                    padding: "10px 14px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "8.5px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--cp-dim)",
                    }}
                  >
                    {key}
                  </span>
                  {link ? (
                    <Link
                      to={link as "/contact"}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        color: isHighlight ? "var(--cp-green)" : "var(--cp-yellow)",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      {value} →
                    </Link>
                  ) : (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        color: "var(--cp-text)",
                      }}
                    >
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── CYBER DIVIDER ─── */}
        <div className="yellow-strip" style={{ marginBottom: "48px" }} />

        {/* ─── COMMISSION CTA ─── */}
        <div
          style={{
            border: "1px solid rgba(245,240,0,0.25)",
            background: "var(--cp-surface)",
            padding: "32px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: "8px" }}>
              COMMISSION PROTOCOL // DIRECT INQUIRY
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
                textTransform: "uppercase",
                lineHeight: 0.95,
                color: "var(--cp-text)",
                margin: 0,
              }}
            >
              READY TO COMMISSION <span style={{ color: "var(--cp-yellow)" }}>A PIECE?</span>
            </h2>
          </div>
          <Link
            to="/contact"
            id="about-commission-cta"
            className="cyber-btn"
            style={{
              width: "100%",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "11px",
              padding: "16px",
            }}
          >
            START COMMISSION INQUIRY →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
