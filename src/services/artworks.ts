import { supabase, isCloudConfigured } from "@/lib/supabase";
import { type Medium, type Artwork } from "@/types/artwork";

export const MEDIUMS: { id: Medium | "all"; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "charcoal", label: "Charcoal" },
  { id: "paintings", label: "Paintings" },
  { id: "sketches", label: "Sketches" },
];

export const DEFAULT_ARTWORKS: Artwork[] = [
  {
    id: "1",
    title: "Whispers in Graphite",
    medium: "charcoal",
    year: 2025,
    dimensions: "24 × 36 in",
    price: 4500,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9fd0c121?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1578301978693-85fa9fd0c121?w=600&q=80"],
    description:
      "A study in shadow and silence, exploring the boundary between presence and absence.",
  },
  {
    id: "2",
    title: "Monochrome Reverie",
    medium: "paintings",
    year: 2024,
    dimensions: "30 × 40 in",
    price: 6200,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80"],
    description: "Oil on canvas. A meditation on light through layered washes of grey.",
  },
  {
    id: "3",
    title: "Fractured Light",
    medium: "sketches",
    year: 2025,
    dimensions: "18 × 24 in",
    price: 2800,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80"],
    description: "Pencil on archival paper. Capturing the fleeting geometry of afternoon light.",
  },
  {
    id: "4",
    title: "Still Life — Silence",
    medium: "charcoal",
    year: 2024,
    dimensions: "20 × 28 in",
    price: 3800,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80"],
    description: "Charcoal on textured paper. Objects rendered with dramatic chiaroscuro.",
  },
  {
    id: "5",
    title: "Abstract Emotion No. 7",
    medium: "paintings",
    year: 2025,
    dimensions: "36 × 48 in",
    price: 8500,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80"],
    description: "Bold gestural strokes on canvas. Raw emotion distilled into monochrome.",
  },
  {
    id: "6",
    title: "Portrait Study — IV",
    medium: "sketches",
    year: 2024,
    dimensions: "14 × 18 in",
    price: 2200,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80"],
    description: "Graphite portrait capturing the quiet intensity of an unguarded moment.",
  },
];

const ARTWORKS_STORAGE_KEY = "ravi_artworks_v1";

/**
 * Normalizes an image string or storage path into a fully qualified browser URL.
 */
export function resolveImageUrl(imgStr: string): string {
  if (!imgStr) return "https://images.unsplash.com/photo-1578301978693-85fa9fd0c121?w=600&q=80";

  // If already absolute HTTP/HTTPS or data URL
  if (imgStr.startsWith("http://") || imgStr.startsWith("https://") || imgStr.startsWith("data:")) {
    return imgStr;
  }

  // If it's a Supabase storage path or relative path
  if (isCloudConfigured && supabase) {
    const cleanPath = imgStr.startsWith("artworks/") ? imgStr.replace(/^artworks\//, "") : imgStr;
    const { data } = supabase.storage.from("artworks").getPublicUrl(cleanPath);
    if (data?.publicUrl) {
      return data.publicUrl;
    }
  }

  return imgStr;
}

/**
 * Normalizes DB artwork item into a strongly typed Artwork object with resolved image URLs.
 */
function mapDbRecordToArtwork(item: any): Artwork {
  let rawImages: string[] = [];

  if (Array.isArray(item.images) && item.images.length > 0) {
    rawImages = item.images;
  } else if (typeof item.image === "string" && item.image.trim().length > 0) {
    const trimmed = item.image.trim();
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) rawImages = parsed;
      } catch (e) {
        rawImages = [trimmed];
      }
    } else {
      rawImages = [trimmed];
    }
  }

  const resolvedImages = rawImages.map((src) => resolveImageUrl(src)).filter(Boolean);
  if (resolvedImages.length === 0) {
    resolvedImages.push("https://images.unsplash.com/photo-1578301978693-85fa9fd0c121?w=600&q=80");
  }

  return {
    id: String(item.id),
    title: item.title || "Untitled Artwork",
    medium: (item.medium || "charcoal") as Medium,
    year: Number(item.year) || new Date().getFullYear(),
    dimensions: item.dimensions || "N/A",
    price: Number(item.price) || 0,
    image: resolvedImages[0],
    images: resolvedImages,
    description: item.description || "",
    created_at: item.created_at,
  };
}

async function getArtworksAsync(medium?: string): Promise<Artwork[]> {
  if (isCloudConfigured && supabase) {
    try {
      let query = supabase.from("artworks").select("*").order("created_at", { ascending: false });
      if (medium && medium !== "all") {
        query = query.eq("medium", medium);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Supabase fetch artworks error:", error.message);
        throw error;
      }

      if (data) {
        return data.map(mapDbRecordToArtwork);
      }
    } catch (err) {
      console.warn("Supabase fetch failed, checking localStorage fallback:", err);
    }
  }

  const local = getStoredArtworks();
  if (medium && medium !== "all") {
    return local.filter((a) => a.medium === medium);
  }
  return local;
}

function getStoredArtworks(): Artwork[] {
  if (typeof window === "undefined") return DEFAULT_ARTWORKS;
  try {
    const raw = localStorage.getItem(ARTWORKS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ARTWORKS_STORAGE_KEY, JSON.stringify(DEFAULT_ARTWORKS));
      return DEFAULT_ARTWORKS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading artworks from localStorage:", err);
    return DEFAULT_ARTWORKS;
  }
}

