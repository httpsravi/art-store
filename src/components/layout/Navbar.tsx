import { Link } from "@tanstack/react-router";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
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

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(var(--background-rgb, 10,10,10), 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-display text-xl sm:text-2xl tracking-wider z-50 relative"
            onClick={() => setIsOpen(false)}
          >
            Ravi<span style={{ color: "var(--muted-foreground, #888)" }}>.</span>davinci
            <span style={{ color: "var(--muted-foreground, #888)" }}>.</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em]">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Studio Link */}
          <Link
            to="/admin"
            className="hidden md:block text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
          >
            Studio
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[5px] focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className="block h-px bg-foreground transition-all duration-300 origin-center"
              style={{
                width: "22px",
                transform: isOpen ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px bg-foreground transition-all duration-300"
              style={{
                width: "14px",
                opacity: isOpen ? 0 : 1,
                marginLeft: "0",
              }}
            />
            <span
              className="block h-px bg-foreground transition-all duration-300 origin-center"
              style={{
                width: "22px",
                transform: isOpen ? "translateY(-6px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className="md:hidden fixed inset-0 z-40 pointer-events-none"
        style={{
          background: "rgba(6, 6, 6, 0.97)",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition:
            "opacity 0.35s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: isOpen ? "all" : "none",
        }}
      >
        <div
          className="flex flex-col justify-between h-full px-8 pt-28 pb-12"
          style={{ minHeight: "100dvh" }}
        >
          {/* Nav Links */}
          <ul className="flex flex-col gap-0">
            {links.map((l, i) => (
              <li
                key={l.to}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  transform: isOpen ? "translateX(0)" : "translateX(40px)",
                  opacity: isOpen ? 1 : 0,
                  transition: `transform 0.4s cubic-bezier(0.4,0,0.2,1) ${0.06 * i + 0.1}s, opacity 0.4s ease ${0.06 * i + 0.1}s`,
                }}
              >
                <Link
                  to={l.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-6 group"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        color: "rgba(255,255,255,0.3)",
                        fontFamily: "monospace",
                      }}
                    >
                      {l.num}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(2rem, 8vw, 3rem)",
                        letterSpacing: "-0.02em",
                        fontFamily: "var(--font-display, serif)",
                        color: "rgba(255,255,255,0.9)",
                        lineHeight: 1,
                      }}
                    >
                      {l.label}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "20px",
                      color: "rgba(255,255,255,0.2)",
                      transition: "transform 0.3s ease",
                    }}
                    className="group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom section */}
          <div
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s",
            }}
          >
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                paddingTop: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                }}
              >
                Ravi.davinci © 2025
              </span>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                  paddingBottom: "2px",
                }}
              >
                Studio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
