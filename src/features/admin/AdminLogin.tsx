import { useState } from "react";
import { loginAdmin } from "@/services";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function AdminLogin({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) {
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function login(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    loginAdmin(pwd)
      .then((token) => {
        onLoginSuccess(token);
        setPwd("");
      })
      .catch((err) => {
        setErrors({ login: err.message || "Failed to enter studio." });
      });
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--cp-bg)" }}>
      <Navbar />
      <main
        style={{
          paddingTop: "160px",
          paddingBottom: "80px",
          maxWidth: "420px",
          margin: "0 auto",
          padding: "160px 24px 80px",
        }}
      >
        <div className="section-label" style={{ marginBottom: "24px" }}>
          // RESTRICTED ACCESS
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            textTransform: "uppercase",
            color: "var(--cp-text)",
            lineHeight: 0.95,
            marginBottom: "40px",
          }}
        >
          STUDIO
          <br />
          <span style={{ color: "var(--cp-yellow)" }}>ACCESS</span>
        </h1>
        <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              htmlFor="admin-pass"
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
              PASSPHRASE
            </label>
            <input
              id="admin-pass"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Enter passphrase"
              className="cyber-input"
            />
          </div>
          {errors.login && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--cp-red)",
              }}
            >
              // ERROR: {errors.login}
            </p>
          )}
          <button
            type="submit"
            className="cyber-btn"
            style={{ width: "100%", justifyContent: "center" }}
          >
            AUTHENTICATE →
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
