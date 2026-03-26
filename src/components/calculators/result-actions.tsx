"use client";

import { useState } from "react";
import { Printer, Mail, X, CheckCircle, Send, AlertCircle } from "lucide-react";
import { EMAIL_API_URL } from "@/config/site";

interface ResultActionsProps {
  /** Calculator name shown in the email subject, e.g. "Personal Loan Calculator" */
  calculatorType?: string;
  /** Text summary of results to include in the email */
  resultsSummary?: string;
}

export function ResultActions({
  calculatorType = "Calculator",
  resultsSummary = "",
}: ResultActionsProps) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handlePrint() {
    window.print();
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch(`${EMAIL_API_URL}/calculator`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          calculatorType,
          results: resultsSummary || "No results available. Please recalculate on pesohub.ph.",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send email");
      }

      setSending(false);
      setSent(true);
      setTimeout(() => {
        setShowEmailModal(false);
        setSent(false);
        setEmail("");
      }, 2000);
    } catch (err) {
      setSending(false);
      setError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-[14px] font-medium text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-500"
          title="Print results"
        >
          <Printer className="size-3.5" />
          Print
        </button>
        <button
          type="button"
          onClick={() => setShowEmailModal(true)}
          className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-[14px] font-medium text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-500"
          title="Email results"
        >
          <Mail className="size-3.5" />
          Email
        </button>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              if (!sending) {
                setShowEmailModal(false);
                setSent(false);
                setEmail("");
                setError("");
              }
            }}
          />
          <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={() => {
                if (!sending) {
                  setShowEmailModal(false);
                  setSent(false);
                  setEmail("");
                  setError("");
                }
              }}
              className="absolute right-3 top-3 rounded-md p-1 text-gray-400 transition-colors hover:text-gray-500"
            >
              <X className="size-4" />
            </button>

            {sent ? (
              <div className="flex flex-col items-center py-4 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle className="size-6 text-emerald-600" />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-500">
                  Results Sent
                </p>
                <p className="mt-1 text-[14px] text-gray-400">
                  Check your inbox for the calculation summary.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-base font-semibold text-gray-500">
                  Email Results
                </h3>
                <p className="mt-1 text-[14px] text-gray-400">
                  We&apos;ll send a summary of your calculation to your email.
                </p>

                {error && (
                  <div className="mt-3 flex items-start gap-2 rounded-md border border-red-500/20 bg-red-500/5 px-3 py-2">
                    <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-red-500" />
                    <p className="text-[14px] text-red-500">{error}</p>
                  </div>
                )}

                <form onSubmit={handleEmailSubmit} className="mt-4">
                  <label
                    htmlFor="result-email"
                    className="mb-1.5 block text-sm font-medium text-gray-500"
                  >
                    Email Address
                  </label>
                  <input
                    id="result-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-500 placeholder:text-gray-300 outline-none transition-colors focus:border-brand focus:ring-1 focus:ring-brand"
                    disabled={sending}
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send Results
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
