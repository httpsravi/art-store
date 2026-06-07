import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArtworkCanvas } from "@/components/ArtworkCanvas";
import { fetchArtworkById, type Artwork } from "@/lib/artworks";

export const Route = createFileRoute("/artwork/$id")({
  component: ArtworkDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-display text-5xl mb-4">Not found</p>
        <Link to="/gallery" className="text-xs uppercase tracking-[0.25em] underline">
          Back to gallery
        </Link>
      </div>
    </div>
  ),
});

function ArtworkDetail() {
  const { id } = Route.useParams();
  const [art, setArt] = useState<Artwork | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    fetchArtworkById(id)
      .then((found) => {
        setArt(found);
        setLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setArt(null);
        setLoaded(true);
      });
  }, [id]);

  if (loaded && !art) {
    throw notFound();
  }

  if (!art) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="aspect-square bg-card border border-border/40 vignette">
            <ArtworkCanvas image={art.image} hovered />
          </div>
          <div className="flex flex-col justify-center">
            <Link to="/gallery" className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground mb-8">
              ← Back to gallery
            </Link>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {art.medium} · {art.year}
            </p>
            <h1 className="text-display text-6xl md:text-7xl leading-none mb-8">{art.title}</h1>
            <div className="ink-divider mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-10 text-lg">{art.description}</p>

            <dl className="grid grid-cols-2 gap-y-4 text-sm mb-10">
              <dt className="text-muted-foreground uppercase tracking-wider text-xs">Dimensions</dt>
              <dd>{art.dimensions}</dd>
              <dt className="text-muted-foreground uppercase tracking-wider text-xs">Year</dt>
              <dd>{art.year}</dd>
              <dt className="text-muted-foreground uppercase tracking-wider text-xs">Medium</dt>
              <dd className="capitalize">{art.medium}</dd>
              <dt className="text-muted-foreground uppercase tracking-wider text-xs">Edition</dt>
              <dd>Original · 1 of 1</dd>
            </dl>

            <div className="ink-divider mb-8" />
            <div className="flex items-end justify-between mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Price</span>
              <span className="text-display text-4xl">${art.price.toLocaleString()}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                search={{ subject: `Purchase: ${art.title}` }}
                className="flex-1 text-center px-8 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] hover:bg-primary/90 transition-colors"
              >
                Inquire to purchase
              </Link>
              <Link
                to="/contact"
                search={{ subject: `Question about ${art.title}` }}
                className="px-8 py-4 border border-border text-xs uppercase tracking-[0.25em] hover:bg-card transition-colors text-center"
              >
                Ask a question
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
              Shipped worldwide in a custom archival crate. Allow 7–14 days for framing.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
