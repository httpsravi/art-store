import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { type Artwork } from "@/types/artwork";

interface ArtworkCardProps {
  art: Artwork;
  index?: number;
}

export function ArtworkCard({ art, index = 0 }: ArtworkCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const imageCount = art.images && art.images.length > 1 ? art.images.length : 0;
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={art.id.startsWith("demo-") ? "/gallery" : "/artwork/$id"}
      params={{ id: art.id }}
      className="group block"
      id={`artwork-card-${art.id}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          background: "var(--cp-surface)",
          border: `1px solid ${hovered ? "rgba(245,240,0,0.55)" : "rgba(245,240,0,0.18)"}`,
          transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 0 30px rgba(245,240,0,0.1), 0 12px 40px rgba(0,0,0,0.5)"
            : "0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        {/* Corner brackets — top left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "20px",
            height: "20px",
            borderTop: `2px solid ${hovered ? "var(--cp-yellow)" : "rgba(245,240,0,0.5)"}`,
            borderLeft: `2px solid ${hovered ? "var(--cp-yellow)" : "rgba(245,240,0,0.5)"}`,
            zIndex: 3,
            transition: "border-color 0.3s ease",
            pointerEvents: "none",
          }}
        />
        {/* Corner brackets — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "20px",
            height: "20px",
            borderBottom: `2px solid ${hovered ? "var(--cp-yellow)" : "rgba(245,240,0,0.5)"}`,
            borderRight: `2px solid ${hovered ? "var(--cp-yellow)" : "rgba(245,240,0,0.5)"}`,
            zIndex: 3,
            transition: "border-color 0.3s ease",
            pointerEvents: "none",
          }}
        />

        {/* Index label — top */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "14px",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: hovered ? "var(--cp-yellow)" : "var(--cp-dim)",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
            }}
          >
            {num} / ARTWORK
          </span>
        </div>

        {/* LIMITED badge */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "14px",
            zIndex: 4,
            padding: "3px 8px",
            border: "1px solid rgba(156,255,0,0.4)",
            background: "rgba(156,255,0,0.08)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "7px",
              letterSpacing: "0.25em",
              color: "var(--cp-green)",
              textTransform: "uppercase",
            }}
          >
            ORIGINAL
          </span>
        </div>

        {/* Image container */}
        <div
          style={{
            aspectRatio: "4/5",
            overflow: "hidden",
            position: "relative",
            background: "var(--cp-surface2)",
            marginTop: "36px",
          }}
        >
          {/* Shimmer loader */}
          {!imgLoaded && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, var(--cp-surface2) 0%, var(--cp-surface3) 50%, var(--cp-surface2) 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
          )}

          <img
            src={art.image}
            alt={art.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(0.19,1,0.22,1)",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />

          {/* Scanline overlay on hover */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Neon border glow on hover */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: hovered
                ? "inset 0 0 0 1px rgba(245,240,0,0.5), inset 0 0 20px rgba(245,240,0,0.05)"
                : "inset 0 0 0 1px transparent",
              transition: "box-shadow 0.35s ease",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* VIEW ARTWORK overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "20px 14px 14px",
              background: "linear-gradient(to top, rgba(10,12,8,0.85) 0%, transparent 100%)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              zIndex: 3,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "var(--cp-yellow)",
                textTransform: "uppercase",
              }}
            >
              VIEW ARTWORK →
            </span>
          </div>

          {/* Multi-image badge */}
          {imageCount > 1 && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "3px 8px",
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(245,240,0,0.2)",
                zIndex: 4,
              }}
            >
              {Array.from({ length: Math.min(imageCount, 4) }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: i === 0 ? "var(--cp-yellow)" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "8px",
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.1em",
                  marginLeft: "2px",
                }}
              >
                {imageCount}
              </span>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div
          style={{
            padding: "14px",
            borderTop: "1px solid rgba(245,240,0,0.1)",
          }}
        >
          {/* Title */}
          <h3
            className="glitch"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(15px, 2.5vw, 20px)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: hovered ? "var(--cp-yellow)" : "var(--cp-text)",
              lineHeight: 1.1,
              marginBottom: "10px",
              transition: "color 0.3s ease",
              animationPlayState: hovered ? "running" : "paused",
            }}
          >
            {art.title}
          </h3>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--cp-muted)",
              }}
            >
              {art.medium} · {art.year}
            </span>

            {/* Price + CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "var(--cp-text)",
                  letterSpacing: "0.04em",
                }}
              >
                ₹{art.price.toLocaleString()}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: hovered ? "var(--cp-yellow)" : "var(--cp-dim)",
                  transition: "color 0.3s ease, transform 0.3s ease",
                  transform: hovered ? "translateX(3px)" : "translateX(0)",
                  display: "inline-block",
                }}
              >
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
