import { describe, it, expect } from "vitest";
import { hasRateSignal, filterGroundedRows } from "./validator.mjs";
import { checkAgainstBaselines } from "./baselines.mjs";

// The Tonik homepage text as Tavily actually returned it in PR #199 — an ad,
// with NO rate anywhere. The extractor invented a "6% hero rate" from this.
const JUNK_TONIK = `Build Credit For Your Financial Ever After
Borrow up to 50K with Tonik Credit Builder Loan!
Take your banking relationship to a whole new level. Get access to innovative
products with interest rates that will leave you rockin' and rollin'!
Get the tonik app. Scan the QR code to download the app.`;

// A real rate page carries the number next to a % / p.a. token.
const REAL_PAGE = `MariBank Savings Account earns 3.25% p.a. for balances up to ₱1M,
and 3.75% p.a. above ₱1M. No maintaining balance.`;

describe("hasRateSignal", () => {
  it("is false for ad/nav copy with no rate token", () => {
    expect(hasRateSignal(JUNK_TONIK)).toBe(false);
  });
  it("is true when a percentage is present", () => {
    expect(hasRateSignal(REAL_PAGE)).toBe(true);
  });
  it("is true for a bare 'p.a.' phrase", () => {
    expect(hasRateSignal("Rate is 4 p.a. effective today")).toBe(true);
  });
  it("is false for empty/nullish input", () => {
    expect(hasRateSignal("")).toBe(false);
    expect(hasRateSignal(null)).toBe(false);
  });
});

describe("filterGroundedRows", () => {
  it("rejects the #199 hallucination: an invented 6 not present as a rate", () => {
    const rows = [{ bankName: "Tonik Digital Bank", baseRate: 6 }];
    const { valid, dropped, ungrounded } = filterGroundedRows(rows, JUNK_TONIK, {
      rateFields: ["baseRate"],
    });
    expect(valid).toHaveLength(0);
    expect(dropped).toBe(1);
    expect(ungrounded[0].value).toBe(6);
  });

  it("keeps a value that literally appears as a rate in the text", () => {
    const rows = [{ bankName: "MariBank", baseRate: 3.25 }];
    const { valid, dropped } = filterGroundedRows(rows, REAL_PAGE, {
      rateFields: ["baseRate"],
    });
    expect(valid).toHaveLength(1);
    expect(dropped).toBe(0);
  });

  it("does not ground a number that is only a substring of a larger number", () => {
    // "6" appears inside "2026" and "16", but never as a rate.
    const text = "Updated 2026. Chapter 16. Download the app.";
    const { valid } = filterGroundedRows([{ bankName: "X", baseRate: 6 }], text, {
      rateFields: ["baseRate"],
    });
    expect(valid).toHaveLength(0);
  });

  it("drops a row when ANY of its rate fields is ungrounded", () => {
    // baseRate grounded, promoRate invented → whole row rejected.
    const text = "Base rate 3% p.a. with a debit card.";
    const { valid } = filterGroundedRows(
      [{ bankName: "Maya", baseRate: 3, promoRate: 15 }],
      text,
      { rateFields: ["baseRate", "promoRate"] }
    );
    expect(valid).toHaveLength(0);
  });

  it("keeps a multi-field row when every non-null rate is grounded", () => {
    const text = "Base 3% p.a., promo up to 15% p.a. with missions.";
    const { valid } = filterGroundedRows(
      [{ bankName: "Maya", baseRate: 3, promoRate: 15 }],
      text,
      { rateFields: ["baseRate", "promoRate"] }
    );
    expect(valid).toHaveLength(1);
  });

  it("grounds decimal rates with trailing-zero variance (4.5 → 4.50%)", () => {
    const text = "Group Stash earns 4.50% p.a.";
    const { valid } = filterGroundedRows([{ bankName: "Tonik", baseRate: 4.5 }], text, {
      rateFields: ["baseRate"],
    });
    expect(valid).toHaveLength(1);
  });
});

describe("checkAgainstBaselines", () => {
  const baselines = [
    { bankName: "Tonik Bank", interestRate: 4.5 },
    { bankName: "Tonik Bank", interestRate: 1 },
    { bankName: "MariBank", interestRate: 3.25 },
  ];
  const opts = {
    nameField: "bankName",
    rateFields: ["interestRate"],
    maxDivergencePercent: 50,
    verifiedAt: "2026-06-29",
  };

  it("flags a sharp divergence from the nearest baseline", () => {
    // A scraped 6 vs nearest baseline 4.5 = 33%? -> under 50, no flag.
    // A scraped 0.5 vs nearest baseline 1 = 50% exactly -> not > 50, no flag.
    // A scraped 8 vs nearest 4.5 = 77.8% -> flagged.
    const { flags } = checkAgainstBaselines(
      [{ bankName: "Tonik Bank", interestRate: 8 }],
      baselines,
      opts
    );
    expect(flags).toHaveLength(1);
    expect(flags[0].message).toMatch(/Tonik Bank/);
    expect(flags[0].message).toMatch(/2026-06-29/);
  });

  it("does not flag a value close to a baseline", () => {
    const { flags } = checkAgainstBaselines(
      [{ bankName: "MariBank", interestRate: 3.75 }],
      baselines,
      opts
    );
    expect(flags).toHaveLength(0);
  });

  it("ignores unknown banks (added-entry handled elsewhere)", () => {
    const { flags } = checkAgainstBaselines(
      [{ bankName: "BrandNewBank", interestRate: 99 }],
      baselines,
      opts
    );
    expect(flags).toHaveLength(0);
  });
});
