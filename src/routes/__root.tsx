import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles/global.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cp-bg)", padding: "24px" }}>
      <div style={{ textAlign: "center", maxWidth: "480px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--cp-yellow)", marginBottom: "16px" }}>
          ERROR // 404
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(6rem, 20vw, 12rem)", textTransform: "uppercase", color: "var(--cp-text)", lineHeight: 0.88, marginBottom: "24px" }}>404</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", color: "var(--cp-muted)", textTransform: "uppercase", marginBottom: "32px" }}>
          // PAGE NOT FOUND. SIGNAL LOST.
        </p>
        <Link
          to="/"
          className="cyber-btn"
          style={{ display: "inline-flex" }}
        >
          RETURN HOME →
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cp-bg)", padding: "24px" }}>
      <div style={{ textAlign: "center", maxWidth: "480px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--cp-red)", marginBottom: "16px" }}>
          SYSTEM // ERROR
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(2rem, 8vw, 4rem)", textTransform: "uppercase", color: "var(--cp-text)", lineHeight: 0.95, marginBottom: "16px" }}>
          PAGE DIDN'T LOAD
        </h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.12em", color: "var(--cp-muted)", lineHeight: 1.7, marginBottom: "32px" }}>
          // SOMETHING WENT WRONG. TRY REFRESHING OR HEAD BACK HOME.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="cyber-btn"
          >
            TRY AGAIN
          </button>
          <a
            href="/"
            className="cyber-btn-secondary"
          >
            GO HOME
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ravi.davinci — Original Charcoal, Paintings & Sketches" },
      {
        name: "description",
        content:
          "Original black & white artworks by Ravitej. Buy charcoal, paintings and sketches, or commission a custom piece.",
      },
      { name: "author", content: "Ravitej" },
      { property: "og:title", content: "Ravi.davinci — Original Charcoal, Paintings & Sketches" },
      {
        property: "og:description",
        content:
          "Original black & white artworks by Ravitej. Buy charcoal, paintings and sketches, or commission a custom piece.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ravi.davinci — Original Charcoal, Paintings & Sketches" },
      {
        name: "twitter:description",
        content:
          "Original black & white artworks by Ravitej. Buy charcoal, paintings and sketches, or commission a custom piece.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,700;0,900;1,900&family=JetBrains+Mono:wght@400;500;700;800&family=Orbitron:wght@600;800;900&family=Syne:wght@700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
