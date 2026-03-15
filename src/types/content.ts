export interface FAQ {
  question: string;
  answer: string;
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface PageLink {
  slug: string;
  title: string;
  description: string;
  category: "calculator" | "rate" | "guide" | "comparison" | "bank" | "government";
}

export interface CalculatorPageData {
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  updatedAt: string;
  defaultInputs: Record<string, number>;
  formula: {
    name: string;
    description: string;
    explanation: string;
  };
  exampleCalculation: {
    scenario: string;
    inputs: Record<string, number>;
    result: Record<string, number>;
  };
  tips: string[];
  faqs: FAQ[];
  relatedPages: string[];
}

export interface RatePageData {
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  updatedAt: string;
  source: string;
  faqs: FAQ[];
  relatedPages: string[];
}

export interface GuidePageData {
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  updatedAt: string;
  directAnswer: string;
  faqs: FAQ[];
  relatedPages: string[];
}
