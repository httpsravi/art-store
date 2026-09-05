import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navbar, F as Footer } from "./Footer-BqGRfv5k.mjs";
import { s as submitInquiry } from "./inquiries-BmORROKr.mjs";
import { a as Route$4 } from "./router-BLU6E_xi.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__react-router.mjs";
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
const formSchema = objectType({
  name: stringType().trim().min(1, "Name is required").max(100),
  email: stringType().trim().email("Enter a valid email").max(255),
  subject: stringType().trim().max(200).optional(),
  message: stringType().trim().min(10, "Tell me a bit more").max(2e3)
});
function Contact() {
  const {
    subject
  } = Route$4.useSearch();
  const [sent, setSent] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? "")
    };
    const result = formSchema.safeParse(data);
    if (!result.success) {
      const errs = {};
      result.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    submitInquiry(result.data).then(() => {
      setSent(true);
    }).catch((err) => {
      console.error(err);
      setErrors({
        submit: err.message || "Failed to send message. Please try again."
      });
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "pt-24 md:pt-32 pb-20 max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8", children: "— Get in touch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display text-5xl md:text-7xl leading-none mb-10", children: "Say hello." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-10", children: "Purchase inquiries, custom commissions, exhibitions, or just to talk about a piece — write to me directly." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:studio@ravitej.art", className: "hover:text-foreground border-b border-border", children: "studio@ravitej.art" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1", children: "Response time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Within 48 hours" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-16 text-center bg-card/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display text-4xl mb-4", children: "Thank you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Your message is in. I'll write back within 48 hours." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", name: "name", error: errors.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", name: "email", type: "email", error: errors.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Subject", name: "subject", defaultValue: subject, error: errors.subject }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2 block", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "message", rows: 6, required: true, className: "w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors resize-none" }),
          errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-destructive", children: errors.message })
        ] }),
        errors.submit && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.submit }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "px-10 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] hover:bg-primary/90 transition-colors", children: "Send message" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Field({
  label,
  name,
  type = "text",
  defaultValue,
  error
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2 block", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, type, defaultValue, className: "w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-destructive", children: error })
  ] });
}
export {
  Contact as component
};
