import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="footer"
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--cp-surface)",
        borderTop: "1px solid var(--cp-border-y)",
        marginTop: "80px",
      }}
    >
      {/* Top accent line */}
      <div className="yellow-strip" />

      {/* HUD header bar */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid rgba(245,240,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--cp-yellow)",
          }}
        >
          SYS // RAVI.DAVINCI
        </span>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "var(--cp-dim)",
              textTransform: "uppercase",
            }}
          >
            STATUS: ONLINE
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "var(--cp-dim)",
              textTransform: "uppercase",
            }}
          >
            BUILD_v2.0
          </span>
        </div>
      </div>

      {/* Main footer content */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "48px 24px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "48px",
        }}
      >
        {/* Brand column */}
        <div>
          <div style={{ marginBottom: "16px" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "28px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--cp-text)",
                display: "block",
                lineHeight: 1,
              }}
            >
              RAVI
              <span style={{ color: "var(--cp-yellow)" }}>//</span>
              DAVINCI
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "var(--cp-green)",
                textTransform: "uppercase",
                display: "block",
                marginTop: "6px",
              }}
            >
              ● TRANSMISSIONS OPEN
            </span>
          </div>
          <p
            style={{
              fontSize: "13px",
              color: "var(--cp-muted)",
              lineHeight: 1.7,
              maxWidth: "240px",
            }}
          >
            Original artworks — charcoal, paintings & sketches. Each piece hand-crafted to feel alive.
          </p>

          {/* Tech label */}
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            {["KARMA: INDIA", "COORD: 15°N 75°E", "COLLECTION_2049"].map((label) => (
              <span
                key={label}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  color: "var(--cp-dim)",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation links */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--cp-yellow)",
              marginBottom: "20px",
              fontWeight: 500,
            }}
          >
            // NAV_MAP
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { to: "/gallery", label: "Gallery" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/contact", search: { subject: "Commission Inquiry" }, label: "Commissions" },
            ].map(({ to, label, search }) => (
              <li key={label}>
                <Link
                  to={to}
                  // @ts-ignore — search is optional
                  search={search}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--cp-muted)",
                    textDecoration: "none",
                    display: "flex",
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
                  <span style={{ color: "var(--cp-dim)", fontSize: "9px" }}>→</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--cp-cyan)",
              marginBottom: "20px",
              fontWeight: 500,
            }}
          >
            // CONNECT
          </h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
            <li>
              <a
                href="https://instagram.com/ravi.davinci"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "var(--cp-muted)",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--cp-cyan)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--cp-muted)";
                }}
              >
                <Instagram size={14} />
                @ravi.davinci
              </a>
            </li>
            <li>
              <a
                href="mailto:itsmeravitej05@gmail.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "var(--cp-muted)",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                  wordBreak: "break-all",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--cp-cyan)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--cp-muted)";
                }}
              >
                <Mail size={14} />
                itsmeravitej05@gmail.com
              </a>
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "var(--cp-muted)",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
              }}
            >
              <MapPin size={14} />
              Karnataka, India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(245,240,0,0.08)",
          padding: "16px 24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.25em",
            color: "var(--cp-dim)",
            textTransform: "uppercase",
          }}
        >
          © 2049 RAVI.DAVINCI · ALL RIGHTS RESERVED
        </span>
        <div style={{ display: "flex", gap: "24px" }}>
          {["ART_MARKETPLACE", "SHIPS_WORLDWIDE", "AUTHENTICITY_VERIFIED"].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "8px",
                letterSpacing: "0.2em",
                color: "var(--cp-dim)",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
