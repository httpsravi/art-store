import { supabase, isCloudConfigured } from "@/lib/supabase";
import { type Inquiry } from "@/types/artwork";

const INQUIRIES_STORAGE_KEY = "ravi_inquiries_v1";

export async function getInquiriesAsync(token?: string): Promise<Inquiry[]> {
  if (isCloudConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((item: any) => ({
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

function getStoredInquiries(): Inquiry[] {
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
        .insert([
          {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            read: false,
          },
        ])
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

export function markInquiryRead(id: string, token?: string): void {
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

export function deleteInquiry(id: string, token?: string): void {
  const current = getStoredInquiries();
  const updated = current.filter((i) => i._id !== id);
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
}

export const submitInquiry = addInquiryCloud;
export const fetchInquiries = async (token?: string) => ({
  inquiries: await getInquiriesAsync(token),
  total: 0,
  unreadCount: 0,
});
