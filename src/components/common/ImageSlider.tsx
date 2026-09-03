import { useState, useRef } from "react";

interface ImageSliderProps {
  images: string[];
  title: string;
}

export function ImageSlider({ images, title }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const MIN_SWIPE = 40;

  function prev() {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }
  function next() {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.changedTouches[0].clientX;
    touchEnd.current = null;
  }
  function onTouchMove(e: React.TouchEvent) {
    touchEnd.current = e.changedTouches[0].clientX;
  }
  function onTouchEnd() {
    if (touchStart.current === null || touchEnd.current === null) return;
    const delta = touchStart.current - touchEnd.current;
    if (Math.abs(delta) > MIN_SWIPE) {
      delta > 0 ? next() : prev();
    }
  }

  if (!images || images.length === 0) return null;

  // Single image — no slider chrome needed
  if (images.length === 1) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "var(--cp-surface)",
          overflow: "hidden",
        }}
      >
        <img
          src={images[0]}
          alt={title}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "var(--cp-surface)",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Slides */}
      <div
        style={{ width: "100%", height: "100%" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${title} — view ${i + 1}`}
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "opacity 0.5s ease",
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? "auto" : "none",
            }}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={prev}
        aria-label="Previous image"
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(12,14,10,0.75)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(245,240,0,0.3)",
          color: "var(--cp-yellow)",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background 0.2s ease, border-color 0.2s ease",
          zIndex: 10,
          opacity: 1,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,240,0,0.15)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,240,0,0.6)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(12,14,10,0.75)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,240,0,0.3)";
        }}
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(12,14,10,0.75)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(245,240,0,0.3)",
          color: "var(--cp-yellow)",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background 0.2s ease, border-color 0.2s ease",
          zIndex: 10,
          opacity: 1,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,240,0,0.15)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,240,0,0.6)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(12,14,10,0.75)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,240,0,0.3)";
        }}
      >
        ›
      </button>

      {/* Dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          zIndex: 10,
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === current ? "var(--cp-yellow)" : "rgba(245,240,0,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Counter badge */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          zIndex: 10,
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          padding: "4px 10px",
          background: "rgba(12,14,10,0.75)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(245,240,0,0.25)",
          color: "var(--cp-muted)",
        }}
      >
        {current + 1} / {images.length}
      </div>
    </div>
  );
}
