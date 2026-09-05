import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { g as gsapWithCSS } from "../_libs/gsap.mjs";
import { I as Instagram, M as Mail, a as MapPin } from "../_libs/lucide-react.mjs";
const links = [
  { to: "/", label: "Home", num: "01" },
  { to: "/gallery", label: "Gallery", num: "02" },
  { to: "/about", label: "About", num: "03" },
  { to: "/contact", label: "Contact", num: "04" }
];
function Navbar() {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const headerRef = reactExports.useRef(null);
  const logoRef = reactExports.useRef(null);
  const navLinksRef = reactExports.useRef(null);
  const drawerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsapWithCSS.context(() => {
      gsapWithCSS.fromTo(
        headerRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "bounce.out" }
      );
      if (navLinksRef.current) {
        gsapWithCSS.fromTo(
          navLinksRef.current.children,
          { y: -20, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.7)",
            delay: 0.2
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined" || !drawerRef.current) return;
    if (isOpen) {
      const items = drawerRef.current.querySelectorAll(".nav-drawer-item");
      gsapWithCSS.fromTo(
        drawerRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.45, ease: "power4.out" }
      );
      gsapWithCSS.fromTo(
        items,
        { x: 50, opacity: 0, skewX: -10 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.4)",
          delay: 0.15
        }
      );
    } else {
      gsapWithCSS.to(drawerRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.35,
        ease: "power3.in"
      });
    }
  }, [isOpen]);
  const handleLogoMouseEnter = () => {
    if (!logoRef.current) return;
    gsapWithCSS.to(logoRef.current, {
      scale: 1.12,
      rotation: -3,
      duration: 0.4,
      ease: "elastic.out(1.2, 0.4)"
    });
  };
  const handleLogoMouseLeave = () => {
    if (!logoRef.current) return;
    gsapWithCSS.to(logoRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  const handleLinkMouseEnter = (e) => {
    const underline = e.currentTarget.querySelector(".nav-underline");
    if (underline) {
      gsapWithCSS.to(underline, {
        scaleX: 1,
        height: "100%",
        opacity: 0.15,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };
  const handleLinkMouseLeave = (e, active) => {
    const underline = e.currentTarget.querySelector(".nav-underline");
    if (underline && !active) {
      gsapWithCSS.to(underline, {
        scaleX: 0,
        height: "2px",
        opacity: 1,
        duration: 0.25,
        ease: "power2.inOut"
      });
    } else if (underline && active) {
      gsapWithCSS.to(underline, {
        scaleX: 1,
        height: "2px",
        opacity: 1,
        duration: 0.25,
        ease: "power2.inOut"
      });
    }
  };
  const isActive = (to) => to === "/" ? pathname === "/" : pathname.startsWith(to);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "header",
      {
        ref: headerRef,
        id: "navbar",
        className: "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        style: {
          background: scrolled ? "rgba(255, 255, 255, 0.95)" : "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "2px solid #0B0C10" : "none",
          boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.06)" : "none"
        },
        children: [
          scrolled && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #E6B800, #00B8D4, #FF0055)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                ref: logoRef,
                to: "/",
                id: "nav-logo",
                onClick: () => setIsOpen(false),
                onMouseEnter: handleLogoMouseEnter,
                onMouseLeave: handleLogoMouseLeave,
                className: "relative z-50 flex items-center gap-2",
                style: { textDecoration: "none", display: "inline-flex" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      style: {
                        fontFamily: "var(--font-display)",
                        fontWeight: 900,
                        fontSize: "clamp(16px, 3vw, 22px)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#0B0C10"
                      },
                      children: [
                        "RAVI",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#E6B800" }, children: "//" }),
                        "DAVINCI"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-badge", style: { marginLeft: "8px" }, children: "ONLINE" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "ul",
              {
                ref: navLinksRef,
                className: "hidden md:flex items-center gap-8",
                style: { listStyle: "none", margin: 0, padding: 0 },
                children: links.map((l) => {
                  const active = isActive(l.to);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: l.to,
                      id: `nav-link-${l.label.toLowerCase()}`,
                      onMouseEnter: handleLinkMouseEnter,
                      onMouseLeave: (e) => handleLinkMouseLeave(e, active),
                      className: "relative group",
                      style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: active ? "#0B0C10" : "#4A4D58",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "4px",
                        padding: "6px 14px",
                        position: "relative"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontSize: "8px",
                              color: active ? "#E6B800" : "#8A8E9E",
                              transition: "color 0.2s ease"
                            },
                            children: l.num
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { transition: "color 0.2s ease", zIndex: 2 }, children: l.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "nav-underline",
                            style: {
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: active ? "2px" : "2px",
                              background: "#0B0C10",
                              transform: active ? "scaleX(1)" : "scaleX(0)",
                              transformOrigin: "center",
                              borderRadius: "2px",
                              zIndex: 1
                            }
                          }
                        )
                      ]
                    }
                  ) }, l.to);
                })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "#8A8E9E",
                    textTransform: "uppercase"
                  },
                  children: "KA//IND"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/admin",
                  id: "nav-studio",
                  style: {
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#0B0C10",
                    textDecoration: "none",
                    border: "2px solid #0B0C10",
                    padding: "6px 12px",
                    boxShadow: "3px 3px 0px #E6B800",
                    transition: "all 0.2s ease"
                  },
                  onMouseEnter: (e) => {
                    gsapWithCSS.to(e.currentTarget, { scale: 1.05, boxShadow: "4px 4px 0px #00B8D4", duration: 0.2 });
                  },
                  onMouseLeave: (e) => {
                    gsapWithCSS.to(e.currentTarget, { scale: 1, boxShadow: "3px 3px 0px #E6B800", duration: 0.2 });
                  },
                  children: "STUDIO"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                id: "nav-mobile-toggle",
                onClick: () => setIsOpen(!isOpen),
                className: "md:hidden relative z-50 flex flex-col items-center justify-center gap-[5px] focus:outline-none",
                style: { width: "40px", height: "40px" },
                "aria-label": "Toggle menu",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        display: "block",
                        width: "24px",
                        height: "3px",
                        background: "#0B0C10",
                        transform: isOpen ? "translateY(8px) rotate(45deg)" : "none",
                        transition: "transform 0.3s ease, background 0.3s ease"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        display: "block",
                        width: "18px",
                        height: "3px",
                        background: "#E6B800",
                        opacity: isOpen ? 0 : 1,
                        transition: "opacity 0.3s ease"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        display: "block",
                        width: "24px",
                        height: "3px",
                        background: "#0B0C10",
                        transform: isOpen ? "translateY(-8px) rotate(-45deg)" : "none",
                        transition: "transform 0.3s ease, background 0.3s ease"
                      }
                    }
                  )
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: drawerRef,
        id: "nav-mobile-drawer",
        className: "md:hidden fixed inset-0 z-40",
        style: {
          background: "#FFFFFF",
          transform: "translateX(100%)",
          opacity: 0,
          pointerEvents: isOpen ? "all" : "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "100px 32px 40px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #E6B800, #00B8D4, #FF0055)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: "24px",
                right: "72px",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#8A8E9E",
                textTransform: "uppercase"
              },
              children: "NAV_SYS // 04"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: { listStyle: "none", margin: 0, padding: 0 }, children: links.map((l) => {
            const active = isActive(l.to);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "li",
              {
                className: "nav-drawer-item",
                style: {
                  borderBottom: "2px solid rgba(11, 12, 16, 0.08)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: l.to,
                    id: `nav-mobile-link-${l.label.toLowerCase()}`,
                    onClick: () => setIsOpen(false),
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "22px 0",
                      textDecoration: "none"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: "16px" }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontFamily: "var(--font-mono)",
                              fontSize: "10px",
                              fontWeight: 700,
                              letterSpacing: "0.25em",
                              color: active ? "#E6B800" : "#8A8E9E",
                              textTransform: "uppercase"
                            },
                            children: l.num
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              fontFamily: "var(--font-display)",
                              fontWeight: 900,
                              fontSize: "clamp(2.4rem, 10vw, 3.5rem)",
                              textTransform: "uppercase",
                              letterSpacing: "0.03em",
                              color: active ? "#E6B800" : "#0B0C10",
                              lineHeight: 1,
                              transition: "color 0.2s ease"
                            },
                            children: l.label
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            fontFamily: "var(--font-mono)",
                            fontSize: "18px",
                            fontWeight: 900,
                            color: active ? "#E6B800" : "#0B0C10",
                            transition: "transform 0.3s ease"
                          },
                          children: "→"
                        }
                      )
                    ]
                  }
                )
              },
              l.to
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "nav-drawer-item", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                borderTop: "2px solid #0B0C10",
                paddingTop: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.25em",
                        color: "#4A4D58",
                        textTransform: "uppercase",
                        marginBottom: "4px"
                      },
                      children: "RAVI.DAVINCI © 2049"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        color: "#00B04F",
                        textTransform: "uppercase"
                      },
                      children: "● TRANSMISSIONS OPEN"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/admin",
                    onClick: () => setIsOpen(false),
                    style: {
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.25em",
                      color: "#0B0C10",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      border: "2px solid #0B0C10",
                      padding: "6px 12px",
                      boxShadow: "3px 3px 0px #E6B800"
                    },
                    children: "STUDIO"
                  }
                )
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative z-10 border-t border-border/40 mt-32 bg-background/90 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-foreground", children: "ravi.davinci" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm leading-relaxed", children: "Creating timeless pieces that capture the essence of beauty and emotion through color, texture, and form." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider text-foreground mb-4", children: "Quick Links" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/gallery",
              className: "hover:text-foreground text-muted-foreground transition-colors duration-200",
              children: "Gallery"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/about",
              className: "hover:text-foreground text-muted-foreground transition-colors duration-200",
              children: "About"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/contact",
              className: "hover:text-foreground text-muted-foreground transition-colors duration-200",
              children: "Contact"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/contact",
              search: { subject: "Commission Inquiry" },
              className: "hover:text-foreground text-muted-foreground transition-colors duration-200",
              children: "Commissions"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold uppercase tracking-wider text-foreground mb-4", children: "Connect" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "https://instagram.com/ravi.davinci",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-3 hover:text-foreground text-muted-foreground transition-colors duration-200",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { size: 16, className: "shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "@ravi.davinci" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "mailto:itsmeravitej05@gmail.com",
              className: "flex items-center gap-3 hover:text-foreground text-muted-foreground transition-colors duration-200 break-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16, className: "shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "itsmeravitej05@gmail.com" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 text-muted-foreground select-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Karnataka, India" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/40 py-6 text-center text-xs text-muted-foreground tracking-widest uppercase", children: "© 2025 ravi.davinci. All rights reserved." })
  ] });
}
export {
  Footer as F,
  Navbar as N
};
