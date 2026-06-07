import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/40">
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="text-display text-2xl tracking-wider" onClick={() => setIsOpen(false)}>
          Ravi.davinci<span className="text-muted-foreground">.</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em]">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side items */}
        <div className="flex items-center gap-6">
          <Link
            to="/admin"
            className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Studio
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-lg z-40 border-t border-border/40 flex flex-col justify-center animate-fade-up">
          <ul className="flex flex-col items-center gap-10 text-sm uppercase tracking-[0.3em] pb-20">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  activeProps={{ className: "text-foreground font-medium" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
