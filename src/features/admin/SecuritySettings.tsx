import { useState } from "react";
import { changeAdminPassword } from "@/services";

export function SecuritySettings() {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState("");
  const [passwordStatus, setPasswordStatus] = useState({ success: "", error: "" });

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordStatus({ success: "", error: "" });

    if (!currentPwd || !newPwd) {
      setPasswordStatus({ success: "", error: "All fields are required" });
      return;
    }
    if (newPwd !== confirmNewPwd) {
      setPasswordStatus({ success: "", error: "New passwords do not match" });
      return;
    }
    if (newPwd.length < 4) {
      setPasswordStatus({ success: "", error: "New password must be at least 4 characters" });
      return;
    }

    const token = sessionStorage.getItem("ravitej.token") || "";
    try {
      await changeAdminPassword(currentPwd, newPwd, token);
      setPasswordStatus({ success: "Password changed successfully!", error: "" });
      setCurrentPwd("");
      setNewPwd("");
      setConfirmNewPwd("");
    } catch (err: any) {
      setPasswordStatus({ success: "", error: err.message || "Failed to change password" });
    }
  }

  return (
    <section className="max-w-md">
      <h2 className="text-display text-3xl mb-6 font-light">Security & Password</h2>
      <form
        onSubmit={handlePasswordChange}
        className="space-y-4 border border-border/50 p-6 bg-card/20"
      >
        {passwordStatus.error && (
          <div className="text-xs text-destructive bg-destructive/10 border border-destructive/20 p-3">
            {passwordStatus.error}
          </div>
        )}
        {passwordStatus.success && (
          <div className="text-xs text-green-500 bg-green-500/10 border border-green-500/20 p-3">
            {passwordStatus.success}
          </div>
        )}

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
            Current Passphrase
          </label>
          <input
            type="password"
            value={currentPwd}
            onChange={(e) => setCurrentPwd(e.target.value)}
            className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
            New Passphrase
          </label>
          <input
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
            Confirm New Passphrase
          </label>
          <input
            type="password"
            value={confirmNewPwd}
            onChange={(e) => setConfirmNewPwd(e.target.value)}
            className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
          />
        </div>

        <button className="w-full px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] hover:bg-primary/90">
          Update Passphrase
        </button>
      </form>
    </section>
  );
}
