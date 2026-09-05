import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound } from "../_libs/tanstack__router-core.mjs";
import { N as Navbar, F as Footer } from "./Footer-BqGRfv5k.mjs";
import { a as fetchArtworkById } from "./artworks-BsOkITqu.mjs";
import { b as Route } from "./router-BLU6E_xi.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/gsap.mjs";
import "../_libs/lucide-react.mjs";
import "./supabase-CQ76yxdm.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
function ImageSlider({ images, title }) {
  const [current, setCurrent] = reactExports.useState(0);
  const touchStart = reactExports.useRef(null);
  const touchEnd = reactExports.useRef(null);
  const MIN_SWIPE = 40;
  function prev() {
    setCurrent((c) => c === 0 ? images.length - 1 : c - 1);
  }
  function next() {
    setCurrent((c) => c === images.length - 1 ? 0 : c + 1);
  }
  function onTouchStart(e) {
    touchStart.current = e.changedTouches[0].clientX;
    touchEnd.current = null;
  }
  function onTouchMove(e) {
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
  if (images.length === 1) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-card border border-border/40 vignette overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: images[0],
        alt: title,
        className: "w-full h-full object-contain",
        draggable: false
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-full bg-card border border-border/40 vignette overflow-hidden select-none group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-full h-full",
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        children: images.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src,
            alt: `${title} — view ${i + 1}`,
            draggable: false,
            className: "absolute inset-0 w-full h-full object-contain transition-opacity duration-500",
            style: {
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? "auto" : "none"
            }
          },
          i
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: prev,
        "aria-label": "Previous image",
        className: "absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-background/70 backdrop-blur-sm border border-border/40 text-foreground hover:bg-background/90 transition-all opacity-0 group-hover:opacity-100 z-10",
        style: { fontSize: "16px" },
        children: "‹"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: next,
        "aria-label": "Next image",
        className: "absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-background/70 backdrop-blur-sm border border-border/40 text-foreground hover:bg-background/90 transition-all opacity-0 group-hover:opacity-100 z-10",
        style: { fontSize: "16px" },
        children: "›"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10", children: images.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setCurrent(i),
        "aria-label": `Go to image ${i + 1}`,
        className: "transition-all duration-300",
        style: {
          width: i === current ? "20px" : "6px",
          height: "6px",
          borderRadius: "3px",
          background: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "absolute top-3 right-3 z-10 text-[10px] uppercase tracking-widest px-2 py-1",
        style: {
          background: "rgba(0,0,0,0.55)",
          color: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(4px)"
        },
        children: [
          current + 1,
          " / ",
          images.length
        ]
      }
    )
  ] });
}
function ArtworkDetail() {
  const {
    id
  } = Route.useParams();
  const [art, setArt] = reactExports.useState(null);
  const [loaded, setLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setLoaded(false);
    fetchArtworkById(id).then((found) => {
      setArt(found);
      setLoaded(true);
    }).catch((err) => {
      console.error(err);
      setArt(null);
      setLoaded(true);
    });
  }, [id]);
  if (loaded && !art) {
    throw notFound();
  }
  if (!art) return null;
  const allImages = art.images && art.images.length > 0 ? art.images : art.image ? [art.image] : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-24 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageSlider, { images: allImages, title: art.title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/gallery", className: "text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground mb-8", children: "← Back to gallery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4", children: [
          art.medium,
          " · ",
          art.year,
          allImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-3 opacity-50", children: [
            "· ",
            allImages.length,
            " views"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display text-6xl md:text-7xl leading-none mb-8", children: art.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ink-divider mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-10 text-lg", children: art.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-y-4 text-sm mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground uppercase tracking-wider text-xs", children: "Dimensions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: art.dimensions }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground uppercase tracking-wider text-xs", children: "Year" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: art.year }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground uppercase tracking-wider text-xs", children: "Medium" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "capitalize", children: art.medium }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground uppercase tracking-wider text-xs", children: "Edition" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: "Original · 1 of 1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ink-divider mb-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.25em] text-muted-foreground", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-display text-4xl", children: [
            "$",
            art.price.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", search: {
            subject: `Purchase: ${art.title}`
          }, className: "flex-1 text-center px-8 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] hover:bg-primary/90 transition-colors", children: "Inquire to purchase" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", search: {
            subject: `Question about ${art.title}`
          }, className: "px-8 py-4 border border-border text-xs uppercase tracking-[0.25em] hover:bg-card transition-colors text-center", children: "Ask a question" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-xs text-muted-foreground leading-relaxed", children: "Shipped worldwide in a custom archival crate. Allow 7–14 days for framing." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ArtworkDetail as component
};
