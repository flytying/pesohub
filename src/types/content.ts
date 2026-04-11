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
  category: "calculator" | "rate" | "guide" | "comparison" | "bank" | "government" | "blog";
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

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export type BlogCategory =
  | "savings"
  | "investing"
  | "tax"
  | "government"
  | "banking"
  | "budgeting"
  | "insurance"
  | "general";

export interface BlogSection {
  type: "heading" | "paragraph" | "list" | "ordered-list" | "callout" | "quote";
  /** H2/H3 text (for type "heading") */
  heading?: string;
  /** Heading level, default 2 */
  level?: 2 | 3;
  /** Body text (for paragraph, callout, quote) */
  content?: string;
  /** List items (for list, ordered-list) */
  items?: string[];
  /** Callout variant */
  variant?: "info" | "warning" | "tip";
}

export interface BlogPostData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: BlogCategory;
  excerpt: string;
  readTime: number;
  directAnswer: string;
  sections: BlogSection[];
  faqs: FAQ[];
  relatedSlugs: string[];
  keywords: string[];
  disclaimer: boolean;
}

// ---------------------------------------------------------------------------
// Guide
// ---------------------------------------------------------------------------

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
