import { i as isCloudConfigured, s as supabase } from "./supabase-CQ76yxdm.mjs";
const MEDIUMS = [
  { id: "all", label: "All Works" },
  { id: "charcoal", label: "Charcoal" },
  { id: "paintings", label: "Paintings" },
  { id: "sketches", label: "Sketches" }
];
const DEFAULT_ARTWORKS = [
  {
    id: "1",
    title: "Whispers in Graphite",
    medium: "charcoal",
    year: 2025,
    dimensions: "24 × 36 in",
    price: 4500,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9fd0c121?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1578301978693-85fa9fd0c121?w=600&q=80"],
    description: "A study in shadow and silence, exploring the boundary between presence and absence."
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
    description: "Oil on canvas. A meditation on light through layered washes of grey."
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
    description: "Pencil on archival paper. Capturing the fleeting geometry of afternoon light."
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
    description: "Charcoal on textured paper. Objects rendered with dramatic chiaroscuro."
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
    description: "Bold gestural strokes on canvas. Raw emotion distilled into monochrome."
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
    description: "Graphite portrait capturing the quiet intensity of an unguarded moment."
  }
];
const ARTWORKS_STORAGE_KEY = "ravi_artworks_v1";
async function getArtworksAsync(medium, token) {
  if (isCloudConfigured && supabase) {
    try {
      const { data, error } = await supabase.from("artworks").select("*").order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map((item) => {
          let parsedImages = [item.image];
          if (item.image && item.image.startsWith("[")) {
            try {
              parsedImages = JSON.parse(item.image);
            } catch (e) {
            }
          }
          return {
            id: String(item.id),
            title: item.title,
            medium: item.medium,
            year: Number(item.year),
            dimensions: item.dimensions,
            price: Number(item.price),
            image: parsedImages[0] || item.image,
            images: parsedImages,
            description: item.description,
            created_at: item.created_at
          };
        });
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local dataset:", err);
    }
  }
  return getStoredArtworks();
}
function getStoredArtworks() {
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
async function createArtwork(formData, token) {
  const artData = {
    title: String(formData.get("title") ?? ""),
    medium: String(formData.get("medium") ?? ""),
    year: Number(formData.get("year") ?? 0),
    dimensions: String(formData.get("dimensions") ?? ""),
    price: Number(formData.get("price") ?? 0),
    description: String(formData.get("description") ?? ""),
    image: "has-image"
  };
  const multiFiles = formData.getAll("images[]");
  const singleFile = formData.get("image");
  const imageFiles = multiFiles.length > 0 ? multiFiles.filter((f) => f && f.size > 0) : singleFile ? [singleFile] : [];
  return saveArtworkCloud(artData, imageFiles.length > 0 ? imageFiles : null);
}
async function getArtworkByIdAsync(id) {
  if (isCloudConfigured && supabase) {
    try {
      const { data, error } = await supabase.from("artworks").select("*").eq("id", id).single();
      if (!error && data) {
        let parsedImages = [data.image];
        if (data.image && data.image.startsWith("[")) {
          try {
            parsedImages = JSON.parse(data.image);
          } catch (e) {
          }
        }
        return {
          id: String(data.id),
          title: data.title,
          medium: data.medium,
          year: Number(data.year),
          dimensions: data.dimensions,
          price: Number(data.price),
          image: parsedImages[0] || data.image,
          images: parsedImages,
          description: data.description,
          created_at: data.created_at
        };
      }
    } catch (err) {
      console.warn("Supabase fetch artwork by ID failed, falling back to local dataset:", err);
    }
  }
  const artworks = getStoredArtworks();
  const found = artworks.find((a) => a.id === id);
  if (!found) return null;
  return found;
}
async function saveArtworkCloud(artData, imageFiles) {
  let imageUrls = artData.images && artData.images.length > 0 ? artData.images : [artData.image].filter(Boolean);
  if (isCloudConfigured && supabase && imageFiles && imageFiles.length > 0) {
    try {
      const uploadedUrls = [];
      for (const imageFile of imageFiles) {
        const fileExt = imageFile.name.split(".").pop() || "jpg";
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const filePath = `artworks/${fileName}`;
        const { error: uploadError } = await supabase.storage.from("artworks").upload(filePath, imageFile, { upsert: true });
        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage.from("artworks").getPublicUrl(filePath);
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
  if (isCloudConfigured && supabase) {
    try {
      const payload = {
        title: artData.title,
        medium: artData.medium,
        year: artData.year,
        dimensions: artData.dimensions,
        price: artData.price,
        image: JSON.stringify(imageUrls),
        description: artData.description
      };
      const { data, error } = await supabase.from("artworks").insert([payload]).select().single();
      if (!error && data) {
        const createdCloudArt = {
          id: String(data.id),
          title: data.title,
          medium: data.medium,
          year: Number(data.year),
          dimensions: data.dimensions,
          price: Number(data.price),
          image: imageUrls[0] || "",
          images: imageUrls,
          description: data.description,
          created_at: data.created_at
        };
        const currentLocal = getStoredArtworks();
        localStorage.setItem(
          ARTWORKS_STORAGE_KEY,
          JSON.stringify([createdCloudArt, ...currentLocal])
        );
        return createdCloudArt;
      } else if (error) {
        console.error("Supabase DB Insert Error:", error.message);
      }
    } catch (err) {
      console.error("Cloud save failed:", err);
    }
  }
  const current = getStoredArtworks();
  const newArtwork = {
    ...artData,
    image: imageUrls[0] || "",
    images: imageUrls,
    id: `art_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  };
  const updated = [newArtwork, ...current];
  localStorage.setItem(ARTWORKS_STORAGE_KEY, JSON.stringify(updated));
  return newArtwork;
}
function deleteArtwork(id, token) {
  const current = getStoredArtworks();
  const updated = current.filter((a) => a.id !== id);
  localStorage.setItem(ARTWORKS_STORAGE_KEY, JSON.stringify(updated));
}
const fetchArtworks = getArtworksAsync;
const fetchArtworkById = getArtworkByIdAsync;
export {
  MEDIUMS as M,
  fetchArtworkById as a,
  createArtwork as c,
  deleteArtwork as d,
  fetchArtworks as f
};
