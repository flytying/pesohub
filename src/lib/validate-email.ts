// ---------------------------------------------------------------------------
// Email-quality validation shared by the contact form (client-side, inline) and
// the calculator email field. The SAME rules are mirrored server-side in
// server/index.mjs and workers/email-api/src/index.ts — if you change the regex,
// the disposable list, or the dummy patterns here, update those two copies too.
//
// Scope: rejects malformed addresses, throwaway/disposable domains, and obvious
// placeholder ("dummy") addresses. It cannot detect a well-formed address at a
// real provider (e.g. a nonsense gmail) — that needs a confirmation-link flow.
// ---------------------------------------------------------------------------

/** Structure check: sane local part, a domain label, and a dotted TLD. */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/** Throwaway / temporary-inbox providers — not durable, so not accepted. */
export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.info",
  "sharklasers.com",
  "10minutemail.com",
  "10minutemail.net",
  "tempmail.com",
  "temp-mail.org",
  "tempmailo.com",
  "throwawaymail.com",
  "throwaway.email",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "nada.email",
  "maildrop.cc",
  "dispostable.com",
  "fakeinbox.com",
  "mailnesia.com",
  "mytemp.email",
  "moakt.com",
  "mohmal.com",
  "spam4.me",
  "emailondeck.com",
  "mailsac.com",
  "inboxkitten.com",
  "tmpmail.org",
  "burnermail.io",
]);

/** Placeholder domains that are never a real person's inbox. */
export const DUMMY_EMAIL_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "example.edu",
  "test.com",
  "test.net",
  "test.org",
  "test.test",
  "domain.com",
  "email.com",
  "mail.com",
  "sample.com",
  "mydomain.com",
  "yourdomain.com",
  "yoursite.com",
  "website.com",
  "abc.com",
  "asdf.com",
  "aaa.com",
  "xxx.com",
]);

/** Placeholder local parts (the bit before @) that signal a fake address. */
export const DUMMY_LOCAL_PARTS = new Set([
  "test",
  "tester",
  "testing",
  "test123",
  "asdf",
  "asd",
  "asdfasdf",
  "qwerty",
  "qwe",
  "abc",
  "abcd",
  "abcde",
  "aaa",
  "aaaa",
  "xxx",
  "xxxx",
  "dummy",
  "fake",
  "fakeemail",
  "sample",
  "example",
  "none",
  "na",
  "nil",
  "null",
  "nobody",
  "noreply",
  "no-reply",
  "donotreply",
  "user",
  "username",
  "email",
]);

export interface EmailValidation {
  valid: boolean;
  /** Human-readable reason when invalid; empty string when valid. */
  reason: string;
}

/**
 * Validate an email address for structure and obvious junk. Case-insensitive;
 * trims surrounding whitespace. Returns a reason suitable for inline display.
 */
export function validateEmail(raw: string): EmailValidation {
  const email = (raw || "").trim().toLowerCase();

  if (!email) return { valid: false, reason: "Enter your email address" };
  if (email.length > 254)
    return { valid: false, reason: "Email address is too long" };
  if (email.includes(".."))
    return { valid: false, reason: "Enter a valid email address" };
  if (!EMAIL_RE.test(email))
    return { valid: false, reason: "Enter a valid email address" };

  const atIndex = email.lastIndexOf("@");
  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  const tld = domain.slice(domain.lastIndexOf(".") + 1);

  if (tld.length < 2 || !/^[a-z]+$/.test(tld))
    return { valid: false, reason: "Enter a valid email address" };

  if (DISPOSABLE_EMAIL_DOMAINS.has(domain))
    return {
      valid: false,
      reason: "Disposable email addresses aren’t accepted — please use a permanent one",
    };

  if (DUMMY_EMAIL_DOMAINS.has(domain) || DUMMY_LOCAL_PARTS.has(local))
    return { valid: false, reason: "Please enter a real email address" };

  return { valid: true, reason: "" };
}
