import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MEDIUMS, fetchArtworks } from "@/services";
import { type Artwork, type Medium } from "@/types/artwork";
import { PLACEHOLDER_WORKS } from "@/constants/placeholders";
const searchSchema = z.object({
  medium: z.enum(["all", "charcoal", "paintings", "sketches"]).optional().catch("all"),
});

export const Route = createFileRoute("/gallery")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Gallery — Ravitej" },
      {
        name: "description",
        content:
          "Browse original charcoal, paintings and sketches by Ravitej. Available for purchase.",
      },
    ],
  }),
  component: Gallery,
});

import { ArtworkCard } from "@/components/common/ArtworkCard";

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

  const filtered = medium && medium !== "all" ? works.filter((a) => a.medium === medium) : works;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <header className="mb-10 sm:mb-16 grid md:grid-cols-2 gap-6 sm:gap-10 items-end">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 sm:mb-6">
              — The Collection
            </p>
            <h1 className="text-display text-5xl sm:text-6xl md:text-8xl leading-none">Gallery</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
            Every work is original and one of one. Prices include archival framing and worldwide
            shipping.
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
              <ArtworkCard key={a.id} art={a} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
