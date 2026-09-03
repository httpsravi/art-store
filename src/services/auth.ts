const PASSPHRASE_STORAGE_KEY = "ravi_admin_passphrase_v1";
const DEFAULT_PASSPHRASE = import.meta.env.VITE_ADMIN_PASSPHRASE ?? "ravi2049";

export function getAdminPassphrase(): string {
  if (typeof window === "undefined") return DEFAULT_PASSPHRASE;
  return localStorage.getItem(PASSPHRASE_STORAGE_KEY) || DEFAULT_PASSPHRASE;
}

export function verifyAdminPassphrase(passphrase: string): boolean {
  return passphrase === getAdminPassphrase();
}

export function changeAdminPassphrase(
  currentPass: string,
  newPass: string,
  token?: string,
): { success: boolean; message: string } {
  if (!verifyAdminPassphrase(currentPass)) {
    return { success: false, message: "Current passphrase is incorrect." };
  }
  if (!newPass || newPass.trim().length < 4) {
    return { success: false, message: "New passphrase must be at least 4 characters." };
  }
  localStorage.setItem(PASSPHRASE_STORAGE_KEY, newPass.trim());
  return { success: true, message: "Passphrase updated successfully!" };
}

export const loginAdmin = async (pass: string) => {
  if (verifyAdminPassphrase(pass)) return "admin_token";
  throw new Error("Invalid passphrase");
};

export const changeAdminPassword = async (curr: string, next: string, token?: string) => {
  const res = changeAdminPassphrase(curr, next, token);
  if (!res.success) throw new Error(res.message);
};
