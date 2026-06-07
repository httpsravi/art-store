import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArtworkCanvas } from "./ArtworkCanvas";
import type { Artwork } from "@/lib/artworks";

export function ArtworkCard({ art }: { art: Artwork }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to="/artwork/$id"
      params={{ id: art.id }}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[4/5] bg-card border border-border/40 overflow-hidden hover-lift">
        <ArtworkCanvas image={art.image} hovered={hovered} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-display text-2xl leading-tight">{art.title}</h3>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
            {art.medium} · {art.year}
          </p>
        </div>
        <p className="text-sm text-foreground/80 whitespace-nowrap">${art.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}
