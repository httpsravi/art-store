import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { submitInquiry } from "@/services";

const searchSchema = z.object({
  subject: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Contact & Commissions — Ravitej" },
      {
        name: "description",
        content: "Contact Ravitej for purchases, commissions, or studio inquiries.",
      },
    ],
  }),
  component: Contact,
});

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
});

function Contact() {
  const { subject } = Route.useSearch();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const result = formSchema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    submitInquiry(result.data)
      .then(() => {
        setSent(true);
      })
      .catch((err) => {
        console.error(err);
        setErrors({ submit: err.message || "Failed to send message. Please try again." });
      });
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
            — Get in touch
          </p>
          <h1 className="text-display text-5xl md:text-7xl leading-none mb-10">Say hello.</h1>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Purchase inquiries, custom commissions, exhibitions, or just to talk about a piece —
            write to me directly.
          </p>
          <div className="space-y-6 text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">
                Email
              </p>
              <a
                href="mailto:studio@ravitej.art"
                className="hover:text-foreground border-b border-border"
              >
                studio@ravitej.art
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">
                Response time
              </p>
              <p>Within 48 hours</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {sent ? (
            <div className="border border-border p-16 text-center bg-card/30">
              <h2 className="text-display text-4xl mb-4">Thank you.</h2>
              <p className="text-muted-foreground">
                Your message is in. I'll write back within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <Field label="Name" name="name" error={errors.name} />
              <Field label="Email" name="email" type="email" error={errors.email} />
              <Field label="Subject" name="subject" defaultValue={subject} error={errors.subject} />
              <div>
                <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2 block">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-destructive">{errors.message}</p>
                )}
              </div>
              {errors.submit && <p className="text-xs text-destructive">{errors.submit}</p>}
              <button
                type="submit"
                className="px-10 py-4 bg-primary text-primary-foreground text-xs uppercase tracking-[0.25em] hover:bg-primary/90 transition-colors"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2 block">
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="w-full bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:border-foreground transition-colors"
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
