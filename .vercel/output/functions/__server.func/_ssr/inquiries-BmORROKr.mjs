import { i as isCloudConfigured, s as supabase } from "./supabase-CQ76yxdm.mjs";
const INQUIRIES_STORAGE_KEY = "ravi_inquiries_v1";
async function getInquiriesAsync(token) {
  if (isCloudConfigured && supabase) {
    try {
      const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((item) => ({
          _id: String(item.id),
          name: item.name,
          email: item.email,
          subject: item.subject,
          message: item.message,
          read: Boolean(item.read),
          createdAt: item.created_at || (/* @__PURE__ */ new Date()).toISOString()
        }));
      }
    } catch (err) {
      console.warn("Supabase fetch inquiries failed:", err);
    }
  }
  return getStoredInquiries();
}
function getStoredInquiries() {
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
async function addInquiryCloud(data) {
  if (isCloudConfigured && supabase) {
    try {
      const { data: inserted, error } = await supabase.from("inquiries").insert([
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          read: false
        }
      ]).select().single();
      if (!error && inserted) {
        const cloudInq = {
          _id: String(inserted.id),
          name: inserted.name,
          email: inserted.email,
          subject: inserted.subject,
          message: inserted.message,
          read: Boolean(inserted.read),
          createdAt: inserted.created_at || (/* @__PURE__ */ new Date()).toISOString()
        };
        const local = getStoredInquiries();
        localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify([cloudInq, ...local]));
        return cloudInq;
      }
    } catch (err) {
      console.error("Supabase inquiry insert failed:", err);
    }
  }
  const current = getStoredInquiries();
  const newInquiry = {
    _id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    read: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  const updated = [newInquiry, ...current];
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  return newInquiry;
}
function markInquiryRead(id, token) {
  const current = getStoredInquiries();
  const updated = current.map((i) => i._id === id ? { ...i, read: true } : i);
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
}
function deleteInquiry(id, token) {
  const current = getStoredInquiries();
  const updated = current.filter((i) => i._id !== id);
  localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
}
const submitInquiry = addInquiryCloud;
const fetchInquiries = async (token) => ({
  inquiries: await getInquiriesAsync(),
  total: 0,
  unreadCount: 0
});
export {
  deleteInquiry as d,
  fetchInquiries as f,
  markInquiryRead as m,
  submitInquiry as s
};
