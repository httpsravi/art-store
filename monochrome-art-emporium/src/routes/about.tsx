import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ravitej" },
      { name: "description", content: "About Ravitej — artist working in charcoal, oil, and graphite." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-6 lg:px-12">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">— The artist</p>
        <h1 className="text-display text-6xl md:text-8xl leading-none mb-16">Ravitej.</h1>

        <div className="space-y-8 text-lg leading-relaxed text-foreground/85 max-w-2xl">
          <p>
            Hey, I’m Ravitej, a 19-year-old artist with over 7 years of experience bringing ideas to life through art. What began as a simple hobby turned into something bigger ! I’ve created and sold custom paintings and hoodies, with a few even reaching the USA.
          </p>
          <p>
            I love drawing and painting portraits, anime, and customized pieces that reflect emotion and personality. My style mixes calm and chaos clean lines with a hint of rebellion. I don’t aim for perfect art I aim for art that feels alive.
          </p>
          <p>
            I create because it’s the one thing that never stops feeling real. If my art connects with you, that means a lot. If not that’s okay too. Art isn’t meant to please everyone, just the ones who feel it.
          </p>
        </div>

        <div className="ink-divider my-16" />

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
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Commissions</p>
            <p>
              <Link to="/contact" className="border-b border-foreground/40 hover:border-foreground">
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
