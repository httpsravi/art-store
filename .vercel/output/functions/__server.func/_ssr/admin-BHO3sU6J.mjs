import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navbar, F as Footer } from "./Footer-BqGRfv5k.mjs";
import { f as fetchInquiries, m as markInquiryRead, d as deleteInquiry } from "./inquiries-BmORROKr.mjs";
import { f as fetchArtworks, c as createArtwork, d as deleteArtwork } from "./artworks-BsOkITqu.mjs";
import { o as objectType, s as stringType, c as coerce, e as enumType } from "../_libs/zod.mjs";
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
const PASSPHRASE_STORAGE_KEY = "ravi_admin_passphrase_v1";
const DEFAULT_PASSPHRASE = "";
function getAdminPassphrase() {
  if (typeof window === "undefined") return DEFAULT_PASSPHRASE;
  return localStorage.getItem(PASSPHRASE_STORAGE_KEY) || DEFAULT_PASSPHRASE;
}
function verifyAdminPassphrase(passphrase) {
  return passphrase === getAdminPassphrase();
}
function changeAdminPassphrase(currentPass, newPass, token) {
  if (!verifyAdminPassphrase(currentPass)) {
    return { success: false, message: "Current passphrase is incorrect." };
  }
  if (!newPass || newPass.trim().length < 4) {
    return { success: false, message: "New passphrase must be at least 4 characters." };
  }
  localStorage.setItem(PASSPHRASE_STORAGE_KEY, newPass.trim());
  return { success: true, message: "Passphrase updated successfully!" };
}
const loginAdmin = async (pass) => {
  if (verifyAdminPassphrase(pass)) return "admin_token";
  throw new Error("Invalid passphrase");
};
const changeAdminPassword = async (curr, next, token) => {
  const res = changeAdminPassphrase(curr, next);
  if (!res.success) throw new Error(res.message);
};
function AdminLogin({ onLoginSuccess }) {
  const [pwd, setPwd] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  function login(e) {
    e.preventDefault();
    setErrors({});
    loginAdmin(pwd).then((token) => {
      onLoginSuccess(token);
      setPwd("");
    }).catch((err) => {
      setErrors({ login: err.message || "Failed to enter studio." });
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "pt-40 pb-20 max-w-md mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6", children: "— Restricted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display text-5xl mb-10", children: "Studio access" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: login, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "password",
            value: pwd,
            onChange: (e) => setPwd(e.target.value),
            placeholder: "Passphrase",
            className: "w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
          }
        ),
        errors.login && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.login }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em]", children: "Enter" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function AdminField({
  label,
  name,
  type = "text",
  defaultValue,
  error
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        name,
        type,
        defaultValue,
        className: "w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-destructive", children: error })
  ] });
}
const artworkSchema = objectType({
  title: stringType().trim().min(1).max(120),
  medium: enumType(["charcoal", "paintings", "sketches"]),
  year: coerce.number().int().min(1900).max(2100),
  dimensions: stringType().trim().min(1).max(60),
  price: coerce.number().min(0).max(1e6),
  image: stringType().optional(),
  // validated manually via imageFiles state
  description: stringType().trim().min(1).max(800)
});
function ArtworkManager({
  works,
  setWorks
}) {
  const [imagePreviews, setImagePreviews] = reactExports.useState([]);
  const [imageFiles, setImageFiles] = reactExports.useState([]);
  const [errors, setErrors] = reactExports.useState({});
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  function onImage(e) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setImageFiles(files);
    const previews = [];
    files.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews[i] = String(reader.result);
        if (previews.filter(Boolean).length === files.length) {
          setImagePreviews([...previews]);
        }
      };
      reader.readAsDataURL(file);
    });
  }
  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    const fd = new FormData(e.currentTarget);
    if (imageFiles.length === 0) {
      setErrors({ image: "Please select at least one image" });
      setIsSubmitting(false);
      return;
    }
    const data = {
      title: String(fd.get("title") ?? ""),
      medium: String(fd.get("medium") ?? ""),
      year: fd.get("year"),
      dimensions: String(fd.get("dimensions") ?? ""),
      price: fd.get("price"),
      description: String(fd.get("description") ?? "")
    };
    const result = artworkSchema.safeParse(data);
    if (!result.success) {
      const errs = {};
      result.error.issues.forEach((i) => errs[String(i.path[0])] = i.message);
      setErrors(errs);
      setIsSubmitting(false);
      return;
    }
    const token = sessionStorage.getItem("ravitej.token") || "";
    const formData = new FormData();
    formData.append("title", result.data.title);
    formData.append("medium", result.data.medium);
    formData.append("year", String(result.data.year));
    formData.append("dimensions", result.data.dimensions);
    formData.append("price", String(result.data.price));
    formData.append("description", result.data.description);
    imageFiles.forEach((file) => formData.append("images[]", file));
    try {
      const newWork = await createArtwork(formData, token);
      setWorks([newWork, ...works]);
      setImagePreviews([]);
      setImageFiles([]);
      e.target.reset();
      alert("Artwork published successfully!");
    } catch (err) {
      console.error(err);
      setErrors({ submit: err.message || "Failed to publish artwork" });
    } finally {
      setIsSubmitting(false);
    }
  }
  async function remove(id) {
    if (!confirm("Delete this work?")) return;
    const token = sessionStorage.getItem("ravitej.token") || "";
    try {
      await deleteArtwork(id, token);
      setWorks(works.filter((w) => w.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete artwork");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lg:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display text-3xl mb-6", children: "Add new work" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: "Title", name: "title", error: errors.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block", children: "Medium" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              name: "medium",
              className: "w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground",
              defaultValue: "charcoal",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "charcoal", children: "Charcoal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "paintings", children: "Paintings" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sketches", children: "Sketches" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AdminField,
            {
              label: "Year",
              name: "year",
              type: "number",
              defaultValue: "2025",
              error: errors.year
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdminField, { label: "Price (USD)", name: "price", type: "number", error: errors.price })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AdminField,
          {
            label: 'Dimensions (e.g. 24" × 30")',
            name: "dimensions",
            error: errors.dimensions
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block", children: [
            "Images ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "normal-case opacity-60", children: "(select multiple)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "file",
              accept: "image/*",
              multiple: true,
              onChange: onImage,
              className: "w-full text-xs file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-foreground file:text-background file:uppercase file:tracking-widest file:text-[10px] file:cursor-pointer"
            }
          ),
          imagePreviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `mt-3 grid gap-2 ${imagePreviews.length === 1 ? "grid-cols-1" : "grid-cols-2"}`,
              children: imagePreviews.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src,
                    alt: `preview ${i + 1}`,
                    className: "w-full aspect-square object-cover border border-border"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-1 left-1 text-[9px] uppercase tracking-widest bg-background/80 px-1.5 py-0.5 text-muted-foreground", children: [
                  i + 1,
                  "/",
                  imagePreviews.length
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      const newFiles = imageFiles.filter((_, fi) => fi !== i);
                      const newPreviews = imagePreviews.filter((_, pi) => pi !== i);
                      setImageFiles(newFiles);
                      setImagePreviews(newPreviews);
                    },
                    className: "absolute top-1 right-1 w-5 h-5 bg-background/80 text-foreground text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                    children: "×"
                  }
                )
              ] }, i))
            }
          ),
          errors.image && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-destructive", children: errors.image })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              name: "description",
              rows: 4,
              className: "w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground resize-none"
            }
          ),
          errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-destructive", children: errors.description })
        ] }),
        errors.submit && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.submit }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "w-full px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] hover:bg-primary/90 disabled:opacity-50",
            children: isSubmitting ? "Uploading image & publishing..." : "Publish work"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lg:col-span-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-display text-3xl mb-6", children: [
        "All works (",
        works.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[70vh] overflow-y-auto pr-2", children: works.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 bg-card/40 border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: w.image,
            alt: w.title,
            className: "w-16 h-16 sm:w-20 sm:h-20 object-cover shrink-0"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-display text-lg sm:text-xl truncate", children: w.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-0.5 truncate", children: [
            w.medium,
            " · ",
            w.year,
            " · $",
            w.price.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => remove(w.id),
            className: "text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-destructive px-3 py-1.5 border border-border/40 sm:border-transparent hover:border-destructive/40 transition-colors shrink-0",
            children: "Delete"
          }
        )
      ] }, w.id)) })
    ] })
  ] });
}
function InquiriesList({
  inquiries,
  setInquiries,
  unreadCount,
  setUnreadCount
}) {
  const [inquiryFilter, setInquiryFilter] = reactExports.useState("all");
  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryFilter === "unread") return !inq.read;
    if (inquiryFilter === "read") return inq.read;
    return true;
  });
  async function handleMarkRead(id) {
    const token = sessionStorage.getItem("ravitej.token") || "";
    try {
      await markInquiryRead(id, token);
      setInquiries(inquiries.map((inq) => inq._id === id ? { ...inq, read: true } : inq));
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to mark as read");
    }
  }
  async function handleDeleteInquiry(id) {
    if (!confirm("Delete this inquiry?")) return;
    const token = sessionStorage.getItem("ravitej.token") || "";
    try {
      const inquiry = inquiries.find((inq) => inq._id === id);
      await deleteInquiry(id, token);
      setInquiries(inquiries.filter((inq) => inq._id !== id));
      if (inquiry && !inquiry.read) {
        setUnreadCount(Math.max(0, unreadCount - 1));
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete inquiry");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-display text-3xl", children: [
        "Studio Inquiries (",
        filteredInquiries.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["all", "unread", "read"].map((filter) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setInquiryFilter(filter),
          className: `px-3 py-1 text-[10px] uppercase tracking-widest border border-border ${inquiryFilter === filter ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`,
          children: filter
        },
        filter
      )) })
    ] }),
    filteredInquiries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border p-16 text-center bg-card/20 text-muted-foreground", children: "No inquiries matching the selected filter." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: filteredInquiries.map((inq) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `border p-6 bg-card/30 transition-all ${inq.read ? "border-border/40 opacity-75" : "border-foreground shadow-sm"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground block", children: [
                new Date(inq.createdAt).toLocaleDateString(),
                " at",
                " ",
                new Date(inq.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-medium text-foreground", children: inq.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `mailto:${inq.email}`,
                  className: "text-xs text-muted-foreground hover:text-foreground border-b border-border/50 break-all",
                  children: inq.email
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 self-start sm:self-auto", children: [
              !inq.read && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleMarkRead(inq._id),
                  className: "px-3 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-widest hover:bg-foreground/80 transition-colors shrink-0",
                  children: "Mark Read"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleDeleteInquiry(inq._id),
                  className: "px-3 py-1.5 border border-border text-[10px] sm:text-xs uppercase tracking-widest hover:text-destructive hover:border-destructive/50 transition-colors shrink-0",
                  children: "Delete"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/40 pt-4 mt-2", children: [
            inq.subject && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold mb-2 text-foreground", children: [
              "Subject: ",
              inq.subject
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap", children: inq.message })
          ] })
        ]
      },
      inq._id
    )) })
  ] });
}
function SecuritySettings() {
  const [currentPwd, setCurrentPwd] = reactExports.useState("");
  const [newPwd, setNewPwd] = reactExports.useState("");
  const [confirmNewPwd, setConfirmNewPwd] = reactExports.useState("");
  const [passwordStatus, setPasswordStatus] = reactExports.useState({ success: "", error: "" });
  async function handlePasswordChange(e) {
    e.preventDefault();
    setPasswordStatus({ success: "", error: "" });
    if (!currentPwd || !newPwd) {
      setPasswordStatus({ success: "", error: "All fields are required" });
      return;
    }
    if (newPwd !== confirmNewPwd) {
      setPasswordStatus({ success: "", error: "New passwords do not match" });
      return;
    }
    if (newPwd.length < 4) {
      setPasswordStatus({ success: "", error: "New password must be at least 4 characters" });
      return;
    }
    const token = sessionStorage.getItem("ravitej.token") || "";
    try {
      await changeAdminPassword(currentPwd, newPwd, token);
      setPasswordStatus({ success: "Password changed successfully!", error: "" });
      setCurrentPwd("");
      setNewPwd("");
      setConfirmNewPwd("");
    } catch (err) {
      setPasswordStatus({ success: "", error: err.message || "Failed to change password" });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-display text-3xl mb-6 font-light", children: "Security & Password" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handlePasswordChange,
        className: "space-y-4 border border-border/50 p-6 bg-card/20",
        children: [
          passwordStatus.error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-destructive bg-destructive/10 border border-destructive/20 p-3", children: passwordStatus.error }),
          passwordStatus.success && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-green-500 bg-green-500/10 border border-green-500/20 p-3", children: passwordStatus.success }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block", children: "Current Passphrase" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "password",
                value: currentPwd,
                onChange: (e) => setCurrentPwd(e.target.value),
                className: "w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block", children: "New Passphrase" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "password",
                value: newPwd,
                onChange: (e) => setNewPwd(e.target.value),
                className: "w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block", children: "Confirm New Passphrase" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "password",
                value: confirmNewPwd,
                onChange: (e) => setConfirmNewPwd(e.target.value),
                className: "w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] hover:bg-primary/90", children: "Update Passphrase" })
        ]
      }
    )
  ] });
}
function AdminDashboard({ onLogout }) {
  const [works, setWorks] = reactExports.useState([]);
  const [inquiries, setInquiries] = reactExports.useState([]);
  const [unreadCount, setUnreadCount] = reactExports.useState(0);
  const [activeTab, setActiveTab] = reactExports.useState("works");
  reactExports.useEffect(() => {
    const token = sessionStorage.getItem("ravitej.token") || "";
    loadDashboardData(token);
  }, []);
  const loadDashboardData = async (token) => {
    try {
      const artData = await fetchArtworks();
      setWorks(artData);
      const inqData = await fetchInquiries(token);
      setInquiries(inqData.inquiries);
      setUnreadCount(inqData.unreadCount);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3", children: "— Studio Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-display text-4xl sm:text-6xl", children: "Control Center" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onLogout,
            className: "self-start sm:self-auto text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground py-1",
            children: "Sign out"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 sm:gap-6 mb-8 md:mb-12 pb-6 border-b border-border/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveTab("works"),
            className: `text-xs uppercase tracking-[0.25em] pb-1 transition-all ${activeTab === "works" ? "text-foreground border-b border-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`,
            children: "Manage Works"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveTab("inquiries"),
            className: `text-xs uppercase tracking-[0.25em] pb-1 relative transition-all ${activeTab === "inquiries" ? "text-foreground border-b border-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`,
            children: [
              "Inquiries",
              unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 px-1.5 py-0.5 text-[9px] bg-foreground text-background font-bold rounded-full", children: unreadCount })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setActiveTab("settings"),
            className: `text-xs uppercase tracking-[0.25em] pb-1 transition-all ${activeTab === "settings" ? "text-foreground border-b border-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`,
            children: "Security Settings"
          }
        )
      ] }),
      activeTab === "works" && /* @__PURE__ */ jsxRuntimeExports.jsx(ArtworkManager, { works, setWorks }),
      activeTab === "inquiries" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        InquiriesList,
        {
          inquiries,
          setInquiries,
          unreadCount,
          setUnreadCount
        }
      ),
      activeTab === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(SecuritySettings, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Admin() {
  const [authed, setAuthed] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const token = sessionStorage.getItem("ravitej.token");
    if (token) {
      setAuthed(true);
    }
  }, []);
  function handleLogout() {
    sessionStorage.removeItem("ravitej.token");
    setAuthed(false);
  }
  if (!authed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLogin, { onLoginSuccess: () => setAuthed(true) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, { onLogout: handleLogout });
}
export {
  Admin as component
};
