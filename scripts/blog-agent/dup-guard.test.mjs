import { describe, it, expect } from "vitest";
import { duplicatesOwnedPage } from "./lib/dup-guard.mjs";

describe("duplicatesOwnedPage", () => {
  it("flags the exact cannibalizing keyword that sank the query", () => {
    const hit = duplicatesOwnedPage(["high yield savings account philippines"]);
    expect(hit?.slug).toBe(
      "rates/savings-rates/best-digital-bank-rates-philippines"
    );
  });

  it("ignores the year token (2026) when matching", () => {
    const hit = duplicatesOwnedPage([
      "high yield savings account 2026 philippines",
    ]);
    expect(hit).not.toBeNull();
    expect(hit.slug).toContain("best-digital-bank-rates");
  });

  it("does NOT flag the retargeted analysis blog keywords", () => {
    const hit = duplicatesOwnedPage([
      "do savings accounts beat inflation philippines",
      "savings account real return philippines",
      "philippine savings rate vs inflation 2026",
      "why savings account interest is low philippines",
      "are savings accounts worth it philippines",
    ]);
    expect(hit).toBeNull();
  });

  it("catches the high-interest synonym of high-yield", () => {
    const hit = duplicatesOwnedPage([
      "high interest savings account philippines",
    ]);
    expect(hit?.slug).toBe(
      "rates/savings-rates/best-digital-bank-rates-philippines"
    );
  });

  it("does NOT flag an unrelated legitimate blog topic", () => {
    expect(
      duplicatesOwnedPage([
        "how to open a bank account philippines",
        "sss contribution calculator",
      ])
    ).toBeNull();
  });

  it("flags time-deposit intent to its owning page", () => {
    const hit = duplicatesOwnedPage(["best time deposit rate philippines"]);
    expect(hit?.slug).toBe(
      "rates/savings-rates/time-deposit-rates-philippines"
    );
  });

  it("returns null for empty / missing keywords", () => {
    expect(duplicatesOwnedPage([])).toBeNull();
    expect(duplicatesOwnedPage(undefined)).toBeNull();
    expect(duplicatesOwnedPage([""])).toBeNull();
  });
});
