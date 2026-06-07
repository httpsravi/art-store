import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Scene3D } from "@/components/Scene3D";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MEDIUMS, fetchArtworks, type Artwork } from "@/lib/artworks";

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Ravitej — Original Charcoal, Paintings & Sketches" },
      { name: "description", content: "Original black & white artworks by Ravitej. Charcoal, oil paintings, and graphite sketches available worldwide." },
    ],
  }),
  component: Home,
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
    description: "A study in shadow and silence, exploring the boundary between presence and absence.",
  },
  {
    id: "demo-2",
    title: "Monochrome Reverie",
    medium: "paintings",
    year: 2024,
    dimensions: "30 × 40 in",
    price: 6200,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",
    description: "Oil on canvas. A meditation on light through layered washes of grey.",
  },
  {
    id: "demo-3",
    title: "Fractured Light",
    medium: "sketches",
    year: 2025,
    dimensions: "18 × 24 in",
    price: 2800,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    description: "Pencil on archival paper. Capturing the fleeting geometry of afternoon light.",
  },
  {
    id: "demo-4",
    title: "Still Life — Silence",
    medium: "charcoal",
    year: 2024,
    dimensions: "20 × 28 in",
    price: 3800,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80",
    description: "Charcoal on textured paper. Objects rendered with dramatic chiaroscuro.",
  },
  {
    id: "demo-5",
    title: "Abstract Emotion No. 7",
    medium: "paintings",
    year: 2025,
    dimensions: "36 × 48 in",
    price: 8500,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80",
    description: "Bold gestural strokes on canvas. Raw emotion distilled into monochrome.",
  },
  {
    id: "demo-6",
    title: "Portrait Study — IV",
    medium: "sketches",
    year: 2024,
    dimensions: "14 × 18 in",
    price: 2200,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
    description: "Graphite portrait capturing the quiet intensity of an unguarded moment.",
  },
];

const MEDIUM_META: Record<string, { index: string; accent: string; description: string }> = {
  charcoal:  { index: "01", accent: "from-zinc-900 via-zinc-800/30 to-transparent", description: "Raw marks on archival paper. Shadow made solid." },
  paintings: { index: "02", accent: "from-stone-900 via-stone-700/20 to-transparent", description: "Oil on canvas. Emotion rendered in paint." },
  sketches:  { index: "03", accent: "from-neutral-900 via-neutral-600/20 to-transparent", description: "Graphite studies. Gesture captured in an instant." },
};

