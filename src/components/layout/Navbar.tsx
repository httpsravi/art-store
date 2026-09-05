import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const links = [
  { to: "/", label: "Home", num: "01" },
  { to: "/gallery", label: "Gallery", num: "02" },
  { to: "/about", label: "About", num: "03" },
  { to: "/contact", label: "Contact", num: "04" },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll check
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll on mobile drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Initial Navbar GSAP Entrance Sequence
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header slide down
      gsap.fromTo(
        headerRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "bounce.out" }
      );

      // Nav items stagger in
      if (navLinksRef.current) {
        gsap.fromTo(
          navLinksRef.current.children,
          { y: -20, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.7)",
            delay: 0.2,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Mobile Drawer GSAP Animation
  useEffect(() => {
    if (typeof window === "undefined" || !drawerRef.current) return;

    if (isOpen) {
      const items = drawerRef.current.querySelectorAll(".nav-drawer-item");
      gsap.fromTo(
        drawerRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.45, ease: "power4.out" }
      );
      gsap.fromTo(
        items,
        { x: 50, opacity: 0, skewX: -10 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.4)",
          delay: 0.15,
        }
      );
    } else {
      gsap.to(drawerRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  // CRAZY LOGO Hover GSAP Spring
  const handleLogoMouseEnter = () => {
    if (!logoRef.current) return;
    gsap.to(logoRef.current, {
      scale: 1.12,
      rotation: -3,
      duration: 0.4,
      ease: "elastic.out(1.2, 0.4)",
    });
  };

  const handleLogoMouseLeave = () => {
    if (!logoRef.current) return;
    gsap.to(logoRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // CRAZY Nav link hover micro-interaction
  const handleLinkMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector(".nav-underline");
    if (underline) {
      gsap.to(underline, {
        scaleX: 1,
        height: "100%",
        opacity: 0.15,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleLinkMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>, active: boolean) => {
    const underline = e.currentTarget.querySelector(".nav-underline");
    if (underline && !active) {
      gsap.to(underline, {
        scaleX: 0,
        height: "2px",
        opacity: 1,
        duration: 0.25,
        ease: "power2.inOut",
      });
    } else if (underline && active) {
      gsap.to(underline, {
        scaleX: 1,
        height: "2px",
        opacity: 1,
        duration: 0.25,
        ease: "power2.inOut",
      });
    }
  };

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <>
      <header
        ref={headerRef}
        id="navbar"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: "rgba(11, 12, 16, 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "2px solid #E6B800",
          boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Neon accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #E6B800, #00B8D4, #FF0055)",
          }}
        />

        <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            ref={logoRef}
            to="/"
            id="nav-logo"
            onClick={() => setIsOpen(false)}
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
            className="relative z-50 flex items-center gap-2"
            style={{ textDecoration: "none", display: "inline-flex" }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(16px, 3vw, 22px)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              RAVI
              <span style={{ color: "#E6B800" }}>//</span>
              DAVINCI
            </span>
            <span className="status-badge" style={{ marginLeft: "8px" }}>
              ONLINE
            </span>
          </Link>

          {/* Desktop Links */}
          <ul
            ref={navLinksRef}
            className="hidden md:flex items-center gap-8"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            {links.map((l) => {
              const active = isActive(l.to);
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    id={`nav-link-${l.label.toLowerCase()}`}
                    onMouseEnter={handleLinkMouseEnter}
                    onMouseLeave={(e) => handleLinkMouseLeave(e, active)}
                    className="relative group"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: active ? "#FFFFFF" : "#A0A5B5",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      padding: "6px 14px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "8px",
                        color: active ? "#E6B800" : "#6C7284",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {l.num}
                    </span>
                    <span style={{ transition: "color 0.2s ease", zIndex: 2 }}>{l.label}</span>
                    {/* Active/hover indicator */}
                    <span
                      className="nav-underline"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "#E6B800",
                        transform: active ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "center",
                        borderRadius: "2px",
                        zIndex: 1,
                        boxShadow: "0 0 8px rgba(230, 184, 0, 0.6)",
                      }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-6">
            {/* HUD coordinate label */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "#A0A5B5",
                textTransform: "uppercase",
              }}
            >
              KA//IND
            </span>
            <Link
              to="/admin"
              id="nav-studio"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                textDecoration: "none",
                background: "#0B0C10",
                border: "2px solid #E6B800",
                padding: "6px 12px",
                boxShadow: "3px 3px 0px #E6B800",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.05, boxShadow: "4px 4px 0px #00B8D4", duration: 0.2 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, boxShadow: "3px 3px 0px #E6B800", duration: 0.2 });
              }}
            >
              STUDIO
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 flex flex-col items-center justify-center gap-[5px] focus:outline-none"
            style={{ width: "40px", height: "40px" }}
            aria-label="Toggle menu"
          >
            {/* Top line */}
            <span
              style={{
                display: "block",
                width: "24px",
                height: "3px",
                background: "#FFFFFF",
                transform: isOpen ? "translateY(8px) rotate(45deg)" : "none",
                transition: "transform 0.3s ease, background 0.3s ease",
              }}
            />
            {/* Middle line */}
            <span
              style={{
                display: "block",
                width: "18px",
                height: "3px",
                background: "#E6B800",
                opacity: isOpen ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
            {/* Bottom line */}
            <span
              style={{
                display: "block",
                width: "24px",
                height: "3px",
                background: "#FFFFFF",
                transform: isOpen ? "translateY(-8px) rotate(-45deg)" : "none",
                transition: "transform 0.3s ease, background 0.3s ease",
              }}
            />
          </button>
        </nav>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <div
        ref={drawerRef}
        id="nav-mobile-drawer"
        className="md:hidden fixed inset-0 z-40"
        style={{
          background: "#0B0C10",
          transform: "translateX(100%)",
          opacity: 0,
          pointerEvents: isOpen ? "all" : "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "100px 32px 40px",
        }}
      >
        {/* Decorative gradient line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #E6B800, #00B8D4, #FF0055)",
          }}
        />

        {/* HUD corner decoration */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            right: "72px",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#A0A5B5",
            textTransform: "uppercase",
          }}
        >
          NAV_SYS // 04
        </div>

        {/* Nav links */}
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {links.map((l) => {
            const active = isActive(l.to);
            return (
              <li
                key={l.to}
                className="nav-drawer-item"
                style={{
                  borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Link
                  to={l.to}
                  id={`nav-mobile-link-${l.label.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "22px 0",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.25em",
                        color: active ? "#E6B800" : "#6C7284",
                        textTransform: "uppercase",
                      }}
                    >
                      {l.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "clamp(2.4rem, 10vw, 3.5rem)",
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                        color: active ? "#E6B800" : "#FFFFFF",
                        lineHeight: 1,
                        transition: "color 0.2s ease",
                      }}
                    >
                      {l.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "18px",
                      fontWeight: 900,
                      color: active ? "#E6B800" : "#FFFFFF",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom section */}
        <div className="nav-drawer-item">
          <div
            style={{
              borderTop: "2px solid #E6B800",
              paddingTop: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  color: "#A0A5B5",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                RAVI.DAVINCI © 2049
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "#00E676",
                  textTransform: "uppercase",
                }}
              >
                ● TRANSMISSIONS OPEN
              </span>
            </div>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: "#FFFFFF",
                textTransform: "uppercase",
                textDecoration: "none",
                background: "#0B0C10",
                border: "2px solid #E6B800",
                padding: "6px 12px",
                boxShadow: "3px 3px 0px #E6B800",
              }}
            >
              STUDIO
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
