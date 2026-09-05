import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MEDIUMS, fetchArtworks } from "@/services";
import { type Artwork } from "@/types/artwork";
import { PLACEHOLDER_WORKS } from "@/constants/placeholders";
import { ArtworkCard } from "@/components/common/ArtworkCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

  const heroRef = useRef<HTMLDivElement>(null);
  const heroPillsRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const heroDescRef = useRef<HTMLDivElement>(null);
  const heroBtnsRef = useRef<HTMLDivElement>(null);
  const heroHudRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const spinRingRef = useRef<HTMLDivElement>(null);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const categoriesGridRef = useRef<HTMLDivElement>(null);

  const featuredWorksRef = useRef<HTMLDivElement>(null);
  const commissionCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchArtworks()
      .then((data) => {
        setWorks(data.length > 0 ? data : PLACEHOLDER_WORKS);
      })
      .catch(() => {
        setWorks(PLACEHOLDER_WORKS);
      });
  }, []);

  // Coordinated CRAZY GSAP Hero Entrance Timeline & ScrollTriggers
  useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. CRAZY Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        heroPillsRef.current,
        { opacity: 0, y: -30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      )
        .fromTo(
          line1Ref.current,
          { opacity: 0, y: 80, skewX: -12, scale: 1.2 },
          { opacity: 1, y: 0, skewX: 0, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.5)" },
          "-=0.3"
        )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 80, skewX: 12, scale: 1.2 },
          { opacity: 1, y: 0, skewX: 0, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.5)" },
          "-=0.6"
        )
        .fromTo(
          heroDescRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          heroBtnsRef.current?.children ? Array.from(heroBtnsRef.current.children) : heroBtnsRef.current,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
          "-=0.4"
        )
        .fromTo(
          heroHudRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.8 },
          "-=0.5"
        );

      // Continuous Slow Rotation Ring
      if (spinRingRef.current) {
        gsap.to(spinRingRef.current, {
          rotation: 360,
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }

      // Ambient Glow Orbs Yoyo Floating Motion
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          y: 40,
          x: 20,
          scale: 1.15,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          y: -40,
          x: -20,
          scale: 1.2,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 2. Categories ScrollTrigger
      if (categoriesRef.current) {
        gsap.fromTo(
          categoriesRef.current.querySelector(".section-header-box"),
          { opacity: 0, y: 40, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (categoriesGridRef.current) {
        gsap.fromTo(
          categoriesGridRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: categoriesGridRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 3. Featured Works Header ScrollTrigger
      if (featuredWorksRef.current) {
        gsap.fromTo(
          featuredWorksRef.current.querySelector(".featured-header"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuredWorksRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 4. Commission CTA ScrollTrigger Box Expansion
      if (commissionCtaRef.current) {
        gsap.fromTo(
          commissionCtaRef.current,
          { opacity: 0, scale: 0.9, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: {
              trigger: commissionCtaRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const featured = works.slice(0, 6);

  return (
    <div style={{ minHeight: "100vh", background: "var(--cp-bg)", overflowX: "hidden" }}>
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO SECTION — Vibrant White Poster UI
          ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
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
          background: "#F8F9FC",
        }}
      >
        {/* Background Cyber Grid */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(11,12,16,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,12,16,0.04) 1px, transparent 1px)",
            backgroundSize: "clamp(40px, 8vw, 80px) clamp(40px, 8vw, 80px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Dynamic Glow Orbs for Depth */}
        <div
          ref={orb1Ref}
          aria-hidden
          style={{
            position: "absolute",
            top: "15%",
            left: "-5%",
            width: "450px",
            height: "450px",
            background: "radial-gradient(circle, rgba(245,224,0,0.25) 0%, transparent 70%)",
            filter: "blur(70px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          ref={orb2Ref}
          aria-hidden
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-5%",
            width: "450px",
            height: "450px",
            background: "radial-gradient(circle, rgba(0,229,255,0.22) 0%, transparent 70%)",
            filter: "blur(70px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Spinning Cyber Badge Ring Background */}
        <div
          ref={spinRingRef}
          aria-hidden
          style={{
            position: "absolute",
            top: "20%",
            right: "5%",
            width: "320px",
            height: "320px",
            border: "2px dashed rgba(11,12,16,0.12)",
            borderRadius: "50%",
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
            left: "20px",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderTop: "3px solid #0B0C10",
              borderLeft: "3px solid #0B0C10",
            }}
          />
        </div>
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "40px",
            right: "20px",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderBottom: "3px solid #0B0C10",
              borderRight: "3px solid #0B0C10",
            }}
          />
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
            ref={heroPillsRef}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "24px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                background: "#F5E000",
                color: "#0B0C10",
                padding: "4px 10px",
                fontWeight: 900,
                border: "1px solid #0B0C10",
                boxShadow: "3px 3px 0px #0B0C10",
                display: "inline-block",
              }}
            >
              ORIGINAL ARTWORK
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#0B0C10",
                border: "1px solid #0B0C10",
                padding: "4px 10px",
                background: "#FFFFFF",
                fontWeight: 800,
                boxShadow: "3px 3px 0px #00B8D4",
                display: "inline-block",
              }}
            >
              WORLDWIDE EXPRESS SHIPPING
            </span>
          </div>

          {/* UNIQUE ORBITRON DISPLAY HEADLINE */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(3.2rem, 12vw, 11rem)",
                lineHeight: 0.88,
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                color: "#0B0C10",
                margin: 0,
                wordBreak: "break-word",
              }}
            >
              <span
                ref={line1Ref}
                style={{
                  display: "block",
                  color: "#0B0C10",
                  textShadow: "4px 4px 0px #F5E000",
                }}
              >
                RAVI
              </span>
              <span
                ref={line2Ref}
                style={{
                  display: "block",
                  color: "#0B0C10",
                  background: "linear-gradient(90deg, #0B0C10 0%, #333 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(4px 4px 0px #00B8D4)",
                }}
              >
                DAVINCI.
              </span>
            </h1>
          </div>

          {/* Sub Content — Grid for Mobile & Desktop */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "28px",
              alignItems: "end",
              marginTop: "36px",
            }}
          >
            {/* Description */}
            <div
              ref={heroDescRef}
              style={{
                background: "#FFFFFF",
                border: "2px solid #0B0C10",
                borderLeft: "6px solid #F5E000",
                padding: "20px 24px",
                boxShadow: "6px 6px 0px rgba(11,12,16,0.1)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#0B0C10",
                  marginBottom: "8px",
                  fontWeight: 900,
                }}
              >
                // ARTWORK DIRECTIVE
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#4A4D58",
                  lineHeight: 1.7,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Raw charcoal, heavy acrylics, and graphite studies. Hand-drawn physical pieces infused with rebellious cyber aesthetics.
              </p>
            </div>

            {/* Mobile & Desktop Action Buttons */}
            <div
              ref={heroBtnsRef}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                width: "100%",
              }}
            >
              <Link
                to="/gallery"
                id="hero-gallery-cta"
                className="cyber-btn"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.04, duration: 0.25, ease: "back.out(2)" });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: "power2.out" });
                }}
                onMouseDown={(e) => {
                  gsap.to(e.currentTarget, { scale: 0.96, duration: 0.1 });
                }}
                onMouseUp={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.04, duration: 0.15 });
                }}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: "12px",
                  padding: "18px 24px",
                  textAlign: "center",
                }}
              >
                EXPLORE GALLERY →
              </Link>
              <Link
                to="/contact"
                id="hero-commission-cta"
                className="cyber-btn-secondary"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.04, duration: 0.25, ease: "back.out(2)" });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: "power2.out" });
                }}
                onMouseDown={(e) => {
                  gsap.to(e.currentTarget, { scale: 0.96, duration: 0.1 });
                }}
                onMouseUp={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.04, duration: 0.15 });
                }}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: "11px",
                  padding: "16px 24px",
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
          style={{
            position: "relative",
            marginTop: "48px",
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
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#0B0C10",
            }}
          >
            SCROLL DOWN
          </span>
          <div
            style={{
              width: "2px",
              height: "28px",
              background: "linear-gradient(180deg, #0B0C10, transparent)",
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
            height: "4px",
            background: "linear-gradient(90deg, #E6B800, #00B8D4, #FF0055)",
            zIndex: 5,
          }}
        />
      </section>

      {/* ═══════════════════════════════════════
          CATEGORIES SECTION — Mobile Optimized Stack
          ═══════════════════════════════════════ */}
      <section
        ref={categoriesRef}
        id="categories"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "80px 20px",
        }}
      >
        <div className="section-header-box" style={{ marginBottom: "40px" }}>
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
              color: "#0B0C10",
              margin: 0,
            }}
          >
            DISCIPLINE & <span style={{ color: "#E6B800" }}>MEDIUM.</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={categoriesGridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "20px",
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
        ref={featuredWorksRef}
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
          className="featured-header"
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
                color: "#0B0C10",
                margin: 0,
              }}
            >
              FEATURED <span style={{ color: "#E6B800" }}>WORKS.</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            id="featured-see-all"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { x: 6, duration: 0.2, ease: "power2.out" });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { x: 0, duration: 0.2, ease: "power2.out" });
            }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#0B0C10",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: "2px solid #0B0C10",
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
          ref={commissionCtaRef}
          style={{
            position: "relative",
            border: "2px solid #0B0C10",
            background: "#FFFFFF",
            padding: "clamp(32px, 6vw, 64px) clamp(20px, 5vw, 48px)",
            overflow: "hidden",
            boxShadow: "8px 8px 0px #0B0C10",
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
              borderTop: "3px solid #E6B800",
              borderLeft: "3px solid #E6B800",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "24px",
              height: "24px",
              borderBottom: "3px solid #00B8D4",
              borderRight: "3px solid #00B8D4",
            }}
          />

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#0B0C10",
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
              color: "#0B0C10",
              marginBottom: "20px",
            }}
          >
            WANT A <span style={{ color: "#E6B800" }}>CUSTOM</span> PIECE?
          </h2>

          <p
            style={{
              fontSize: "15px",
              color: "#4A4D58",
              lineHeight: 1.7,
              maxWidth: "540px",
              marginBottom: "32px",
              fontWeight: 500,
            }}
          >
            Direct commissions are currently open for custom canvas portraits, anime art, and large charcoal pieces.
          </p>

          <Link
            to="/contact"
            id="commission-start-cta"
            className="cyber-btn"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.04, duration: 0.2, ease: "power2.out" });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" });
            }}
            onMouseDown={(e) => {
              gsap.to(e.currentTarget, { scale: 0.96, duration: 0.1 });
            }}
            onMouseUp={(e) => {
              gsap.to(e.currentTarget, { scale: 1.04, duration: 0.15 });
            }}
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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -6,
        boxShadow: "6px 6px 0px #0B0C10",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "3px 3px 0px rgba(11,12,16,0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <Link
      to={to}
      search={search}
      id={`medium-card-${label.toLowerCase()}`}
      style={{ textDecoration: "none" }}
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          background: "#FFFFFF",
          border: "2px solid #0B0C10",
          boxShadow: "3px 3px 0px rgba(11,12,16,0.1)",
          padding: "28px 24px",
          minHeight: "220px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          willChange: "transform",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: "#0B0C10",
              background: "#F5E000",
              padding: "2px 6px",
            }}
          >
            {index} // {tag}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "#4A4D58",
              border: "1px solid #0B0C10",
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
              color: hovered ? "#E6B800" : "#0B0C10",
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
              fontSize: "11px",
              color: "#4A4D58",
              marginTop: "8px",
              marginBottom: "16px",
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            {description}
          </p>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: "#00B8D4",
              textTransform: "uppercase",
              display: "inline-block",
              transform: hovered ? "translateX(6px)" : "none",
              transition: "transform 0.25s ease",
            }}
          >
            BROWSE COLLECTION →
          </span>
        </div>
      </div>
    </Link>
  );
}