export async function createArtwork(formData: FormData, _token: string): Promise<Artwork> {
  const artData = {
    title: String(formData.get("title") ?? "").trim(),
    medium: String(formData.get("medium") ?? "") as Medium,
    year: Number(formData.get("year") ?? new Date().getFullYear()),
    dimensions: String(formData.get("dimensions") ?? "").trim(),
    price: Number(formData.get("price") ?? 0),
    description: String(formData.get("description") ?? "").trim(),
    image: "",
  };

  const multiFiles = formData.getAll("images[]") as File[];
  const singleFile = formData.get("image") as File | null;
  const imageFiles: File[] =
    multiFiles.length > 0
      ? multiFiles.filter((f) => f && f.size > 0)
      : singleFile && singleFile.size > 0
        ? [singleFile]
        : [];

  return saveArtworkCloud(artData, imageFiles.length > 0 ? imageFiles : null);
}

async function getArtworkByIdAsync(id: string): Promise<Artwork | null> {
  if (isCloudConfigured && supabase) {
    try {
      const { data, error } = await supabase.from("artworks").select("*").eq("id", id).single();

      if (!error && data) {
        return mapDbRecordToArtwork(data);
      }
    } catch (err) {
      console.warn("Supabase fetch artwork by ID failed:", err);
    }
  }

  const artworks = getStoredArtworks();
  const found = artworks.find((a) => a.id === id);
  if (!found) return null;
  return found;
}

async function saveArtworkCloud(
  artData: {
    title: string;
    medium: Medium;
    year: number;
    dimensions: string;
    price: number;
    description: string;
    image: string;
    images?: string[];
  },
  imageFiles?: File[] | null,
): Promise<Artwork> {
  let uploadedPaths: string[] = [];
  let publicUrls: string[] = [];

  if (isCloudConfigured && supabase && imageFiles && imageFiles.length > 0) {
    for (const imageFile of imageFiles) {
      const safeName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileExt = safeName.split(".").pop() || "jpg";
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("artworks")
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload failed for file:", imageFile.name, uploadError.message);
        // Clean up any previously uploaded files for this batch
        if (uploadedPaths.length > 0) {
          await supabase.storage.from("artworks").remove(uploadedPaths);
        }
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }

      if (uploadData?.path) {
        uploadedPaths.push(uploadData.path);
        const { data: publicUrlData } = supabase.storage.from("artworks").getPublicUrl(uploadData.path);
        if (publicUrlData?.publicUrl) {
          publicUrls.push(publicUrlData.publicUrl);
        }
      }
    }
  }

  const finalImages = publicUrls.length > 0 ? publicUrls : artData.images || [artData.image].filter(Boolean);

  if (isCloudConfigured && supabase) {
    try {
      const payload = {
        title: artData.title,
        medium: artData.medium,
        year: artData.year,
        dimensions: artData.dimensions,
        price: artData.price,
        image: JSON.stringify(finalImages),
        description: artData.description,
      };

      const { data, error } = await supabase.from("artworks").insert([payload]).select().single();

      if (error) {
        console.error("Supabase DB Insert Error:", error.message);
        // Orphan cleanup
        if (uploadedPaths.length > 0) {
          await supabase.storage.from("artworks").remove(uploadedPaths);
        }
        throw new Error(`Database save failed: ${error.message}`);
      }

      if (data) {
        const createdCloudArt = mapDbRecordToArtwork(data);
        const currentLocal = getStoredArtworks();
        localStorage.setItem(
          ARTWORKS_STORAGE_KEY,
          JSON.stringify([createdCloudArt, ...currentLocal]),
        );
        return createdCloudArt;
      }
    } catch (err: any) {
      if (uploadedPaths.length > 0) {
        await supabase.storage.from("artworks").remove(uploadedPaths);
      }
      throw err;
    }
  }

  // Local fallback if Supabase is not configured
  const current = getStoredArtworks();
  const newArtwork: Artwork = {
    ...artData,
    image: finalImages[0] || "",
    images: finalImages,
    id: `art_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  };
  const updated = [newArtwork, ...current];
  localStorage.setItem(ARTWORKS_STORAGE_KEY, JSON.stringify(updated));
  return newArtwork;
}

export async function deleteArtworkCloud(id: string): Promise<void> {
  if (isCloudConfigured && supabase) {
    try {
      await supabase.from("artworks").delete().eq("id", id);
    } catch (err) {
      console.error("Cloud delete error:", err);
    }
  }
  deleteArtwork(id);
}

export function deleteArtwork(id: string, _token?: string): void {
  const current = getStoredArtworks();
  const updated = current.filter((a) => a.id !== id);
  localStorage.setItem(ARTWORKS_STORAGE_KEY, JSON.stringify(updated));
}

export function resetArtworksToDefault(): void {
  localStorage.setItem(ARTWORKS_STORAGE_KEY, JSON.stringify(DEFAULT_ARTWORKS));
}

export const fetchArtworks = getArtworksAsync;
export const fetchArtworkById = getArtworkByIdAsync;

