import { supabase, isCloudConfigured } from "./supabase";

export type Medium = "charcoal" | "paintings" | "sketches";

export interface Artwork {
  id: string;
  title: string;
  medium: Medium;
  year: number;
  dimensions: string;
  price: number;
  image: string; // primary image (kept for backwards compatibility)
  images?: string[];
  description: string;
  created_at?: string;
}

export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const MEDIUMS: { id: Medium | "all"; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "charcoal", label: "Charcoal" },
  { id: "paintings", label: "Paintings" },
  { id: "sketches", label: "Sketches" },
];

/* ── Default Artworks Dataset ─────────────────────────────── */
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
    description: "A study in shadow and silence, exploring the boundary between presence and absence.",
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
const INQUIRIES_STORAGE_KEY = "ravi_inquiries_v1";
const PASSPHRASE_STORAGE_KEY = "ravi_admin_passphrase_v1";

export const DEFAULT_PASSPHRASE = import.meta.env.VITE_ADMIN_PASSPHRASE ?? "";

/* ── ARTWORKS DATA ACCESS (CLOUD + LOCAL FALLBACK) ───────── */
export async function getArtworksAsync(): Promise<Artwork[]> {
  if (isCloudConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((item) => {
          let parsedImages = [item.image];
          if (item.image && item.image.startsWith("[")) {
            try {
              parsedImages = JSON.parse(item.image);
            } catch (e) {}
          }
          return {
            id: String(item.id),
            title: item.title,
            medium: item.medium as Medium,
            year: Number(item.year),
            dimensions: item.dimensions,
            price: Number(item.price),
            image: parsedImages[0] || item.image,
            images: parsedImages,
            description: item.description,
            created_at: item.created_at,
          };
        });
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local dataset:", err);
    }
  }
  return getStoredArtworks();
}

export function getStoredArtworks(): Artwork[] {
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

export async function createArtwork(formData: FormData, token: string): Promise<Artwork> {
  // Extract fields from the FormData
  const artData = {
    title: String(formData.get("title") ?? ""),
    medium: String(formData.get("medium") ?? "") as Medium,
    year: Number(formData.get("year") ?? 0),
    dimensions: String(formData.get("dimensions") ?? ""),
    price: Number(formData.get("price") ?? 0),
    description: String(formData.get("description") ?? ""),
    image: "has-image",
  };

  // Support multiple files under "images[]" key, fallback to single "image"
  const multiFiles = formData.getAll("images[]") as File[];
  const singleFile = formData.get("image") as File | null;
  const imageFiles: File[] =
    multiFiles.length > 0
      ? multiFiles.filter((f) => f && f.size > 0)
      : singleFile
      ? [singleFile]
      : [];

  return saveArtworkCloud(artData, imageFiles.length > 0 ? imageFiles : null);
}

export async function getArtworkByIdAsync(id: string): Promise<Artwork> {
  if (isCloudConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        let parsedImages = [data.image];
        if (data.image && data.image.startsWith("[")) {
          try {
            parsedImages = JSON.parse(data.image);
          } catch (e) {}
        }
        return {
          id: String(data.id),
          title: data.title,
          medium: data.medium as Medium,
          year: Number(data.year),
          dimensions: data.dimensions,
          price: Number(data.price),
          image: parsedImages[0] || data.image,
          images: parsedImages,
          description: data.description,
          created_at: data.created_at,
        };
      }
    } catch (err) {
      console.warn("Supabase fetch artwork by ID failed, falling back to local dataset:", err);
    }
  }

  const artworks = getStoredArtworks();
  const found = artworks.find((a) => a.id === id);
  if (!found) throw new Error("Artwork not found");
  return found;
}


