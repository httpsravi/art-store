import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as Navbar, F as Footer } from "./Footer-BqGRfv5k.mjs";
import { f as fetchArtworks, M as MEDIUMS } from "./artworks-BsOkITqu.mjs";
import { P as PLACEHOLDER_WORKS, A as ArtworkCard } from "./ArtworkCard-OV3y0XLg.mjs";
import { g as gsapWithCSS, S as ScrollTrigger } from "../_libs/gsap.mjs";
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
if (typeof window !== "undefined") {
  gsapWithCSS.registerPlugin(ScrollTrigger);
}
const MEDIUM_META = {
  charcoal: {
    index: "01",
    tag: "SHADOW // SOLID",
    description: "Raw carbon marks on archival paper. Pure physical texture."
  },
  paintings: {
    index: "02",
    tag: "PIGMENT // PULSE",
    description: "Heavy oil on canvas. Vibrant chaos sculpted into form."
  },
  sketches: {
    index: "03",
    tag: "VECTOR // DRAFT",
    description: "Graphite velocity studies. Raw energy in high contrast."
  }
};
function Home() {
  const [works, setWorks] = reactExports.useState([]);
  const heroRef = reactExports.useRef(null);
  const heroPillsRef = reactExports.useRef(null);
  const line1Ref = reactExports.useRef(null);
  const line2Ref = reactExports.useRef(null);
  const heroDescRef = reactExports.useRef(null);
  const heroBtnsRef = reactExports.useRef(null);
  const heroHudRef = reactExports.useRef(null);
  const orb1Ref = reactExports.useRef(null);
  const orb2Ref = reactExports.useRef(null);
  const spinRingRef = reactExports.useRef(null);
  const categoriesRef = reactExports.useRef(null);
  const categoriesGridRef = reactExports.useRef(null);
  const featuredWorksRef = reactExports.useRef(null);
  const commissionCtaRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    fetchArtworks().then((data) => {
      setWorks(data.length > 0 ? data : PLACEHOLDER_WORKS);
    }).catch(() => {
      setWorks(PLACEHOLDER_WORKS);
    });
  }, []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || !heroRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsapWithCSS.context(() => {
      const tl = gsapWithCSS.timeline({
        defaults: {
          ease: "power3.out"
        }
      });
      tl.fromTo(heroPillsRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.8
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }).fromTo(line1Ref.current, {
        opacity: 0,
        y: 80,
        skewX: -12,
        scale: 1.2
      }, {
        opacity: 1,
        y: 0,
        skewX: 0,
        scale: 1,
        duration: 0.9,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.3").fromTo(line2Ref.current, {
        opacity: 0,
        y: 80,
        skewX: 12,
        scale: 1.2
      }, {
        opacity: 1,
        y: 0,
        skewX: 0,
        scale: 1,
        duration: 0.9,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.6").fromTo(heroDescRef.current, {
        opacity: 0,
        x: -40
      }, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out"
      }, "-=0.4").fromTo(heroBtnsRef.current?.children ? Array.from(heroBtnsRef.current.children) : heroBtnsRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.4").fromTo(heroHudRef.current, {
        opacity: 0,
        scale: 0.5
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.8
      }, "-=0.5");
      if (spinRingRef.current) {
        gsapWithCSS.to(spinRingRef.current, {
          rotation: 360,
          duration: 30,
          repeat: -1,
          ease: "none"
        });
      }
      if (orb1Ref.current) {
        gsapWithCSS.to(orb1Ref.current, {
          y: 40,
          x: 20,
          scale: 1.15,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
      if (orb2Ref.current) {
        gsapWithCSS.to(orb2Ref.current, {
          y: -40,
          x: -20,
          scale: 1.2,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
      if (categoriesRef.current) {
        gsapWithCSS.fromTo(categoriesRef.current.querySelector(".section-header-box"), {
          opacity: 0,
          y: 40,
          rotateX: 15
        }, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 85%"
          }
        });
      }
      if (categoriesGridRef.current) {
        gsapWithCSS.fromTo(categoriesGridRef.current.children, {
          opacity: 0,
          y: 50,
          scale: 0.95
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: categoriesGridRef.current,
            start: "top 85%"
          }
        });
      }
      if (featuredWorksRef.current) {
        gsapWithCSS.fromTo(featuredWorksRef.current.querySelector(".featured-header"), {
          opacity: 0,
          y: 40
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuredWorksRef.current,
            start: "top 85%"
          }
        });
      }
      if (commissionCtaRef.current) {
        gsapWithCSS.fromTo(commissionCtaRef.current, {
          opacity: 0,
          scale: 0.9,
          y: 40
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: commissionCtaRef.current,
            start: "top 85%"
          }
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);
  const featured = works.slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    minHeight: "100vh",
    background: "var(--cp-bg)",
    overflowX: "hidden"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: heroRef, id: "hero", style: {
      position: "relative",
      minHeight: "100svh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
      paddingTop: "90px",
      paddingBottom: "40px",
      background: "#F8F9FC"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, style: {
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(11,12,16,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,12,16,0.04) 1px, transparent 1px)",
        backgroundSize: "clamp(40px, 8vw, 80px) clamp(40px, 8vw, 80px)",
        zIndex: 0,
        pointerEvents: "none"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: orb1Ref, "aria-hidden": true, style: {
        position: "absolute",
        top: "15%",
        left: "-5%",
        width: "450px",
        height: "450px",
        background: "radial-gradient(circle, rgba(245,224,0,0.25) 0%, transparent 70%)",
        filter: "blur(70px)",
        pointerEvents: "none",
        zIndex: 0
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: orb2Ref, "aria-hidden": true, style: {
        position: "absolute",
        bottom: "10%",
        right: "-5%",
        width: "450px",
        height: "450px",
        background: "radial-gradient(circle, rgba(0,229,255,0.22) 0%, transparent 70%)",
        filter: "blur(70px)",
        pointerEvents: "none",
        zIndex: 0
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: spinRingRef, "aria-hidden": true, style: {
        position: "absolute",
        top: "20%",
        right: "5%",
        width: "320px",
        height: "320px",
        border: "2px dashed rgba(11,12,16,0.12)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 0
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, style: {
        position: "absolute",
        top: "100px",
        left: "20px",
        pointerEvents: "none",
        zIndex: 2
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: "28px",
        height: "28px",
        borderTop: "3px solid #0B0C10",
        borderLeft: "3px solid #0B0C10"
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, style: {
        position: "absolute",
        bottom: "40px",
        right: "20px",
        pointerEvents: "none",
        zIndex: 2
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: "28px",
        height: "28px",
        borderBottom: "3px solid #0B0C10",
        borderRight: "3px solid #0B0C10"
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: heroHudRef, "aria-hidden": true, style: {
        position: "absolute",
        top: "100px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        alignItems: "flex-end",
        pointerEvents: "none",
        zIndex: 2
      }, children: ["SYS//RAVI.DAVINCI", "WHITE_EDITION_2049", "ONLINE // 100%"].map((label) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
        fontFamily: "var(--font-mono)",
        fontSize: "9px",
        fontWeight: 800,
        letterSpacing: "0.2em",
        color: "#4A4D58",
        textTransform: "uppercase",
        background: "#FFFFFF",
        padding: "2px 8px",
        border: "1px solid rgba(11,12,16,0.12)"
      }, children: label }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        position: "relative",
        zIndex: 10,
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 20px",
        width: "100%"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: heroPillsRef, style: {
          display: "flex",
          gap: "10px",
          marginBottom: "24px",
          flexWrap: "wrap",
          alignItems: "center"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "#F5E000",
            color: "#0B0C10",
            padding: "4px 10px",
            fontWeight: 900,
            border: "1px solid #0B0C10",
            boxShadow: "3px 3px 0px #0B0C10",
            display: "inline-block"
          }, children: "ORIGINAL ARTWORK" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#0B0C10",
            border: "1px solid #0B0C10",
            padding: "4px 10px",
            background: "#FFFFFF",
            fontWeight: 800,
            boxShadow: "3px 3px 0px #00B8D4",
            display: "inline-block"
          }, children: "WORLDWIDE EXPRESS SHIPPING" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: "0"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: {
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(3.2rem, 12vw, 11rem)",
          lineHeight: 0.88,
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
          color: "#0B0C10",
          margin: 0,
          wordBreak: "break-word"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref: line1Ref, style: {
            display: "block",
            color: "#0B0C10",
            textShadow: "4px 4px 0px #F5E000"
          }, children: "RAVI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref: line2Ref, style: {
            display: "block",
            color: "#0B0C10",
            background: "linear-gradient(90deg, #0B0C10 0%, #333 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(4px 4px 0px #00B8D4)"
          }, children: "DAVINCI." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "28px",
          alignItems: "end",
          marginTop: "36px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: heroDescRef, style: {
            background: "#FFFFFF",
            border: "2px solid #0B0C10",
            borderLeft: "6px solid #F5E000",
            padding: "20px 24px",
            boxShadow: "6px 6px 0px rgba(11,12,16,0.1)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#0B0C10",
              marginBottom: "8px",
              fontWeight: 900
            }, children: "// ARTWORK DIRECTIVE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
              fontSize: "14px",
              color: "#4A4D58",
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 500
            }, children: "Raw charcoal, heavy acrylics, and graphite studies. Hand-drawn physical pieces infused with rebellious cyber aesthetics." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: heroBtnsRef, style: {
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            width: "100%"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/gallery", id: "hero-gallery-cta", className: "cyber-btn", onMouseEnter: (e) => {
              gsapWithCSS.to(e.currentTarget, {
                scale: 1.04,
                duration: 0.25,
                ease: "back.out(2)"
              });
            }, onMouseLeave: (e) => {
              gsapWithCSS.to(e.currentTarget, {
                scale: 1,
                duration: 0.25,
                ease: "power2.out"
              });
            }, onMouseDown: (e) => {
              gsapWithCSS.to(e.currentTarget, {
                scale: 0.96,
                duration: 0.1
              });
            }, onMouseUp: (e) => {
              gsapWithCSS.to(e.currentTarget, {
                scale: 1.04,
                duration: 0.15
              });
            }, style: {
              width: "100%",
              justifyContent: "center",
              fontSize: "12px",
              padding: "18px 24px",
              textAlign: "center"
            }, children: "EXPLORE GALLERY →" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", id: "hero-commission-cta", className: "cyber-btn-secondary", onMouseEnter: (e) => {
              gsapWithCSS.to(e.currentTarget, {
                scale: 1.04,
                duration: 0.25,
                ease: "back.out(2)"
              });
            }, onMouseLeave: (e) => {
              gsapWithCSS.to(e.currentTarget, {
                scale: 1,
                duration: 0.25,
                ease: "power2.out"
              });
            }, onMouseDown: (e) => {
              gsapWithCSS.to(e.currentTarget, {
                scale: 0.96,
                duration: 0.1
              });
            }, onMouseUp: (e) => {
              gsapWithCSS.to(e.currentTarget, {
                scale: 1.04,
                duration: 0.15
              });
            }, style: {
              width: "100%",
              justifyContent: "center",
              fontSize: "11px",
              padding: "16px 24px",
              textAlign: "center"
            }, children: "COMMISSION A CUSTOM PIECE" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        position: "relative",
        marginTop: "48px",
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        zIndex: 10
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          fontWeight: 800,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#0B0C10"
        }, children: "SCROLL DOWN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "2px",
          height: "28px",
          background: "linear-gradient(180deg, #0B0C10, transparent)"
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #E6B800, #00B8D4, #FF0055)",
        zIndex: 5
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: categoriesRef, id: "categories", style: {
      position: "relative",
      zIndex: 10,
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "80px 20px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header-box", style: {
        marginBottom: "40px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-label", style: {
          marginBottom: "12px"
        }, children: "MEDIUM ARCHIVE // SELECTION" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: {
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(2rem, 7vw, 5rem)",
          textTransform: "uppercase",
          lineHeight: 0.95,
          color: "#0B0C10",
          margin: 0
        }, children: [
          "DISCIPLINE & ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            color: "#E6B800"
          }, children: "MEDIUM." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: categoriesGridRef, style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
        gap: "20px"
      }, children: MEDIUMS.filter((m) => m.id !== "all").map((m) => {
        const meta = MEDIUM_META[m.id] ?? {
          index: "00",
          tag: "MEDIUM",
          description: ""
        };
        const count = works.filter((a) => a.medium === m.id).length;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MediumCard, { to: "/gallery", search: {
          medium: m.id
        }, index: meta.index, tag: meta.tag, label: m.label, description: meta.description, count }, m.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: featuredWorksRef, id: "featured-works", style: {
      position: "relative",
      zIndex: 10,
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 20px 80px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "yellow-strip", style: {
        marginBottom: "48px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "featured-header", style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "36px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-label", style: {
            marginBottom: "8px"
          }, children: "DROP // 07" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: {
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            textTransform: "uppercase",
            lineHeight: 0.95,
            color: "#0B0C10",
            margin: 0
          }, children: [
            "FEATURED ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: "#E6B800"
            }, children: "WORKS." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/gallery", id: "featured-see-all", onMouseEnter: (e) => {
          gsapWithCSS.to(e.currentTarget, {
            x: 6,
            duration: 0.2,
            ease: "power2.out"
          });
        }, onMouseLeave: (e) => {
          gsapWithCSS.to(e.currentTarget, {
            x: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        }, style: {
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          fontWeight: 800,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#0B0C10",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: "2px solid #0B0C10",
          paddingBottom: "4px"
        }, children: "VIEW ALL ARTWORKS →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
        gap: "20px"
      }, children: featured.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArtworkCard, { art: a, index: i }, a.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "commission-cta", style: {
      position: "relative",
      zIndex: 10,
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 20px 100px"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: commissionCtaRef, style: {
      position: "relative",
      border: "2px solid #0B0C10",
      background: "#FFFFFF",
      padding: "clamp(32px, 6vw, 64px) clamp(20px, 5vw, 48px)",
      overflow: "hidden",
      boxShadow: "8px 8px 0px #0B0C10"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "24px",
        height: "24px",
        borderTop: "3px solid #E6B800",
        borderLeft: "3px solid #E6B800"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "24px",
        height: "24px",
        borderBottom: "3px solid #00B8D4",
        borderRight: "3px solid #00B8D4"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        fontWeight: 800,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "#0B0C10",
        marginBottom: "16px"
      }, children: "// CUSTOM COMMISSION PROTOCOL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: {
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: "clamp(1.8rem, 6vw, 4.5rem)",
        textTransform: "uppercase",
        lineHeight: 0.95,
        color: "#0B0C10",
        marginBottom: "20px"
      }, children: [
        "WANT A ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          color: "#E6B800"
        }, children: "CUSTOM" }),
        " PIECE?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
        fontSize: "15px",
        color: "#4A4D58",
        lineHeight: 1.7,
        maxWidth: "540px",
        marginBottom: "32px",
        fontWeight: 500
      }, children: "Direct commissions are currently open for custom canvas portraits, anime art, and large charcoal pieces." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", id: "commission-start-cta", className: "cyber-btn", onMouseEnter: (e) => {
        gsapWithCSS.to(e.currentTarget, {
          scale: 1.04,
          duration: 0.2,
          ease: "power2.out"
        });
      }, onMouseLeave: (e) => {
        gsapWithCSS.to(e.currentTarget, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      }, onMouseDown: (e) => {
        gsapWithCSS.to(e.currentTarget, {
          scale: 0.96,
          duration: 0.1
        });
      }, onMouseUp: (e) => {
        gsapWithCSS.to(e.currentTarget, {
          scale: 1.04,
          duration: 0.15
        });
      }, style: {
        display: "inline-flex",
        justifyContent: "center",
        width: "100%",
        maxWidth: "320px",
        fontSize: "11px",
        padding: "16px",
        textAlign: "center"
      }, children: "INITIATE COMMISSION →" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function MediumCard({
  to,
  search,
  index,
  tag,
  label,
  description,
  count
}) {
  const [hovered, setHovered] = reactExports.useState(false);
  const cardRef = reactExports.useRef(null);
  const handleMouseEnter = () => {
    setHovered(true);
    if (cardRef.current) {
      gsapWithCSS.to(cardRef.current, {
        y: -6,
        boxShadow: "6px 6px 0px #0B0C10",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (cardRef.current) {
      gsapWithCSS.to(cardRef.current, {
        y: 0,
        boxShadow: "3px 3px 0px rgba(11,12,16,0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, search, id: `medium-card-${label.toLowerCase()}`, style: {
    textDecoration: "none"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: cardRef, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, style: {
    position: "relative",
    background: "#FFFFFF",
    border: "2px solid #0B0C10",
    boxShadow: "3px 3px 0px rgba(11,12,16,0.1)",
    padding: "28px 24px",
    minHeight: "220px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    willChange: "transform"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        fontWeight: 800,
        letterSpacing: "0.2em",
        color: "#0B0C10",
        background: "#F5E000",
        padding: "2px 6px"
      }, children: [
        index,
        " // ",
        tag
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
        fontFamily: "var(--font-mono)",
        fontSize: "9px",
        fontWeight: 700,
        letterSpacing: "0.15em",
        color: "#4A4D58",
        border: "1px solid #0B0C10",
        padding: "2px 6px"
      }, children: [
        count,
        " ",
        count === 1 ? "PIECE" : "PIECES"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      marginTop: "24px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: {
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        textTransform: "uppercase",
        color: hovered ? "#E6B800" : "#0B0C10",
        margin: 0,
        lineHeight: 1,
        transition: "color 0.2s ease"
      }, children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "#4A4D58",
        marginTop: "8px",
        marginBottom: "16px",
        lineHeight: 1.5,
        fontWeight: 500
      }, children: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        fontWeight: 800,
        letterSpacing: "0.2em",
        color: "#00B8D4",
        textTransform: "uppercase",
        display: "inline-block",
        transform: hovered ? "translateX(6px)" : "none",
        transition: "transform 0.25s ease"
      }, children: "BROWSE COLLECTION →" })
    ] })
  ] }) });
}
export {
  Home as component
};
