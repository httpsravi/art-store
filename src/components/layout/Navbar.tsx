import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <>
      <header
        id="navbar"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(16,18,15,0.95)"
            : "linear-gradient(180deg, rgba(16,18,15,0.8) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(245,240,0,0.15)" : "none",
        }}
      >
        {/* Yellow progress line at top when scrolled */}
        {scrolled && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, var(--cp-yellow), var(--cp-cyan))",
              opacity: 0.7,
            }}
          />
        )}

        <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            id="nav-logo"
            onClick={() => setIsOpen(false)}
            className="relative z-50 flex items-center gap-2"
            style={{ textDecoration: "none" }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(16px, 3vw, 20px)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--cp-text)",
              }}
            >
              RAVI
              <span style={{ color: "var(--cp-yellow)" }}>//</span>
              DAVINCI
            </span>
            <span className="status-badge" style={{ marginLeft: "8px" }}>
              ONLINE
            </span>
          </Link>

          {/* Desktop Links */}
          <ul
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
                    className="relative group"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: active ? "var(--cp-yellow)" : "var(--cp-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "8px",
                        color: active ? "var(--cp-yellow)" : "var(--cp-dim)",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {l.num}
                    </span>
                    <span style={{ transition: "color 0.2s ease" }}>{l.label}</span>
                    {/* Active/hover indicator */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: "var(--cp-yellow)",
                        transform: active ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 0.3s cubic-bezier(0.19,1,0.22,1)",
                        transformOrigin: "left",
                      }}
                      className="group-hover:scale-x-100"
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
                letterSpacing: "0.15em",
                color: "var(--cp-dim)",
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
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--cp-dim)",
                textDecoration: "none",
                border: "1px solid var(--cp-dim)",
                padding: "4px 10px",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--cp-yellow)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--cp-yellow)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--cp-dim)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--cp-dim)";
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
                height: "2px",
                background: isOpen ? "var(--cp-yellow)" : "var(--cp-text)",
                transform: isOpen ? "translateY(7px) rotate(45deg)" : "none",
                transition: "transform 0.3s ease, background 0.3s ease",
              }}
            />
            {/* Middle line */}
            <span
              style={{
                display: "block",
                width: "16px",
                height: "2px",
                background: "var(--cp-yellow)",
                opacity: isOpen ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
            {/* Bottom line */}
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: isOpen ? "var(--cp-yellow)" : "var(--cp-text)",
                transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none",
                transition: "transform 0.3s ease, background 0.3s ease",
              }}
            />
          </button>
        </nav>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <div
        id="nav-mobile-drawer"
        className="md:hidden fixed inset-0 z-40"
        style={{
          background: "rgba(12, 14, 10, 0.98)",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: isOpen ? "all" : "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "100px 32px 40px",
        }}
      >
        {/* Decorative yellow line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "linear-gradient(90deg, var(--cp-yellow), var(--cp-cyan))",
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
            letterSpacing: "0.2em",
            color: "var(--cp-dim)",
            textTransform: "uppercase",
          }}
        >
          NAV_SYS // 04
        </div>

        {/* Nav links */}
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {links.map((l, i) => {
            const active = isActive(l.to);
            return (
              <li
                key={l.to}
                style={{
                  borderBottom: "1px solid rgba(245,240,0,0.1)",
                  transform: isOpen ? "translateX(0)" : "translateX(40px)",
                  opacity: isOpen ? 1 : 0,
                  transition: `transform 0.4s cubic-bezier(0.4,0,0.2,1) ${0.07 * i + 0.12}s, opacity 0.4s ease ${0.07 * i + 0.12}s`,
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
                        fontSize: "9px",
                        letterSpacing: "0.25em",
                        color: active ? "var(--cp-yellow)" : "var(--cp-dim)",
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
                        color: active ? "var(--cp-yellow)" : "var(--cp-text)",
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
                      fontSize: "16px",
                      color: active ? "var(--cp-yellow)" : "rgba(255,255,255,0.2)",
                      transition: "transform 0.3s ease, color 0.2s ease",
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
        <div
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.4s ease 0.36s, transform 0.4s ease 0.36s",
          }}
        >
          <div
            style={{
              borderTop: "1px solid rgba(245,240,0,0.15)",
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
                  letterSpacing: "0.25em",
                  color: "var(--cp-dim)",
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
                  letterSpacing: "0.2em",
                  color: "var(--cp-yellow)",
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
                letterSpacing: "0.25em",
                color: "var(--cp-dim)",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid var(--cp-dim)",
                padding: "6px 12px",
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
