import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminLogin } from "@/features/admin/AdminLogin";
import { AdminDashboard } from "@/features/admin/AdminDashboard";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Studio — Admin" }, { name: "robots", content: "noindex" }],
  }),
  component: Admin,
});

function Admin() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("ravitej.token");
    if (token) {
      setAuthed(true);
    }
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("ravitej.token");
    setAuthed(false);
  }

  if (!authed) {
    return <AdminLogin onLoginSuccess={() => setAuthed(true)} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
