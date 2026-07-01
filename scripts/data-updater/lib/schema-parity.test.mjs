import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Each bank source rewrites its data file from a hardcoded `export interface`
// string. If that interface drifts from the committed data file's interface —
// e.g. someone adds a field the page consumes but forgets the generator — the
// next automated run silently drops the field and the Vercel build breaks
// (exactly #200: `Property 'balanceCap' does not exist`). These tests fail the
// moment the two interfaces diverge, before any run. (#201)

const here = (p) => fileURLToPath(new URL(p, import.meta.url));

/** Extract the sorted field-name set from an `export interface Name { … }`. */
function interfaceFields(text, name) {
  const m = text.match(new RegExp(`export interface ${name}\\s*\\{([\\s\\S]*?)\\n\\}`));
  if (!m) return null;
  return m[1]
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("*") && !l.startsWith("/*") && !l.startsWith("//"))
    .map((l) => l.match(/^(\w+)\??\s*:/)?.[1])
    .filter(Boolean)
    .sort();
}

const CASES = [
  {
    name: "DigitalBankRate",
    generator: here("../sources/bank-digital-rates.mjs"),
    committed: here("../../../src/data/rates/digital-bank-rates.ts"),
  },
  {
    name: "BankSavingsRate",
    generator: here("../sources/bank-savings-rates.mjs"),
    committed: here("../../../src/data/rates/savings-rates.ts"),
  },
  {
    name: "BankTimeDepositRate",
    generator: here("../sources/bank-time-deposit-rates.mjs"),
    committed: here("../../../src/data/rates/time-deposit-rates.ts"),
  },
];

describe("generator ↔ committed interface parity", () => {
  for (const { name, generator, committed } of CASES) {
    it(`${name}: generator emits the same fields the committed file declares`, () => {
      const gen = interfaceFields(readFileSync(generator, "utf8"), name);
      const com = interfaceFields(readFileSync(committed, "utf8"), name);
      expect(gen, `no ${name} interface found in generator`).not.toBeNull();
      expect(com, `no ${name} interface found in committed data file`).not.toBeNull();
      expect(gen).toEqual(com);
    });
  }
});
