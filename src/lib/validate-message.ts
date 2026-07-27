// ---------------------------------------------------------------------------
// Message-quality heuristics for the contact form. Rejects empty/too-short
// bodies and obvious keyboard-mash gibberish ("shasbsahvbsvnkdbvdasb"). Mirrored
// server-side in server/index.mjs and workers/email-api/src/index.ts — keep the
// thresholds in sync across all three copies.
//
// Heuristic, not exact: tuned to pass ordinary short messages ("The USD rate
// looks wrong, please check.") while catching mashed single tokens. Err toward
// letting real messages through.
// ---------------------------------------------------------------------------

const MIN_LENGTH = 10;

export interface MessageValidation {
  valid: boolean;
  reason: string;
}

/** Longest run of consecutive consonants in a lowercase word. */
function longestConsonantRun(word: string): number {
  let run = 0;
  let max = 0;
  for (const ch of word) {
    if (ch >= "a" && ch <= "z" && !"aeiou".includes(ch)) {
      run += 1;
      if (run > max) max = run;
    } else {
      run = 0;
    }
  }
  return max;
}

/** Ratio of vowels to letters (0 when there are no letters). */
function vowelRatio(letters: string): number {
  if (!letters.length) return 0;
  let vowels = 0;
  for (const ch of letters) if ("aeiou".includes(ch)) vowels += 1;
  return vowels / letters.length;
}

/**
 * Validate a contact-form message body. Returns a reason suitable for inline
 * display when invalid.
 */
export function validateMessage(raw: string): MessageValidation {
  const message = (raw || "").trim();

  if (!message) return { valid: false, reason: "Enter a message" };
  if (message.length < MIN_LENGTH)
    return {
      valid: false,
      reason: `Please add a bit more detail (at least ${MIN_LENGTH} characters)`,
    };

  const tokens = message.split(/\s+/).filter(Boolean);
  const letters = message.toLowerCase().replace(/[^a-z]/g, "");

  // A single long unbroken token is almost always a keyboard mash.
  if (tokens.length < 2 && message.length >= 15)
    return { valid: false, reason: "Please enter a real message" };

  // Enough letters to judge, but implausibly few vowels or a huge consonant run.
  if (letters.length >= 8) {
    if (vowelRatio(letters) < 0.2)
      return { valid: false, reason: "Please enter a real message" };

    const worstRun = Math.max(
      ...tokens.map((t) => longestConsonantRun(t.toLowerCase()))
    );
    if (worstRun >= 7)
      return { valid: false, reason: "Please enter a real message" };
  }

  return { valid: true, reason: "" };
}
