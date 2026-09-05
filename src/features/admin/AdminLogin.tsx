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
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-40 pb-20 max-w-md mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
          — Restricted
        </p>
        <h1 className="text-display text-5xl mb-10">Studio access</h1>
        <form onSubmit={login} className="space-y-4">
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Passphrase"
            className="w-full bg-input border border-border px-4 py-3 focus:outline-none focus:border-foreground"
          />
          {errors.login && <p className="text-xs text-destructive">{errors.login}</p>}
          <button className="w-full px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em]">
            Enter
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
