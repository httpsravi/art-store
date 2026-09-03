import { useState } from "react";
import { z } from "zod";
import { type Artwork, type Medium } from "@/types/artwork";
import { createArtwork, deleteArtwork } from "@/services";

const artworkSchema = z.object({
  title: z.string().trim().min(1).max(120),
  medium: z.enum(["charcoal", "paintings", "sketches"]),
  year: z.coerce.number().int().min(1900).max(2100),
  dimensions: z.string().trim().min(1).max(60),
  price: z.coerce.number().min(0).max(1_000_000),
  image: z.string().optional(), // validated manually via imageFiles state
  description: z.string().trim().min(1).max(800),
});

import { AdminField } from "@/features/admin/components/AdminField";

export function ArtworkManager({
  works,
  setWorks,
}: {
  works: Artwork[];
  setWorks: (works: Artwork[]) => void;
}) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setImageFiles(files);
    // Generate data-URL previews for all selected files
    const previews: string[] = [];
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      medium: String(fd.get("medium") ?? "") as Medium,
      year: fd.get("year"),
      dimensions: String(fd.get("dimensions") ?? ""),
      price: fd.get("price"),
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
    imageFiles.forEach((file) => formData.append("images[]", file));

    try {
      const newWork = await createArtwork(formData, token);
      setWorks([newWork, ...works]);
      setImagePreviews([]);
      setImageFiles([]);
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

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
        gap: "48px",
      }}
    >
      {/* Add new work form */}
      <section>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            textTransform: "uppercase",
            color: "var(--cp-text)",
            marginBottom: "24px",
          }}
        >
          ADD NEW WORK
        </h2>
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <AdminField label="Title" name="title" error={errors.title} />
          <div>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--cp-muted)",
                marginBottom: "8px",
              }}
            >
              MEDIUM
            </label>
            <select
              name="medium"
              defaultValue="charcoal"
              className="cyber-input"
              style={{ cursor: "pointer" }}
            >
              <option value="charcoal">Charcoal</option>
              <option value="paintings">Paintings</option>
              <option value="sketches">Sketches</option>
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <AdminField
              label="Year"
              name="year"
              type="number"
              defaultValue="2025"
              error={errors.year}
            />
            <AdminField label="Price (₹)" name="price" type="number" error={errors.price} />
          </div>
          <AdminField
            label='Dimensions (e.g. 24" × 30")'
            name="dimensions"
            error={errors.dimensions}
          />
          <div>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--cp-muted)",
                marginBottom: "8px",
              }}
            >
              IMAGES <span style={{ opacity: 0.6, textTransform: "none" }}>(select multiple)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onImage}
              style={{
                width: "100%",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--cp-muted)",
              }}
            />
            {imagePreviews.length > 0 && (
              <div
                style={{
                  marginTop: "12px",
                  display: "grid",
                  gridTemplateColumns: imagePreviews.length === 1 ? "1fr" : "1fr 1fr",
                  gap: "8px",
                }}
              >
                {imagePreviews.map((src, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img
                      src={src}
                      alt={`preview ${i + 1}`}
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        objectFit: "cover",
                        border: "1px solid rgba(245,240,0,0.2)",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "4px",
                        left: "4px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "8px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        background: "rgba(12,14,10,0.8)",
                        color: "var(--cp-muted)",
                        padding: "2px 6px",
                      }}
                    >
                      {i + 1}/{imagePreviews.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newFiles = imageFiles.filter((_, fi) => fi !== i);
                        const newPreviews = imagePreviews.filter((_, pi) => pi !== i);
                        setImageFiles(newFiles);
                        setImagePreviews(newPreviews);
                      }}
                      style={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        width: "20px",
                        height: "20px",
                        background: "rgba(12,14,10,0.8)",
                        color: "var(--cp-red)",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.image && (
              <p
                style={{
                  marginTop: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color: "var(--cp-red)",
                  textTransform: "uppercase",
                }}
              >
                // {errors.image}
              </p>
            )}
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--cp-muted)",
                marginBottom: "8px",
              }}
            >
              DESCRIPTION
            </label>
            <textarea
              name="description"
              rows={4}
              className="cyber-input"
              style={{ resize: "none", fontFamily: "var(--font-mono)", lineHeight: 1.8 }}
            />
            {errors.description && (
              <p
                style={{
                  marginTop: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color: "var(--cp-red)",
                  textTransform: "uppercase",
                }}
              >
                // {errors.description}
              </p>
            )}
          </div>
          {errors.submit && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: "var(--cp-red)",
                textTransform: "uppercase",
              }}
            >
              // ERROR: {errors.submit}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="cyber-btn"
            style={{ width: "100%", justifyContent: "center", opacity: isSubmitting ? 0.5 : 1 }}
          >
            {isSubmitting ? "UPLOADING & PUBLISHING..." : "PUBLISH WORK →"}
          </button>
        </form>
      </section>

      {/* Works list */}
      <section>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            textTransform: "uppercase",
            color: "var(--cp-text)",
            marginBottom: "24px",
          }}
        >
          ALL WORKS ({works.length})
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxHeight: "70vh",
            overflowY: "auto",
            paddingRight: "8px",
          }}
        >
          {works.map((w) => (
            <div
              key={w.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                background: "var(--cp-surface)",
                border: "1px solid rgba(245,240,0,0.12)",
                padding: "12px",
              }}
            >
              <img
                src={w.image}
                alt={w.title}
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "14px",
                    textTransform: "uppercase",
                    color: "var(--cp-text)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {w.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--cp-muted)",
                    marginTop: "4px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {w.medium} · {w.year} · ₹{w.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => remove(w.id)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--cp-muted)",
                  background: "none",
                  border: "1px solid rgba(245,240,0,0.15)",
                  padding: "6px 12px",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--cp-red)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--cp-red)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--cp-muted)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,240,0,0.15)";
                }}
              >
                DELETE
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
