import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { g as gsapWithCSS, S as ScrollTrigger } from "../_libs/gsap.mjs";
const PLACEHOLDER_WORKS = [
  {
    id: "demo-1",
    title: "Whispers in Graphite",
    medium: "charcoal",
    year: 2025,
    dimensions: "24 × 36 in",
    price: 4500,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9fd0c121?w=600&q=80",
    description: "A study in shadow and silence."
  },
  {
    id: "demo-2",
    title: "Monochrome Reverie",
    medium: "paintings",
    year: 2024,
    dimensions: "30 × 40 in",
    price: 6200,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",
    description: "Oil on canvas. A meditation on light."
  },
  {
    id: "demo-3",
    title: "Fractured Light",
    medium: "sketches",
    year: 2025,
    dimensions: "18 × 24 in",
    price: 2800,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    description: "Pencil on archival paper."
  },
  {
    id: "demo-4",
    title: "Still Life — Silence",
    medium: "charcoal",
    year: 2024,
    dimensions: "20 × 28 in",
    price: 3800,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80",
    description: "Charcoal on textured paper."
  },
  {
    id: "demo-5",
    title: "Abstract Emotion No. 7",
    medium: "paintings",
    year: 2025,
    dimensions: "36 × 48 in",
    price: 8500,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80",
    description: "Bold gestural strokes on canvas."
  },
  {
    id: "demo-6",
    title: "Portrait Study — IV",
    medium: "sketches",
    year: 2024,
    dimensions: "14 × 18 in",
    price: 2200,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
    description: "Graphite portrait study."
  }
];
if (typeof window !== "undefined") {
  gsapWithCSS.registerPlugin(ScrollTrigger);
}
function ArtworkCard({ art, index = 0 }) {
  const [imgLoaded, setImgLoaded] = reactExports.useState(false);
  const [hovered, setHovered] = reactExports.useState(false);
  const cardRef = reactExports.useRef(null);
  const cardBoxRef = reactExports.useRef(null);
  const imageRef = reactExports.useRef(null);
  const shineRef = reactExports.useRef(null);
  const imageCount = art.images && art.images.length > 1 ? art.images.length : 0;
  const num = String(index + 1).padStart(2, "0");
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || !cardRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsapWithCSS.context(() => {
      gsapWithCSS.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.9, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, []);
  const handleMouseMove = (e) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    if (!cardBoxRef.current) return;
    const rect = cardBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -10;
    const rotateY = (x - centerX) / centerX * 10;
    gsapWithCSS.to(cardBoxRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.25,
      ease: "power2.out"
    });
    if (shineRef.current) {
      gsapWithCSS.to(shineRef.current, {
        x: x / rect.width * 100 + "%",
        y: y / rect.height * 100 + "%",
        duration: 0.2
      });
    }
  };
  const handleMouseEnter = () => {
    setHovered(true);
    if (!cardBoxRef.current) return;
    gsapWithCSS.to(cardBoxRef.current, {
      y: -10,
      boxShadow: "8px 12px 0px #0B0C10, 0 20px 40px rgba(0,0,0,0.12)",
      borderColor: "#0B0C10",
      duration: 0.3,
      ease: "back.out(1.7)"
    });
    if (imageRef.current) {
      gsapWithCSS.to(imageRef.current, {
        scale: 1.09,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (!cardBoxRef.current) return;
    gsapWithCSS.to(cardBoxRef.current, {
      y: 0,
      rotateX: 0,
      rotateY: 0,
      boxShadow: "4px 4px 0px #0B0C10, 0 6px 20px rgba(0,0,0,0.06)",
      borderColor: "#0B0C10",
      duration: 0.4,
      ease: "power3.out"
    });
    if (imageRef.current) {
      gsapWithCSS.to(imageRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };
  const handleMouseDown = () => {
    if (!cardBoxRef.current) return;
    gsapWithCSS.to(cardBoxRef.current, {
      scale: 0.96,
      duration: 0.1,
      ease: "power2.out"
    });
  };
  const handleMouseUp = () => {
    if (!cardBoxRef.current) return;
    gsapWithCSS.to(cardBoxRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "elastic.out(1.2, 0.4)"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      ref: cardRef,
      to: art.id.startsWith("demo-") ? "/gallery" : "/artwork/$id",
      params: { id: art.id },
      className: "group block",
      id: `artwork-card-${art.id}`,
      style: { textDecoration: "none" },
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseMove: handleMouseMove,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: cardBoxRef,
          style: {
            position: "relative",
            background: "#FFFFFF",
            border: "2px solid #0B0C10",
            boxShadow: "4px 4px 0px #0B0C10, 0 6px 20px rgba(0,0,0,0.06)",
            transformStyle: "preserve-3d",
            willChange: "transform",
            clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "16px",
                  height: "16px",
                  borderTop: "3px solid #E6B800",
                  borderLeft: "3px solid #E6B800",
                  zIndex: 3,
                  pointerEvents: "none"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "16px",
                  height: "16px",
                  borderBottom: "3px solid #00B8D4",
                  borderRight: "3px solid #00B8D4",
                  zIndex: 3,
                  pointerEvents: "none"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  top: "10px",
                  left: "14px",
                  zIndex: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    style: {
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      fontWeight: 800,
                      letterSpacing: "0.2em",
                      color: "#0B0C10",
                      textTransform: "uppercase",
                      background: "#F5E000",
                      padding: "2px 6px"
                    },
                    children: [
                      num,
                      " / ARTWORK"
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  position: "absolute",
                  top: "10px",
                  right: "14px",
                  zIndex: 4,
                  padding: "3px 8px",
                  border: "1px solid #00B04F",
                  background: "rgba(0,176,79,0.1)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      fontFamily: "var(--font-mono)",
                      fontSize: "8px",
                      fontWeight: 800,
                      letterSpacing: "0.25em",
                      color: "#00B04F",
                      textTransform: "uppercase"
                    },
                    children: "ORIGINAL"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  aspectRatio: "4/5",
                  overflow: "hidden",
                  position: "relative",
                  background: "#F1F3F9",
                  marginTop: "38px"
                },
                children: [
                  !imgLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(90deg, #F1F3F9 0%, #E4E7F0 50%, #F1F3F9 100%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      ref: imageRef,
                      src: art.image,
                      alt: art.title,
                      loading: "lazy",
                      onLoad: () => setImgLoaded(true),
                      style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: imgLoaded ? 1 : 0,
                        transition: "opacity 0.5s ease"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      ref: shineRef,
                      style: {
                        position: "absolute",
                        top: "-50%",
                        left: "-50%",
                        width: "200%",
                        height: "200%",
                        background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%)",
                        opacity: hovered ? 0.6 : 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: "none",
                        zIndex: 2
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "20px 14px 14px",
                        background: "linear-gradient(to top, rgba(11,12,16,0.9) 0%, transparent 100%)",
                        opacity: hovered ? 1 : 0,
                        transform: hovered ? "translateY(0)" : "translateY(10px)",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                        zIndex: 3
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            fontWeight: 800,
                            letterSpacing: "0.2em",
                            color: "#F5E000",
                            textTransform: "uppercase"
                          },
                          children: "VIEW ARTWORK →"
                        }
                      )
                    }
                  ),
                  imageCount > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "3px 8px",
                        background: "#0B0C10",
                        color: "#FFFFFF",
                        zIndex: 4
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "9px",
                            fontWeight: 700,
                            letterSpacing: "0.1em"
                          },
                          children: [
                            "+",
                            imageCount,
                            " VIEWS"
                          ]
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  padding: "16px",
                  borderTop: "2px solid #0B0C10",
                  background: "#FFFFFF"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "glitch",
                      style: {
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "clamp(16px, 2.5vw, 22px)",
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        color: hovered ? "#E6B800" : "#0B0C10",
                        lineHeight: 1.1,
                        marginBottom: "10px",
                        transition: "color 0.3s ease"
                      },
                      children: art.title
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            style: {
                              fontFamily: "var(--font-mono)",
                              fontSize: "10px",
                              fontWeight: 700,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: "#4A4D58"
                            },
                            children: [
                              art.medium,
                              " · ",
                              art.year
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "8px"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "span",
                                {
                                  style: {
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 900,
                                    fontSize: "16px",
                                    color: "#0B0C10",
                                    letterSpacing: "0.02em",
                                    background: "#F5E000",
                                    padding: "2px 8px",
                                    border: "1px solid #0B0C10"
                                  },
                                  children: [
                                    "₹",
                                    art.price.toLocaleString()
                                  ]
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "14px",
                                    fontWeight: 900,
                                    color: hovered ? "#E6B800" : "#0B0C10",
                                    transition: "transform 0.3s ease",
                                    transform: hovered ? "translateX(4px)" : "translateX(0)",
                                    display: "inline-block"
                                  },
                                  children: "→"
                                }
                              )
                            ]
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}
export {
  ArtworkCard as A,
  PLACEHOLDER_WORKS as P
};
