import { describe, it, expect } from "vitest";
import { calculateSSSLoan, SSS_LOAN_ANNUAL_RATE } from "./sss-loan";
import { calculateLoan } from "./loan";

describe("calculateSSSLoan", () => {
  it("deducts a 1% service fee from a salary loan's proceeds", () => {
    const r = calculateSSSLoan({ loanAmount: 20_000, termMonths: 12, loanType: "salary" });
    expect(r.serviceFee).toBe(200); // 1% of 20,000
    expect(r.netProceeds).toBe(19_800);
    expect(r.annualRate).toBe(SSS_LOAN_ANNUAL_RATE);
    expect(r.monthlyPayment).toBeGreaterThan(0);
    expect(r.totalRepayment).toBeGreaterThan(20_000); // interest accrues
  });

  it("charges no service fee for a calamity loan", () => {
    const r = calculateSSSLoan({ loanAmount: 20_000, termMonths: 24, loanType: "calamity" });
    expect(r.serviceFee).toBe(0);
    expect(r.netProceeds).toBe(20_000);
  });

  it("amortizes at 10% via the shared loan formula", () => {
    const sss = calculateSSSLoan({ loanAmount: 20_000, termMonths: 12, loanType: "calamity" });
    const loan = calculateLoan({ principal: 20_000, annualInterestRate: 10, termMonths: 12 });
    if ("error" in loan) throw new Error("unexpected");
    expect(sss.monthlyPayment).toBe(loan.monthlyPayment);
    expect(sss.totalInterest).toBe(loan.totalInterest);
  });

  it("returns a zeroed result for non-positive amount or term", () => {
    const r = calculateSSSLoan({ loanAmount: 0, termMonths: 12, loanType: "salary" });
    expect(r.monthlyPayment).toBe(0);
    expect(r.totalInterest).toBe(0);
    expect(calculateSSSLoan({ loanAmount: 20_000, termMonths: 0, loanType: "salary" }).monthlyPayment).toBe(0);
  });
});
