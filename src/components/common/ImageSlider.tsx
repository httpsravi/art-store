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
      <div className="w-full h-full bg-card border border-border/40 vignette overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-card border border-border/40 vignette overflow-hidden select-none group">
      {/* Slides */}
      <div
        className="w-full h-full"
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
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1578301978693-85fa9fd0c121?w=600&q=80";
            }}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500"
            style={{
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
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-background/70 backdrop-blur-sm border border-border/40 text-foreground hover:bg-background/90 transition-all opacity-0 group-hover:opacity-100 z-10"
        style={{ fontSize: "16px" }}
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-background/70 backdrop-blur-sm border border-border/40 text-foreground hover:bg-background/90 transition-all opacity-0 group-hover:opacity-100 z-10"
        style={{ fontSize: "16px" }}
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>

      {/* Counter badge */}
      <div
        className="absolute top-3 right-3 z-10 text-[10px] uppercase tracking-widest px-2 py-1"
        style={{
          background: "rgba(0,0,0,0.55)",
          color: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(4px)",
        }}
      >
        {current + 1} / {images.length}
      </div>
    </div>
  );
}
