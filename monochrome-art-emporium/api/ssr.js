// Vercel Edge Function — re-exports the built Cloudflare-style fetch handler
// Vercel Edge Runtime is fully compatible with the Web Fetch API format
export const config = { runtime: "edge" };

// The built server exports: { fetch(request, env, ctx) => Response }
export { default } from "../dist/server/server.js";
