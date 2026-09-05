import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { type Artwork } from "@/types/artwork";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ArtworkCardProps {
  art: Artwork;
  index?: number;
}

export function ArtworkCard({ art, index = 0 }: ArtworkCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const cardRef = useRef<HTMLAnchorElement>(null);
  const cardBoxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const imageCount = art.images && art.images.length > 1 ? art.images.length : 0;
  const num = String(index + 1).padStart(2, "0");

  // ScrollTrigger Entrance Reveal
  useEffect(() => {
    if (typeof window === "undefined" || !cardRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.9, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  // Desktop Mouse Move CRAZY 3D Tilt Parallax Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    if (!cardBoxRef.current) return;

    const rect = cardBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Crazier tilt 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardBoxRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 800,
      duration: 0.25,
      ease: "power2.out",
    });

    // Shine sweep effect following mouse
    if (shineRef.current) {
      gsap.to(shineRef.current, {
        x: (x / rect.width) * 100 + "%",
        y: (y / rect.height) * 100 + "%",
        duration: 0.2,
      });
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
    if (!cardBoxRef.current) return;

    gsap.to(cardBoxRef.current, {
      y: -10,
      boxShadow: "8px 12px 0px #0B0C10, 0 20px 40px rgba(0,0,0,0.12)",
      borderColor: "#0B0C10",
      duration: 0.3,
      ease: "back.out(1.7)",
    });

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.09,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (!cardBoxRef.current) return;

    gsap.to(cardBoxRef.current, {
      y: 0,
      rotateX: 0,
      rotateY: 0,
      boxShadow: "4px 4px 0px #0B0C10, 0 6px 20px rgba(0,0,0,0.06)",
      borderColor: "#0B0C10",
      duration: 0.4,
      ease: "power3.out",
    });

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleMouseDown = () => {
    if (!cardBoxRef.current) return;
    gsap.to(cardBoxRef.current, {
      scale: 0.96,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  const handleMouseUp = () => {
    if (!cardBoxRef.current) return;
    gsap.to(cardBoxRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "elastic.out(1.2, 0.4)",
    });
  };

  return (
    <Link
      ref={cardRef}
      to={art.id.startsWith("demo-") ? "/gallery" : "/artwork/$id"}
      params={{ id: art.id }}
      className="group block"
      id={`artwork-card-${art.id}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        ref={cardBoxRef}
        style={{
          position: "relative",
          background: "#FFFFFF",
          border: "2px solid #0B0C10",
          boxShadow: "4px 4px 0px #0B0C10, 0 6px 20px rgba(0,0,0,0.06)",
          transformStyle: "preserve-3d",
          willChange: "transform",
          clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
        }}
      >
        {/* Corner brackets — top left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "16px",
            height: "16px",
            borderTop: "3px solid #E6B800",
            borderLeft: "3px solid #E6B800",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
        {/* Corner brackets — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "16px",
            height: "16px",
            borderBottom: "3px solid #00B8D4",
            borderRight: "3px solid #00B8D4",
            zIndex: 3,
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
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: "#0B0C10",
              textTransform: "uppercase",
              background: "#F5E000",
              padding: "2px 6px",
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
            border: "1px solid #00B04F",
            background: "rgba(0,176,79,0.1)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "8px",
              fontWeight: 800,
              letterSpacing: "0.25em",
              color: "#00B04F",
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
            background: "#F1F3F9",
            marginTop: "38px",
          }}
        >
          {/* Shimmer loader */}
          {!imgLoaded && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, #F1F3F9 0%, #E4E7F0 50%, #F1F3F9 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
          )}

          <img
            ref={imageRef}
            src={art.image}
            alt={art.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />

          {/* Interactive Mouse Shine Overlay */}
          <div
            ref={shineRef}
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)",
              opacity: hovered ? 0.6 : 0,
              transition: "opacity 0.3s ease",
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
              background: "linear-gradient(to top, rgba(11,12,16,0.9) 0%, transparent 100%)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              zIndex: 3,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.2em",
                color: "#F5E000",
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
                background: "#0B0C10",
                color: "#FFFFFF",
                zIndex: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                +{imageCount} VIEWS
              </span>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div
          style={{
            padding: "16px",
            borderTop: "2px solid #0B0C10",
            background: "#FFFFFF",
          }}
        >
          {/* Title */}
          <h3
            className="glitch"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(16px, 2.5vw, 22px)",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              color: hovered ? "#E6B800" : "#0B0C10",
              lineHeight: 1.1,
              marginBottom: "10px",
              transition: "color 0.3s ease",
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
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#4A4D58",
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
                  fontWeight: 900,
                  fontSize: "16px",
                  color: "#0B0C10",
                  letterSpacing: "0.02em",
                  background: "#F5E000",
                  padding: "2px 8px",
                  border: "1px solid #0B0C10",
                }}
              >
                ₹{art.price.toLocaleString()}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  fontWeight: 900,
                  color: hovered ? "#E6B800" : "#0B0C10",
                  transition: "transform 0.3s ease",
                  transform: hovered ? "translateX(4px)" : "translateX(0)",
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
