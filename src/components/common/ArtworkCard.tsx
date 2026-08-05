import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { type Artwork } from "@/types/artwork";

export function ArtworkCard({ art }: { art: Artwork }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imageCount = art.images && art.images.length > 1 ? art.images.length : 0;

  return (
    <Link
      to={art.id.startsWith("demo-") ? "/gallery" : "/artwork/$id"}
      params={{ id: art.id }}
      className="group block"
    >
      <div className="aspect-[4/5] bg-card border border-border/40 overflow-hidden hover-lift relative">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-card via-border/20 to-card animate-pulse" />
        )}
        <img
          src={art.image}
          alt={art.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
        {/* Multi-image badge */}
        {imageCount > 1 && (
          <div
            className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          >
            {Array.from({ length: Math.min(imageCount, 4) }).map((_, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: i === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
            <span
              style={{
                fontSize: "9px",
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
      <div className="mt-3 sm:mt-4">
        <h3 className="text-display text-lg sm:text-2xl leading-tight group-hover:text-muted-foreground transition-colors duration-300">
          {art.title}
        </h3>
        <div className="flex items-center justify-between mt-1.5 sm:mt-2 gap-2">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {art.medium} · {art.year}
          </p>
          <p className="text-xs sm:text-sm text-foreground/80 whitespace-nowrap">
            ${art.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
