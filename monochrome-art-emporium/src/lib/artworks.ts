export type Medium = "charcoal" | "paintings" | "sketches";

export interface Artwork {
  id: string;
  title: string;
  medium: Medium;
  year: number;
  dimensions: string;
  price: number;
  image: string;
  imagePublicId?: string;
  description: string;
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

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Artworks API
export async function fetchArtworks(medium?: string): Promise<Artwork[]> {
  const url = new URL(`${API_BASE_URL}/api/artworks`);
  url.searchParams.append("limit", "100"); // fetch all works for listing
  if (medium && medium !== "all") {
    url.searchParams.append("medium", medium);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch artworks");
  const data = await res.json();
  return data.artworks;
}

export async function fetchArtworkById(id: string): Promise<Artwork> {
  const res = await fetch(`${API_BASE_URL}/api/artworks/${id}`);
  if (!res.ok) throw new Error("Artwork not found");
  return res.json();
}

export async function createArtwork(formData: FormData, token: string): Promise<Artwork> {
  const res = await fetch(`${API_BASE_URL}/api/artworks`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData,
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to publish artwork");
  }
  return res.json();
}

export async function deleteArtwork(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/artworks/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to delete artwork");
  }
}

// Inquiries API
export async function submitInquiry(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to submit inquiry");
  }
}

export async function fetchInquiries(
  token: string,
  read?: boolean
): Promise<{ inquiries: Inquiry[]; total: number; unreadCount: number }> {
  const url = new URL(`${API_BASE_URL}/api/inquiries`);
  url.searchParams.append("limit", "100");
  if (read !== undefined) {
    url.searchParams.append("read", String(read));
  }
  const res = await fetch(url.toString(), {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch inquiries");
  return res.json();
}

export async function markInquiryRead(id: string, token: string): Promise<Inquiry> {
  const res = await fetch(`${API_BASE_URL}/api/inquiries/${id}/read`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to mark inquiry as read");
  return res.json();
}

export async function deleteInquiry(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/inquiries/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to delete inquiry");
}

// Auth API
export async function loginAdmin(password: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: "ravitej", password })
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Invalid passphrase");
  }
  const data = await res.json();
  return data.token;
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string,
  token: string
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to update password");
  }
}
