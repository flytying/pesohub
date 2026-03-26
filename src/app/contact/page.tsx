"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { SITE_NAME, EMAIL_API_URL } from "@/config/site";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch(`${EMAIL_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message");
      }

      setFormState("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setFormState("error");
    }
  }

  return (
    <>
      {/* Hero header */}
      <section className="bg-brand py-10 text-white sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-[32px] font-medium leading-[48px] sm:text-[48px] sm:leading-[48px]">
            Contact Us
          </h1>
          <p className="mt-3 text-[16px] leading-[22px] text-surface-secondary sm:text-[20px] sm:leading-[26px]">
            Have a question, suggestion, or found an error? We&apos;d love to
            hear from you. Fill out the form and we&apos;ll get back to you as
            soon as possible.
          </p>
        </div>
      </section>

    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.5fr]">
        {/* Left column — info */}
        <div>

          <div className="mt-10 space-y-6">
            <div>
              <h2 className="text-[14px] font-semibold uppercase tracking-wider text-gray-400">
                Response Time
              </h2>
              <p className="mt-1 text-[16px] leading-[22px] text-gray-400">
                We typically respond within 1–2 business days.
              </p>
            </div>
            <div>
              <h2 className="text-[14px] font-semibold uppercase tracking-wider text-gray-400">
                Important Note
              </h2>
              <p className="mt-1 text-[16px] leading-[22px] text-gray-400">
                {SITE_NAME} provides free financial tools for educational
                purposes. We cannot provide personalized financial advice. For
                specific financial questions, please consult a qualified
                professional.
              </p>
            </div>
          </div>
        </div>

        {/* Right column — form */}
        <div>
          {formState === "success" ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-8 py-16 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle className="size-7 text-emerald-600" />
              </div>
              <h2 className="mt-5 text-[20px] font-semibold leading-[26px] text-gray-500">
                Message Sent
              </h2>
              <p className="mt-2 max-w-sm text-[16px] leading-[22px] text-gray-400">
                Thank you for reaching out. We&apos;ll review your message and
                get back to you shortly.
              </p>
              <button
                onClick={() => setFormState("idle")}
                className="mt-6 text-[14px] font-medium text-brand hover:text-brand/80 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {formState === "error" && (
                <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                  <p className="text-[14px] text-red-500">{errorMsg}</p>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-[14px] font-medium text-gray-500"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[14px] text-gray-500 placeholder:text-gray-400/50 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[14px] font-medium text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[14px] text-gray-500 placeholder:text-gray-400/50 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-[14px] font-medium text-gray-500"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[14px] text-gray-500 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="general">General Inquiry</option>
                  <option value="bug">Report a Bug or Error</option>
                  <option value="suggestion">Feature Suggestion</option>
                  <option value="data">Data Correction</option>
                  <option value="partnership">Partnership / Advertising</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-[14px] font-medium text-gray-500"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[14px] text-gray-500 placeholder:text-gray-400/50 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-brand/90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formState === "submitting" ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
