import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import artistPortrait from "@/assets/artist_portrait.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ravitej" },
      {
        name: "description",
        content: "About Ravitej — artist working in charcoal, oil, and graphite.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 sm:pt-32 pb-20 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Hero section: portrait + headline side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 lg:mb-24">
          {/* Text side */}
          <div className="order-2 lg:order-1">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-5">
              — The artist
            </p>
            <h1 className="text-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none mb-8 lg:mb-12">
              Ravitej.
            </h1>
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-foreground/80 max-w-xl">
              <p>
                Hey, I'm Ravitej — a 19-year-old artist with over 7 years of experience bringing
                ideas to life through art. What began as a simple hobby turned into something
                bigger. I've created and sold custom paintings and hoodies, with a few even reaching
                the USA.
              </p>
              <p>
                I love drawing and painting portraits, anime, and customised pieces that reflect
                emotion and personality. My style mixes calm and chaos — clean lines with a hint of
                rebellion.
              </p>
              <p>
                I don't aim for perfect art. I aim for art that feels <em>alive</em>.
              </p>
            </div>
          </div>

          {/* Portrait side */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
              {/* Decorative frame lines */}
              <div
                className="absolute -top-3 -left-3 w-16 h-16 pointer-events-none"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.25)",
                  borderLeft: "1px solid rgba(255,255,255,0.25)",
                }}
              />
              <div
                className="absolute -bottom-3 -right-3 w-16 h-16 pointer-events-none"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.25)",
                  borderRight: "1px solid rgba(255,255,255,0.25)",
                }}
              />

              {/* Main portrait */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src={artistPortrait}
                  alt="Ravitej — artist portrait"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "contrast(1.05) brightness(0.96)" }}
                />
                {/* Subtle gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/4"
                  style={{
                    background: "linear-gradient(to top, rgba(6,6,6,0.6), transparent)",
                  }}
                />
              </div>

              {/* Caption badge */}
              <div
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
                style={{ zIndex: 10 }}
              >
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  Ravitej · Studio, India
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  2025
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="ink-divider mb-14 lg:mb-20" />

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Based</p>
            <p>Studio · India</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Ships</p>
            <p>Worldwide</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
              Commissions
            </p>
            <p>
              <Link
                to="/contact"
                className="border-b border-foreground/40 hover:border-foreground transition-colors"
              >
                Open
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
