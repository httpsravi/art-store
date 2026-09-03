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
    <div style={{ minHeight: "100vh", background: "var(--cp-bg)" }}>
      <Navbar />

      <main
        style={{
          paddingTop: "96px",
          paddingBottom: "80px",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "96px 24px 80px",
        }}
      >
        {/* ─── HEADER ─── */}
        <div style={{ marginBottom: "64px" }}>
          <div className="section-label" style={{ marginBottom: "20px" }}>
            INITIATE // TRANSMISSION
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 12vw, 10rem)",
              textTransform: "uppercase",
              lineHeight: 0.88,
              color: "var(--cp-text)",
              margin: 0,
            }}
          >
            SAY
            <br />
            <span style={{ color: "var(--cp-yellow)" }}>HELLO.</span>
          </h1>
        </div>

        {/* ─── CONTENT GRID ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Left: Info */}
          <div>
            <p
              style={{
                fontSize: "14px",
                color: "var(--cp-muted)",
                lineHeight: 1.8,
                marginBottom: "40px",
              }}
            >
              Purchase inquiries, custom commissions, exhibitions, or just to talk about a piece — write to me directly.
            </p>

            {/* Contact info terminal */}
            <div
              style={{
                border: "1px solid rgba(245,240,0,0.15)",
                background: "var(--cp-surface)",
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid rgba(245,240,0,0.1)",
                  padding: "10px 16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    color: "var(--cp-yellow)",
                    textTransform: "uppercase",
                  }}
                >
                  CONTACT_CHANNELS.SYS
                </span>
              </div>

              {[
                {
                  key: "EMAIL",
                  value: "studio@ravitej.art",
                  href: "mailto:studio@ravitej.art",
                },
                { key: "RESPONSE_TIME", value: "Within 48 Hours", href: null },
                { key: "COMMISSIONS", value: "● OPEN", href: null, highlight: true },
                { key: "LOCATION", value: "Karnataka, India", href: null },
              ].map(({ key, value, href, highlight }) => (
                <div
                  key={key}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr",
                    borderBottom: "1px solid rgba(245,240,0,0.06)",
                    padding: "12px 16px",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--cp-muted)",
                    }}
                  >
                    {key}:
                  </span>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        color: "var(--cp-cyan)",
                        textDecoration: "none",
                      }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        color: highlight ? "var(--cp-green)" : "var(--cp-text)",
                        textTransform: highlight ? "uppercase" : "none",
                      }}
                    >
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* HUD decoration */}
            <div
              style={{
                marginTop: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {["NEW_TRANSMISSION_OPEN", "ACCESS_GRANTED", "ENCRYPTION: OFF"].map((label) => (
                <span
                  key={label}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "8px",
                    letterSpacing: "0.2em",
                    color: "var(--cp-dim)",
                    textTransform: "uppercase",
                  }}
                >
                  // {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Form / Success */}
          <div>
            {sent ? (
              /* ─── SUCCESS STATE ─── */
              <div
                style={{
                  border: "1px solid rgba(156,255,0,0.3)",
                  background: "rgba(156,255,0,0.04)",
                  padding: "64px 40px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Corner brackets */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "24px",
                    height: "24px",
                    borderTop: "2px solid var(--cp-green)",
                    borderLeft: "2px solid var(--cp-green)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "24px",
                    height: "24px",
                    borderBottom: "2px solid var(--cp-green)",
                    borderRight: "2px solid var(--cp-green)",
                  }}
                />

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    color: "var(--cp-green)",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  ● TRANSMISSION RECEIVED
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(2rem, 6vw, 3.5rem)",
                    textTransform: "uppercase",
                    color: "var(--cp-text)",
                    marginBottom: "16px",
                    lineHeight: 0.95,
                  }}
                >
                  THANK YOU.
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: "var(--cp-muted)",
                    lineHeight: 1.7,
                  }}
                >
                  Your message is in. I'll write back within 48 hours.
                </p>
              </div>
            ) : (
              /* ─── FORM ─── */
              <form
                id="contact-form"
                onSubmit={onSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "24px" }}
              >
                {/* Form header */}
                <div
                  style={{
                    borderBottom: "1px solid rgba(245,240,0,0.15)",
                    paddingBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      letterSpacing: "0.25em",
                      color: "var(--cp-yellow)",
                      textTransform: "uppercase",
                    }}
                  >
                    // COMPOSE_MESSAGE
                  </span>
                  <span className="status-badge">READY</span>
                </div>

                <CyberField
                  id="contact-name"
                  label="Name"
                  name="name"
                  error={errors.name}
                />
                <CyberField
                  id="contact-email"
                  label="Email"
                  name="email"
                  type="email"
                  error={errors.email}
                />
                <CyberField
                  id="contact-subject"
                  label="Subject"
                  name="subject"
                  defaultValue={subject}
                  error={errors.subject}
                />

                {/* Message textarea */}
                <div>
                  <label
                    htmlFor="contact-message"
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
                    MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    required
                    className="cyber-input"
                    style={{
                      resize: "none",
                      fontFamily: "var(--font-mono)",
                      lineHeight: 1.8,
                    }}
                  />
                  {errors.message && (
                    <p
                      style={{
                        marginTop: "6px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        color: "var(--cp-red)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      // {errors.message}
                    </p>
                  )}
                </div>

                {errors.submit && (
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      color: "var(--cp-red)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    // ERROR: {errors.submit}
                  </p>
                )}

                <button
                  type="submit"
                  id="contact-submit"
                  className="cyber-btn"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  SEND TRANSMISSION →
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function CyberField({
  id,
  label,
  name,
  type = "text",
  defaultValue,
  error,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
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
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="cyber-input"
      />
      {error && (
        <p
          style={{
            marginTop: "6px",
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            color: "var(--cp-red)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          // {error}
        </p>
      )}
    </div>
  );
}
