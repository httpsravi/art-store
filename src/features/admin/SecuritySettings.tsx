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
    <section style={{ maxWidth: "420px" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          textTransform: "uppercase",
          color: "var(--cp-text)",
          marginBottom: "24px",
        }}
      >
        SECURITY
      </h2>
      <form
        onSubmit={handlePasswordChange}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          border: "1px solid rgba(245,240,0,0.15)",
          padding: "24px",
          background: "var(--cp-surface)",
        }}
      >
        {passwordStatus.error && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--cp-red)",
              background: "rgba(255,60,60,0.06)",
              border: "1px solid rgba(255,60,60,0.2)",
              padding: "12px",
            }}
          >
            // {passwordStatus.error}
          </div>
        )}
        {passwordStatus.success && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--cp-green)",
              background: "rgba(156,255,0,0.06)",
              border: "1px solid rgba(156,255,0,0.2)",
              padding: "12px",
            }}
          >
            ● {passwordStatus.success}
          </div>
        )}

        <div>
          <label
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--cp-muted)",
              marginBottom: "8px",
            }}
          >
            CURRENT PASSPHRASE
          </label>
          <input
            type="password"
            value={currentPwd}
            onChange={(e) => setCurrentPwd(e.target.value)}
            className="cyber-input"
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--cp-muted)",
              marginBottom: "8px",
            }}
          >
            NEW PASSPHRASE
          </label>
          <input
            type="password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            className="cyber-input"
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--cp-muted)",
              marginBottom: "8px",
            }}
          >
            CONFIRM NEW PASSPHRASE
          </label>
          <input
            type="password"
            value={confirmNewPwd}
            onChange={(e) => setConfirmNewPwd(e.target.value)}
            className="cyber-input"
          />
        </div>

        <button
          type="submit"
          className="cyber-btn"
          style={{ width: "100%", justifyContent: "center" }}
        >
          UPDATE PASSPHRASE →
        </button>
      </form>
    </section>
  );
}