/* ── Artwork card (inline — avoids 3D Canvas per card for speed) ── */
function ArtworkCardSimple({ art }: { art: Artwork }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      to={art.id.startsWith("demo-") ? "/" : "/artwork/$id"}
      params={{ id: art.id }}
      className="group block"
    >
      {/* Image container */}
      <div className="aspect-[4/5] bg-card border border-border/40 overflow-hidden hover-lift relative">
        {/* Shimmer placeholder */}
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
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
      </div>

      {/* Info */}
      <div className="mt-4 sm:mt-5">
        <h3 className="text-display text-xl sm:text-2xl leading-tight group-hover:text-muted-foreground transition-colors duration-300">
          {art.title}
        </h3>
        <div className="flex items-center justify-between mt-2 gap-3">
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

function Home() {
  const [works, setWorks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetchArtworks()
      .then((data) => {
        // Use API data if we got results, otherwise fall back to placeholders
        setWorks(data.length > 0 ? data : PLACEHOLDER_WORKS);
      })
      .catch(() => {
        setWorks(PLACEHOLDER_WORKS);
      });
  }, []);

  const featured = works.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Fixed 3D background — stays in place while scrolling */}
      <Scene3D />

      <Navbar />

      {/* HERO */}
      <section className="relative h-[100svh] overflow-hidden">
        {/* Vignette overlay */}
        <div className="absolute inset-0 vignette pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-muted-foreground mb-6 sm:mb-8 animate-fade-up">
            The art of Ravitej
          </p>
          <h1 className="text-display text-[clamp(2.8rem,10vw,11rem)] leading-[0.9] animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Made of <em className="text-muted-foreground">shadow</em>
            <br />
            and <em className="text-muted-foreground">silence</em>.
          </h1>
          <p className="mt-8 sm:mt-10 max-w-md text-xs sm:text-sm text-muted-foreground leading-relaxed animate-fade-up px-4" style={{ animationDelay: "0.3s" }}>
            Every artwork is drawn by hand and crafted to tell a story.
          </p>
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-up w-full px-4 sm:px-0" style={{ animationDelay: "0.5s" }}>
            <Link
              to="/gallery"
              className="w-full sm:w-auto text-center group relative px-8 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] hover:bg-primary/90 transition-colors"
            >
              Enter the Gallery
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto text-center text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1"
            >
              Commission a piece →
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground animate-float">
          Scroll
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 md:py-32">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] -z-10" />
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-end mb-12 sm:mb-16 md:mb-20">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 sm:mb-6">— Mediums</p>
            <h2 className="text-display text-4xl sm:text-5xl md:text-7xl leading-none">
              Many forms.<br />
              <em className="text-muted-foreground">One artist.</em>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
            Every surface carries its own character. Every mark carries the same intention.
          </p>
        </div>

        {/* Medium cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {MEDIUMS.filter((m) => m.id !== "all").map((m) => {
            const meta = MEDIUM_META[m.id] ?? { index: "—", accent: "from-zinc-900 to-transparent", description: "" };
            const count = works.filter((a) => a.medium === m.id).length;
            return (
              <Link
                key={m.id}
                to="/gallery"
                search={{ medium: m.id }}
                className="group relative overflow-hidden bg-card border border-border/40 hover:border-foreground/30 transition-all duration-700 min-h-[260px] sm:min-h-[320px] md:min-h-[420px] flex flex-col justify-between p-6 sm:p-8 md:p-10"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${meta.accent} opacity-60 group-hover:opacity-100 transition-opacity duration-700`} />

                <span className="absolute bottom-0 right-0 text-[8rem] sm:text-[10rem] md:text-[14rem] leading-none font-bold text-foreground/[0.03] group-hover:text-foreground/[0.06] transition-all duration-700 select-none pointer-events-none translate-x-6 translate-y-4">
                  {meta.index}
                </span>

                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                    {count} {count === 1 ? "work" : "works"}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/20 group-hover:text-foreground/40 transition-colors font-mono">
                    {meta.index}
                  </span>
                </div>

                <div className="relative z-10">
                  <div className="w-8 h-px bg-foreground/30 group-hover:w-16 group-hover:bg-foreground/70 transition-all duration-500 mb-4 sm:mb-5" />
                  <p className="text-[10px] sm:text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-300 mb-3 sm:mb-4 leading-relaxed max-w-[18ch]">
                    {meta.description}
                  </p>
                  <h3 className="text-display text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 group-hover:tracking-wide transition-all duration-500">
                    {m.label}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      View collection
                    </span>
                    <span className="w-0 group-hover:w-8 overflow-hidden transition-all duration-500 text-foreground/60 text-xs">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED / RECENT WORKS */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-20">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] -z-10" />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2 sm:mb-3">— Selected works</p>
            <h2 className="text-display text-3xl sm:text-4xl md:text-5xl">Recent works</h2>
          </div>
          <Link to="/gallery" className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10">
          {featured.map((a) => (
            <ArtworkCardSimple key={a.id} art={a} />
          ))}
        </div>
      </section>

      {/* COMMISSION */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 md:py-32">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] -z-10" />
        <div className="relative overflow-hidden border border-border/60 p-8 sm:p-12 md:p-20 text-center bg-card/30">
          <span className="absolute inset-0 flex items-center justify-center text-[10rem] sm:text-[12rem] md:text-[20rem] font-bold text-foreground/[0.02] select-none pointer-events-none leading-none">
            C
          </span>
          <div className="relative z-10">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 sm:mb-6">— Custom works</p>
            <h2 className="text-display text-3xl sm:text-5xl md:text-7xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-tight">
              Have something <em className="text-muted-foreground">specific</em> in mind?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              Commissions are open for portraits, abstract works, and large-scale paintings. Tell me about your space and we'll start the conversation.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 sm:px-10 py-3 sm:py-4 border border-foreground text-[10px] sm:text-xs uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Start a commission
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
