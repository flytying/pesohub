import type { FAQ } from "@/types/content";

export const SSS_CONTRIBUTION_UPDATED_AT = "2026-03-14";

export const sssContributionMeta = {
  title: "SSS Contribution Table 2025",
  metaTitle: "SSS Contribution Table 2025 — Monthly Rates & Schedule Philippines",
  metaDescription:
    "Complete SSS contribution table for 2025. See employee and employer shares by salary bracket, who needs to pay, and how to remit contributions.",
  slug: "government/sss/sss-contribution-guide",
  directAnswer:
    "SSS contributions in 2025 are based on your Monthly Salary Credit (MSC), which ranges from PHP 4,000 to PHP 30,000. The total contribution rate is 14% of MSC — employees pay 4.5% and employers pay 9.5%. Self-employed and voluntary members pay the full 14%.",
};

export const whoPaysSections = [
  {
    type: "Employed",
    description:
      "Both employee and employer share the contribution. The employer deducts the employee share from the salary and remits the total to SSS.",
  },
  {
    type: "Self-Employed",
    description:
      "Self-employed members pay the full contribution amount based on their declared monthly earnings. They can choose their MSC bracket.",
  },
  {
    type: "Voluntary",
    description:
      "OFWs, separated employees, and non-working spouses can continue contributing voluntarily. They pay the full contribution based on their chosen MSC bracket.",
  },
  {
    type: "Household Employer (Kasambahay)",
    description:
      "For household helpers earning below PHP 5,000 per month, the employer pays the full contribution. For those earning PHP 5,000 and above, the regular employee-employer sharing applies.",
  },
];

export const howToPayMethods = [
  {
    method: "Online via My.SSS Portal",
    description: "Generate a Payment Reference Number (PRN) and pay through partner banks and e-wallets.",
  },
  {
    method: "Banks and Payment Centers",
    description: "Pay over the counter at authorized banks (BDO, BPI, Landbank, etc.) and payment centers (Bayad, 7-Eleven).",
  },
  {
    method: "GCash / Maya / ShopeePay",
    description: "Use the SSS billing option in your preferred e-wallet app with your PRN.",
  },
  {
    method: "SSS Branch",
    description: "Walk in to any SSS branch and pay at the cashier. Available during business hours.",
  },
];

export const sssContributionFaqs: FAQ[] = [
  {
    question: "What is the SSS contribution rate for 2025?",
    answer:
      "The total SSS contribution rate for 2025 is 14% of the Monthly Salary Credit (MSC). For employed members, the employee pays 4.5% and the employer pays 9.5%. Self-employed and voluntary members pay the full 14%.",
  },
  {
    question: "What is the maximum SSS contribution per month?",
    answer:
      "The maximum monthly SSS contribution is PHP 4,275, based on the highest Monthly Salary Credit of PHP 30,000. For employed members, the employee share is PHP 1,500 and the employer share is PHP 2,775.",
  },
  {
    question: "What is the minimum SSS contribution per month?",
    answer:
      "The minimum monthly SSS contribution is PHP 570, based on the lowest Monthly Salary Credit of PHP 4,000. For employed members, the employee share is PHP 200 and the employer share is PHP 370.",
  },
  {
    question: "When is the deadline for SSS contribution payments?",
    answer:
      "For employers, the deadline depends on the last digit of the employer's SSS number: digit 1-2 is the 10th of the following month, 3-4 is the 15th, 5-6 is the 20th, 7-8 is the 25th, and 9-0 is the last day. Self-employed and voluntary members can pay anytime within the applicable month or quarter.",
  },
  {
    question: "Can I change my SSS contribution bracket?",
    answer:
      "Yes. Self-employed and voluntary members can change their MSC bracket by updating their contribution amount. For employed members, the MSC is automatically determined by their actual monthly salary as reported by the employer.",
  },
];
