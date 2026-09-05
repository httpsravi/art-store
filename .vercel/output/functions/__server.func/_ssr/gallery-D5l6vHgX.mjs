import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-BqGRfv5k.mjs";
import { f as fetchArtworks, M as MEDIUMS } from "./artworks-BsOkITqu.mjs";
import { P as PLACEHOLDER_WORKS, A as ArtworkCard } from "./ArtworkCard-OV3y0XLg.mjs";
import { g as gsapWithCSS } from "../_libs/gsap.mjs";
import { R as Route$5 } from "./router-BLU6E_xi.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
function Gallery() {
  const {
    medium = "all"
  } = Route$5.useSearch();
  const [works, setWorks] = reactExports.useState([]);
  const [activeHover, setActiveHover] = reactExports.useState(null);
  const headerRef = reactExports.useRef(null);
  const filterStripRef = reactExports.useRef(null);
  const gridRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    fetchArtworks().then((data) => {
      setWorks(data.length > 0 ? data : PLACEHOLDER_WORKS);
    }).catch(() => {
      setWorks(PLACEHOLDER_WORKS);
    });
  }, [medium]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || !headerRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsapWithCSS.context(() => {
      const tl = gsapWithCSS.timeline({
        defaults: {
          ease: "power3.out"
        }
      });
      tl.fromTo(".gallery-header-item", {
        opacity: 0,
        y: 30,
        skewY: 2
      }, {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.4)"
      }).fromTo(filterStripRef.current, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.5
      }, "-=0.3");
    }, headerRef);
    return () => ctx.revert();
  }, []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || !gridRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsapWithCSS.context(() => {
      if (gridRef.current && gridRef.current.children.length > 0) {
        gsapWithCSS.fromTo(gridRef.current.children, {
          opacity: 0,
          scale: 0.9,
          y: 30
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "back.out(1.5)"
        });
      }
    }, gridRef);
    return () => ctx.revert();
  }, [medium, works]);
  const filtered = medium && medium !== "all" ? works.filter((a) => a.medium === medium) : works;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    minHeight: "100vh",
    background: "var(--cp-bg)",
    overflowX: "hidden"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { style: {
      paddingTop: "80px",
      paddingBottom: "80px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: headerRef, style: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "36px 16px 0",
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gallery-header-item", style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "#F5E000",
          border: "2px solid #0B0C10",
          boxShadow: "3px 3px 0px #0B0C10",
          padding: "6px 14px",
          marginBottom: "20px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            width: "8px",
            height: "8px",
            background: "#0B0C10",
            borderRadius: "50%",
            display: "inline-block"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "#0B0C10",
            textTransform: "uppercase",
            fontWeight: 900
          }, children: "ARCHIVE // COLLECTION 2049" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gallery-header-item", style: {
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "32px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: {
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.8rem, 10vw, 8rem)",
            textTransform: "uppercase",
            lineHeight: 0.9,
            color: "#0B0C10",
            margin: 0,
            letterSpacing: "-0.01em"
          }, children: [
            "ARTWORK ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: "#E6B800"
            }, children: "GALLERY." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
            fontSize: "14px",
            color: "#4A4D58",
            lineHeight: 1.6,
            maxWidth: "540px",
            margin: 0,
            fontWeight: 500
          }, children: "Original 1-of-1 physical artworks. Each piece is signed, certificate verified, and shipped in custom archival packaging." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: filterStripRef, style: {
          borderTop: "2px solid #0B0C10",
          borderBottom: "2px solid #0B0C10",
          padding: "16px 0",
          marginBottom: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          background: "#FFFFFF"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            paddingBottom: "4px",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }, children: MEDIUMS.map((m) => {
            const active = (medium ?? "all") === m.id;
            const hovered = activeHover === m.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/gallery", search: {
              medium: m.id
            }, id: `filter-${m.id}`, onMouseEnter: () => setActiveHover(m.id), onMouseLeave: () => setActiveHover(null), style: {
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "10px 18px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.2s ease",
              background: active ? "#0B0C10" : hovered ? "#F5E000" : "#F1F3F9",
              color: active ? "#FFFFFF" : "#0B0C10",
              border: "2px solid #0B0C10",
              boxShadow: active ? "4px 4px 0px #E6B800" : "none"
            }, children: m.label }, m.id);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "10px",
            borderTop: "1px dashed rgba(11,12,16,0.15)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#4A4D58"
            }, children: [
              "FILTER // ",
              medium.toUpperCase()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "#4A4D58"
              }, children: "TOTAL:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "18px",
                color: "#0B0C10",
                background: "#F5E000",
                padding: "2px 8px",
                border: "1px solid #0B0C10",
                lineHeight: 1
              }, children: String(filtered.length).padStart(2, "0") })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 16px"
      }, children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        textAlign: "center",
        padding: "80px 20px",
        border: "2px solid #0B0C10",
        background: "#FFFFFF",
        boxShadow: "6px 6px 0px #0B0C10"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          fontWeight: 800,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#0B0C10",
          marginBottom: "20px"
        }, children: "// NO ARTWORKS FOUND IN THIS CATEGORY." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/gallery", search: {
          medium: "all"
        }, className: "cyber-btn", style: {
          display: "inline-flex"
        }, children: "VIEW ALL WORKS →" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: gridRef, style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
        gap: "20px"
      }, children: filtered.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArtworkCard, { art: a, index: i }, a.id)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Gallery as component
};
