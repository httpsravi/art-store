import { useState } from "react";
import { z } from "zod";
import { type Artwork, type Medium } from "@/types/artwork";
import { useCreateArtworkMutation, useDeleteArtworkMutation } from "@/hooks/useArtworks";
import { AdminField } from "@/features/admin/components/AdminField";

const artworkSchema = z.object({
  title: z.string().trim().min(1).max(120),
  medium: z.enum(["charcoal", "paintings", "sketches"]),
  year: z.coerce.number().int().min(1900).max(2100),
  dimensions: z.string().trim().min(1).max(60),
  price: z.coerce.number().min(0).max(1_000_000),
  image: z.string().optional(), // validated manually via imageFiles state
  description: z.string().trim().min(1).max(800),
});

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

  const createMutation = useCreateArtworkMutation();
  const deleteMutation = useDeleteArtworkMutation();

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
      const newWork = await createMutation.mutateAsync({ formData, token });
      setWorks([newWork, ...works.filter((w) => w.id !== newWork.id)]);
      setImagePreviews([]);
      setImageFiles([]);
      (e.target as HTMLFormElement).reset();
      alert("Artwork published successfully!");
    } catch (err: any) {
      console.error("Artwork publish error:", err);
      setErrors({ submit: err.message || "Failed to publish artwork. Please check image upload." });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this work?")) return;
    const token = sessionStorage.getItem("ravitej.token") || "";
    try {
      await deleteMutation.mutateAsync({ id, token });
      setWorks(works.filter((w) => w.id !== id));
    } catch (err: any) {
      console.error("Delete artwork error:", err);
      alert(err.message || "Failed to delete artwork");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
      <section className="lg:col-span-2">
        <h2 className="text-display text-3xl mb-6">Add new work</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <AdminField label="Title" name="title" error={errors.title} />
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
              Medium
            </label>
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
            <AdminField
              label="Year"
              name="year"
              type="number"
              defaultValue="2025"
              error={errors.year}
            />
            <AdminField label="Price (USD)" name="price" type="number" error={errors.price} />
          </div>
          <AdminField
            label='Dimensions (e.g. 24" × 30")'
            name="dimensions"
            error={errors.dimensions}
          />
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
              Images <span className="normal-case opacity-60">(select multiple)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onImage}
              className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-foreground file:text-background file:uppercase file:tracking-widest file:text-[10px] file:cursor-pointer"
            />
            {imagePreviews.length > 0 && (
              <div
                className={`mt-3 grid gap-2 ${
                  imagePreviews.length === 1 ? "grid-cols-1" : "grid-cols-2"
                }`}
              >
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={src}
                      alt={`preview ${i + 1}`}
                      className="w-full aspect-square object-cover border border-border"
                    />
                    <span className="absolute top-1 left-1 text-[9px] uppercase tracking-widest bg-background/80 px-1.5 py-0.5 text-muted-foreground">
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
                      className="absolute top-1 right-1 w-5 h-5 bg-background/80 text-foreground text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {errors.image && <p className="mt-2 text-xs text-destructive">{errors.image}</p>}
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground resize-none"
            />
            {errors.description && (
              <p className="mt-2 text-xs text-destructive">{errors.description}</p>
            )}
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

      <section className="lg:col-span-3">
        <h2 className="text-display text-3xl mb-6">All works ({works.length})</h2>
        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
          {works.map((w) => (
            <div key={w.id} className="flex items-center gap-4 bg-card/40 border border-border p-3">
              <img
                src={w.image}
                alt={w.title}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover shrink-0"
              />
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
  );
}
