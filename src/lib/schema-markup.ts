import { SITE_NAME, SITE_URL } from "@/config/site";
import type { FAQ } from "@/types/content";

export function generateFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateCalculatorSchema(data: {
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: data.title,
    description: data.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
  };
}

export function generateArticleSchema(data: {
  title: string;
  description: string;
  updatedAt: string;
  slug: string;
  /** Original publish date. Falls back to updatedAt when omitted. */
  publishedAt?: string;
  /** Author/reviewer name. A "Team"/brand name is emitted as an Organization,
   *  a personal name as a Person. Defaults to the publishing Organization. */
  author?: string;
}) {
  const publisher = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/pesohub-logo.png`,
    },
  };
  const author = data.author
    ? {
        "@type":
          /team|pesohub/i.test(data.author) ? "Organization" : "Person",
        name: data.author,
        url: SITE_URL,
      }
    : publisher;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    datePublished: data.publishedAt ?? data.updatedAt,
    dateModified: data.updatedAt,
    author,
    publisher,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${data.slug}/`,
    },
  };
}

export function generateCollectionPageSchema(data: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: data.name,
    description: data.description,
    url: `${SITE_URL}${data.url}`,
  };
}

export function generateItemListSchema(data: {
  name: string;
  items: { name: string; url?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: data.name,
    itemListElement: data.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url && { url: item.url }),
    })),
  };
}

export function generateBreadcrumbSchema(
  items: { label: string; href?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href && { item: `${SITE_URL}${item.href}` }),
    })),
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  };
}