export async function saveArtworkCloud(
  artData: {
    title: string;
    medium: Medium;
    year: number;
    dimensions: string;
    price: number;
    description: string;
    image: string; // Used as primary preview if saving without cloud
    images?: string[];
  },
  imageFiles?: File[] | null
): Promise<Artwork> {
  let imageUrls = artData.images && artData.images.length > 0 ? artData.images : [artData.image].filter(Boolean);

  // 1. Upload images to Supabase Storage if files provided and cloud is active
  if (isCloudConfigured && supabase && imageFiles && imageFiles.length > 0) {
    try {
      const uploadedUrls: string[] = [];
      for (const imageFile of imageFiles) {
        const fileExt = imageFile.name.split(".").pop() || "jpg";
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const filePath = `artworks/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("artworks")
          .upload(filePath, imageFile, { upsert: true });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from("artworks")
            .getPublicUrl(filePath);
          if (publicUrlData?.publicUrl) {
            uploadedUrls.push(publicUrlData.publicUrl);
          }
        } else {
          console.warn("Storage upload warning:", uploadError.message);
        }
      }
      if (uploadedUrls.length > 0) {
        imageUrls = uploadedUrls;
      }
    } catch (err) {
      console.warn("Storage upload failed, falling back:", err);
    }
  }

  // 2. Insert into Supabase DB if active
  if (isCloudConfigured && supabase) {
    try {
      const payload = {
        title: artData.title,
        medium: artData.medium,
        year: artData.year,
        dimensions: artData.dimensions,
        price: artData.price,
        image: JSON.stringify(imageUrls), // Serialize into existing column
        description: artData.description,
      };

      const { data, error } = await supabase
        .from("artworks")
        .insert([payload])
        .select()
        .single();

      if (!error && data) {
        const createdCloudArt: Artwork = {
          id: String(data.id),
          title: data.title,
          medium: data.medium as Medium,
          year: Number(data.year),
          dimensions: data.dimensions,
          price: Number(data.price),
          image: imageUrls[0] || "",
          images: imageUrls,
          description: data.description,
          created_at: data.created_at,
        };
        // Sync local storage as cache
        const currentLocal = getStoredArtworks();
        localStorage.setItem(ARTWORKS_STORAGE_KEY, JSON.stringify([createdCloudArt, ...currentLocal]));
        return createdCloudArt;
      } else if (error) {
        console.error("Supabase DB Insert Error:", error.message);
      }
    } catch (err) {
      console.error("Cloud save failed:", err);
    }
  }

  // 3. Fallback: Save to LocalStorage
  const current = getStoredArtworks();
  const newArtwork: Artwork = {
    ...artData,
    image: imageUrls[0] || "",
    images: imageUrls,
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
  // Always update local cache
  deleteArtwork(id);
}

export function deleteArtwork(id: string): void {
  const current = getStoredArtworks();
  const updated = current.filter((a) => a.id !== id);
  localStorage.setItem(ARTWORKS_STORAGE_KEY, JSON.stringify(updated));
}

export function resetArtworksToDefault(): void {
  localStorage.setItem(ARTWORKS_STORAGE_KEY, JSON.stringify(DEFAULT_ARTWORKS));
}

/* ── INQUIRIES DATA ACCESS ─────────────────────────────── */
export async function getInquiriesAsync(): Promise<Inquiry[]> {
  if (isCloudConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((item) => ({
          _id: String(item.id),
          name: item.name,
          email: item.email,
          subject: item.subject,
          message: item.message,
          read: Boolean(item.read),
          createdAt: item.created_at || new Date().toISOString(),
        }));
      }
    } catch (err) {
      console.warn("Supabase fetch inquiries failed:", err);
    }
  }
  return getStoredInquiries();
}

export function getStoredInquiries(): Inquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading inquiries from localStorage:", err);
    return [];
  }
}

export async function addInquiryCloud(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<Inquiry> {
  if (isCloudConfigured && supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from("inquiries")
        .insert([{
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          read: false,
        }])
        .select()
        .single();

      if (!error && inserted) {
        const cloudInq: Inquiry = {
          _id: String(inserted.id),
          name: inserted.name,
          email: inserted.email,
          subject: inserted.subject,
          message: inserted.message,
          read: Boolean(inserted.read),
          createdAt: inserted.created_at || new Date().toISOString(),
        };
        const local = getStoredInquiries();
        localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify([cloudInq, ...local]));
        return cloudInq;
      }
    } catch (err) {
      console.error("Supabase inquiry insert failed:", err);
    }
  }

  // Fallback local save
  const current = getStoredInquiries();
  const newInquiry: Inquiry = {
    _id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    read: false,
    createdAt: new Date().toISOString(),
  };
  const updated = [newInquiry, ...current];
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  return newInquiry;
}

export const addInquiry = addInquiryCloud;

export async function markInquiryReadCloud(id: string): Promise<void> {
  if (isCloudConfigured && supabase) {
    try {
      await supabase.from("inquiries").update({ read: true }).eq("id", id);
    } catch (err) {
      console.error("Cloud mark read error:", err);
    }
  }
  markInquiryRead(id);
}

export function markInquiryRead(id: string): void {
  const current = getStoredInquiries();
  const updated = current.map((i) => (i._id === id ? { ...i, read: true } : i));
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
}

export async function deleteInquiryCloud(id: string): Promise<void> {
  if (isCloudConfigured && supabase) {
    try {
      await supabase.from("inquiries").delete().eq("id", id);
    } catch (err) {
      console.error("Cloud delete inquiry error:", err);
    }
  }
  deleteInquiry(id);
}

export function deleteInquiry(id: string): void {
  const current = getStoredInquiries();
  const updated = current.filter((i) => i._id !== id);
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
}

/* ── PASSPHRASE AUTHENTICATION HELPERS ──────────────────── */
export function getAdminPassphrase(): string {
  if (typeof window === "undefined") return DEFAULT_PASSPHRASE;
  return localStorage.getItem(PASSPHRASE_STORAGE_KEY) || DEFAULT_PASSPHRASE;
}

export function verifyAdminPassphrase(passphrase: string): boolean {
  return passphrase === getAdminPassphrase();
}

export function changeAdminPassphrase(currentPass: string, newPass: string): { success: boolean; message: string } {
  if (!verifyAdminPassphrase(currentPass)) {
    return { success: false, message: "Current passphrase is incorrect." };
  }
  if (!newPass || newPass.trim().length < 4) {
    return { success: false, message: "New passphrase must be at least 4 characters." };
  }
  localStorage.setItem(PASSPHRASE_STORAGE_KEY, newPass.trim());
  return { success: true, message: "Passphrase updated successfully!" };
}

/* ── BACKWARD COMPATIBILITY EXPORTS ────────────────────── */
export const fetchArtworks = getArtworksAsync;
export const fetchArtworkById = getArtworkByIdAsync;
// export const createArtifact = saveArtworkCloud; // removed duplicate export
export const submitInquiry = addInquiryCloud;
export const fetchInquiries = async () => ({
  inquiries: await getInquiriesAsync(),
  total: 0,
  unreadCount: 0,
});
export const loginAdmin = async (pass: string) => {
  if (verifyAdminPassphrase(pass)) return "admin_token";
  throw new Error("Invalid passphrase");
};
export const changeAdminPassword = async (curr: string, next: string) => {
  const res = changeAdminPassphrase(curr, next);
  if (!res.success) throw new Error(res.message);
};

