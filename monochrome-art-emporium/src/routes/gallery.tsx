import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MEDIUMS, fetchArtworks, type Artwork, type Medium } from "@/lib/artworks";

const searchSchema = z.object({
  medium: z.enum(["all", "charcoal", "paintings", "sketches"]).optional().catch("all"),
});

export const Route = createFileRoute("/gallery")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Gallery — Ravitej" },
      { name: "description", content: "Browse original charcoal, paintings and sketches by Ravitej. Available for purchase." },
    ],
  }),
  component: Gallery,
});

/* ── Placeholder artworks shown when backend is offline ───── */
const PLACEHOLDER_WORKS: Artwork[] = [
  {
    id: "demo-1",
    title: "Whispers in Graphite",
    medium: "charcoal",
    year: 2025,
    dimensions: "24 × 36 in",
    price: 4500,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9fd0c121?w=600&q=80",
    description: "A study in shadow and silence.",
  },
  {
    id: "demo-2",
    title: "Monochrome Reverie",
    medium: "paintings",
    year: 2024,
    dimensions: "30 × 40 in",
    price: 6200,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",
    description: "Oil on canvas. A meditation on light.",
  },
  {
    id: "demo-3",
    title: "Fractured Light",
    medium: "sketches",
    year: 2025,
    dimensions: "18 × 24 in",
    price: 2800,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    description: "Pencil on archival paper.",
  },
  {
    id: "demo-4",
    title: "Still Life — Silence",
    medium: "charcoal",
    year: 2024,
    dimensions: "20 × 28 in",
    price: 3800,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80",
    description: "Charcoal on textured paper.",
  },
  {
    id: "demo-5",
    title: "Abstract Emotion No. 7",
    medium: "paintings",
    year: 2025,
    dimensions: "36 × 48 in",
    price: 8500,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80",
    description: "Bold gestural strokes on canvas.",
  },
  {
    id: "demo-6",
    title: "Portrait Study — IV",
    medium: "sketches",
    year: 2024,
    dimensions: "14 × 18 in",
    price: 2200,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
    description: "Graphite portrait study.",
  },
];

/* ── Simple image-based card (no 3D canvas overhead) ──────── */
function GalleryCard({ art }: { art: Artwork }) {
  const [imgLoaded, setImgLoaded] = useState(false);

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

function Gallery() {
  const { medium = "all" } = Route.useSearch();
  const [works, setWorks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetchArtworks(medium)
      .then((data) => {
        setWorks(data.length > 0 ? data : PLACEHOLDER_WORKS);
      })
      .catch(() => {
        setWorks(PLACEHOLDER_WORKS);
      });
  }, [medium]);

  const filtered = medium && medium !== "all"
    ? works.filter((a) => a.medium === medium)
    : works;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <header className="mb-10 sm:mb-16 grid md:grid-cols-2 gap-6 sm:gap-10 items-end">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 sm:mb-6">— The Collection</p>
            <h1 className="text-display text-5xl sm:text-6xl md:text-8xl leading-none">Gallery</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
            Every work is original and one of one. Prices include archival framing and worldwide shipping.
          </p>
        </header>

        {/* Filter */}
        <div className="flex items-center justify-between mb-8 sm:mb-12 md:mb-16 border-y border-border/40 py-3 sm:py-4 gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto whitespace-nowrap pr-4 -my-3 sm:-my-4 py-3 sm:py-4 scrollbar-none">
            {MEDIUMS.map((m) => {
              const active = (medium ?? "all") === m.id;
              return (
                <Link
                  key={m.id}
                  to="/gallery"
                  search={{ medium: m.id }}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-colors shrink-0 ${
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m.label}
                </Link>
              );
            })}
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground shrink-0">
            {filtered.length} {filtered.length === 1 ? "work" : "works"}
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-32">No works in this medium yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-12">
            {filtered.map((a) => (
              <GalleryCard key={a.id} art={a} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
