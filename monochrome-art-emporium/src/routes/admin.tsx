import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  fetchArtworks,
  createArtwork,
  deleteArtwork,
  fetchInquiries,
  markInquiryRead,
  deleteInquiry,
  loginAdmin,
  changeAdminPassword,
  type Artwork,
  type Medium,
  type Inquiry,
} from "@/lib/artworks";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Studio — Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const artworkSchema = z.object({
  title: z.string().trim().min(1).max(120),
  medium: z.enum(["charcoal", "paintings", "sketches"]),
  year: z.coerce.number().int().min(1900).max(2100),
  dimensions: z.string().trim().min(1).max(60),
  price: z.coerce.number().min(0).max(1_000_000),
  image: z.string().min(1, "Upload an image"),
  description: z.string().trim().min(1).max(800),
});

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [works, setWorks] = useState<Artwork[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"works" | "inquiries" | "settings">("works");
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "unread" | "read">("all");
  
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Settings State
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");
  const [passwordStatus, setPasswordStatus] = useState({ success: "", error: "" });

  useEffect(() => {
    const token = sessionStorage.getItem("ravitej.token");
    if (token) {
      setAuthed(true);
      loadDashboardData(token);
    }
  }, []);

  const loadDashboardData = async (token: string) => {
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

  function login(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    loginAdmin(pwd)
      .then((token) => {
        sessionStorage.setItem("ravitej.token", token);
        setAuthed(true);
        setPwd("");
        loadDashboardData(token);
      })
      .catch((err) => {
        setErrors({ login: err.message || "Failed to enter studio." });
      });
  }

  function onImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(file);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const data = {
      title: String(fd.get("title") ?? ""),
      medium: String(fd.get("medium") ?? "") as Medium,
      year: fd.get("year"),
      dimensions: String(fd.get("dimensions") ?? ""),
      price: fd.get("price"),
      image: imageFile ? "has-image" : "",
      description: String(fd.get("description") ?? ""),
    };

    const result = artworkSchema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
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
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const newWork = await createArtwork(formData, token);
      setWorks([newWork, ...works]);
      setImagePreview("");
      setImageFile(null);
      (e.target as HTMLFormElement).reset();
      alert("Artwork published successfully!");
    } catch (err: any) {
      console.error(err);
      setErrors({ submit: err.message || "Failed to publish artwork" });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this work?")) return;
    const token = sessionStorage.getItem("ravitej.token") || "";
    try {
      await deleteArtwork(id, token);
      setWorks(works.filter((w) => w.id !== id));
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to delete artwork");
    }
  }

  async function handleMarkRead(id: string) {
    const token = sessionStorage.getItem("ravitej.token") || "";
    try {
      await markInquiryRead(id, token);
      setInquiries(
        inquiries.map((inq) => (inq._id === id ? { ...inq, read: true } : inq))
      );
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to mark as read");
    }
  }

  async function handleDeleteInquiry(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    const token = sessionStorage.getItem("ravitej.token") || "";
    try {
      const inquiry = inquiries.find((inq) => inq._id === id);
      await deleteInquiry(id, token);
      setInquiries(inquiries.filter((inq) => inq._id !== id));
      if (inquiry && !inquiry.read) {
        setUnreadCount(Math.max(0, unreadCount - 1));
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to delete inquiry");
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
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
    } catch (err: any) {
      setPasswordStatus({ success: "", error: err.message || "Failed to change password" });
    }
  }

  function handleSignOut() {
    sessionStorage.removeItem("ravitej.token");
    setAuthed(false);
    setWorks([]);
    setInquiries([]);
    setUnreadCount(0);
  }

  // Filter inquiries based on select filter
  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryFilter === "unread") return !inq.read;
    if (inquiryFilter === "read") return inq.read;
    return true;
  });

  if (!authed) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-40 pb-20 max-w-md mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">— Restricted</p>
          <h1 className="text-display text-5xl mb-10">Studio access</h1>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Passphrase"
              className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
            />
            {errors.login && <p className="text-xs text-destructive">{errors.login}</p>}
            <button className="w-full px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em]">
              Enter
            </button>
            <p className="text-xs text-muted-foreground pt-4">
              Demo passphrase: <code className="text-foreground">ravitej</code>. Connects to Express backend authentication.
            </p>
          </form>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">— Studio Dashboard</p>
            <h1 className="text-display text-4xl sm:text-6xl">Control Center</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="self-start sm:self-auto text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground py-1"
          >
            Sign out
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 md:mb-12 pb-6 border-b border-border/40">
          <button
            onClick={() => setActiveTab("works")}
            className={`text-xs uppercase tracking-[0.25em] pb-1 transition-all ${
              activeTab === "works"
                ? "text-foreground border-b border-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Manage Works
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`text-xs uppercase tracking-[0.25em] pb-1 relative transition-all ${
              activeTab === "inquiries"
                ? "text-foreground border-b border-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Inquiries
            {unreadCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-[9px] bg-foreground text-background font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`text-xs uppercase tracking-[0.25em] pb-1 transition-all ${
              activeTab === "settings"
                ? "text-foreground border-b border-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Security Settings
          </button>
        </div>

        {/* WORKS TAB */}
        {activeTab === "works" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Add form */}
            <section className="lg:col-span-2">
              <h2 className="text-display text-3xl mb-6">Add new work</h2>
              <form onSubmit={onSubmit} className="space-y-4">
                <AdminField label="Title" name="title" error={errors.title} />
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">Medium</label>
                  <select
                    name="medium"
                    className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
                    defaultValue="charcoal"
                  >
                    <option value="charcoal">Charcoal</option>
                    <option value="paintings">Paintings</option>
                    <option value="sketches">Sketches</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <AdminField label="Year" name="year" type="number" defaultValue="2025" error={errors.year} />
                  <AdminField label="Price (USD)" name="price" type="number" error={errors.price} />
                </div>
                <AdminField label='Dimensions (e.g. 24" × 30")' name="dimensions" error={errors.dimensions} />
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImage}
                    className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-foreground file:text-background file:uppercase file:tracking-widest file:text-[10px] file:cursor-pointer"
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="preview" className="mt-3 w-full aspect-square object-cover border border-border" />
                  )}
                  {errors.image && <p className="mt-2 text-xs text-destructive">{errors.image}</p>}
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">Description</label>
                  <textarea
                    name="description"
                    rows={4}
                    className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground resize-none"
                  />
                  {errors.description && <p className="mt-2 text-xs text-destructive">{errors.description}</p>}
                </div>
                {errors.submit && <p className="text-xs text-destructive">{errors.submit}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? "Uploading image & publishing..." : "Publish work"}
                </button>
              </form>
            </section>

            {/* Works list */}
            <section className="lg:col-span-3">
              <h2 className="text-display text-3xl mb-6">All works ({works.length})</h2>
              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                {works.map((w) => (
                  <div key={w.id} className="flex items-center gap-4 bg-card/40 border border-border p-3">
                    <img src={w.image} alt={w.title} className="w-16 h-16 sm:w-20 sm:h-20 object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-display text-lg sm:text-xl truncate">{w.title}</p>
                      <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-0.5 truncate">
                        {w.medium} · {w.year} · ${w.price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(w.id)}
                      className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-destructive px-3 py-1.5 border border-border/40 sm:border-transparent hover:border-destructive/40 transition-colors shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* INQUIRIES TAB */}
        {activeTab === "inquiries" && (
          <section className="max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-display text-3xl">Studio Inquiries ({filteredInquiries.length})</h2>
              
              {/* Inquiry Filter Options */}
              <div className="flex flex-wrap gap-2">
                {(["all", "unread", "read"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setInquiryFilter(filter)}
                    className={`px-3 py-1 text-[10px] uppercase tracking-widest border border-border ${
                      inquiryFilter === filter
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="border border-border p-16 text-center bg-card/20 text-muted-foreground">
                No inquiries matching the selected filter.
              </div>
            ) : (
              <div className="space-y-6">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq._id}
                    className={`border p-6 bg-card/30 transition-all ${
                      inq.read ? "border-border/40 opacity-75" : "border-foreground shadow-sm"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">
                          {new Date(inq.createdAt).toLocaleDateString()} at{" "}
                          {new Date(inq.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <h3 className="text-xl font-medium text-foreground">{inq.name}</h3>
                        <a
                          href={`mailto:${inq.email}`}
                          className="text-xs text-muted-foreground hover:text-foreground border-b border-border/50 break-all"
                        >
                          {inq.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 self-start sm:self-auto">
                        {!inq.read && (
                          <button
                            onClick={() => handleMarkRead(inq._id)}
                            className="px-3 py-1.5 bg-foreground text-background text-[10px] uppercase tracking-widest hover:bg-foreground/80 transition-colors shrink-0"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteInquiry(inq._id)}
                          className="px-3 py-1.5 border border-border text-[10px] sm:text-xs uppercase tracking-widest hover:text-destructive hover:border-destructive/50 transition-colors shrink-0"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-border/40 pt-4 mt-2">
                      {inq.subject && (
                        <p className="text-sm font-semibold mb-2 text-foreground">
                          Subject: {inq.subject}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {inq.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <section className="max-w-md">
            <h2 className="text-display text-3xl mb-6 font-light">Security & Password</h2>
            
            <form onSubmit={handlePasswordChange} className="space-y-4 border border-border/50 p-6 bg-card/20">
              {passwordStatus.error && (
                <div className="text-xs text-destructive bg-destructive/10 border border-destructive/20 p-3">
                  {passwordStatus.error}
                </div>
              )}
              {passwordStatus.success && (
                <div className="text-xs text-green-500 bg-green-500/10 border border-green-500/20 p-3">
                  {passwordStatus.success}
                </div>
              )}

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                  Current Passphrase
                </label>
                <input
                  type="password"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                  New Passphrase
                </label>
                <input
                  type="password"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                  Confirm New Passphrase
                </label>
                <input
                  type="password"
                  value={confirmNewPwd}
                  onChange={(e) => setConfirmNewPwd(e.target.value)}
                  className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
                />
              </div>

              <button className="w-full px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] hover:bg-primary/90">
                Update Passphrase
              </button>
            </form>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function AdminField({
  label,
  name,
  type = "text",
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
