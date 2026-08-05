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
