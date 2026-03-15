import type { FAQ } from "@/types/content";

export const SSS_PENSION_UPDATED_AT = "2026-03-14";

export const sssPensionMeta = {
  title: "How to Compute Your SSS Pension",
  metaTitle: "How to Compute Your SSS Pension (2026 Guide)",
  metaDescription:
    "Learn how SSS pension is computed in the Philippines. Understand the three pension formulas, eligibility requirements, and see a worked example with a PHP 20,000 monthly salary credit.",
  slug: "guides/sss/how-to-compute-sss-pension",
  directAnswer:
    "Your SSS monthly pension is the highest amount from three formulas: (1) PHP 300 + 20% of average monthly salary credit (AMSC) + 2% of AMSC for each credited year of service (CYS) over 10 years, (2) 40% of AMSC, or (3) PHP 2,000 (minimum pension if you have at least 10 CYS). You need at least 120 monthly contributions to qualify for a retirement pension.",
};

/**
 * The three SSS pension formulas.
 */
export interface PensionFormula {
  label: string;
  formula: string;
  description: string;
}

export const pensionFormulas: PensionFormula[] = [
  {
    label: "Formula 1",
    formula: "PHP 300 + (20% x AMSC) + (2% x AMSC x CYS over 10)",
    description:
      "This formula rewards long tenure. The 2% bonus applies for every credited year of service beyond the first 10 years. For members with 25+ years of contributions, this formula usually yields the highest pension.",
  },
  {
    label: "Formula 2",
    formula: "40% x AMSC",
    description:
      "A simpler calculation that gives you 40% of your average monthly salary credit. This formula tends to produce the highest amount for members with shorter contribution periods but higher salary credits.",
  },
  {
    label: "Formula 3 (Minimum Pension)",
    formula: "PHP 2,000 (if CYS >= 10 years) or PHP 1,200 (if CYS < 10 years)",
    description:
      "The guaranteed minimum pension. If Formulas 1 and 2 produce an amount below this floor, the minimum pension applies. Members with at least 10 credited years of service receive PHP 2,000.",
  },
];

export const sssPensionFaqs: FAQ[] = [
  {
    question:
      "How many years do I need to contribute to SSS to get a pension?",
    answer:
      "You need at least 120 monthly contributions (equivalent to 10 years of credited service) to qualify for the SSS retirement pension. These contributions do not need to be consecutive. You can check your total number of contributions through the My.SSS online portal.",
  },
  {
    question:
      "What is the average monthly salary credit (AMSC)?",
    answer:
      "The AMSC is the average of your monthly salary credits (MSC) during your last 60 months of contributions, or the average of all your monthly salary credits, whichever is higher. The MSC is the basis for computing your SSS contributions and is capped at a maximum amount set by the SSS contribution schedule.",
  },
  {
    question: "When can I start receiving my SSS pension?",
    answer:
      "You can claim your SSS retirement pension at age 60 (optional retirement) if you have separated from employment or ceased self-employment, or at age 65 (mandatory retirement) regardless of employment status. In both cases, you must have at least 120 monthly contributions.",
  },
  {
    question: "Can I still contribute to SSS after retirement?",
    answer:
      "No. Once you start receiving your SSS retirement pension, you can no longer make additional contributions. However, if you continue working after age 60 without claiming your pension, you can continue contributing to increase your salary credit and credited years of service, which may result in a higher pension when you eventually retire.",
  },
  {
    question:
      "How do I check my SSS contributions and estimated pension?",
    answer:
      "Log in to the My.SSS portal at www.sss.gov.ph using your SSS number and password. Under the 'Inquiry' section, you can view your contribution history, total credited years, and salary credit details. The SSS also has a mobile app that lets you check your records. For pension estimates, you can use our SSS Pension Calculator.",
  },
];
