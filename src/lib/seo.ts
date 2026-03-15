import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/config/site";

interface PageSEOOptions {
  title: string;
  description: string;
  slug: string;
  ogImage?: string;
  noIndex?: boolean;
  updatedAt?: string;
}

export function generatePageMetadata(options: PageSEOOptions): Metadata {
  const { title, description, slug, ogImage, noIndex, updatedAt } = options;
  const url = slug ? `${SITE_URL}/${slug}` : SITE_URL;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: ogImage || `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_PH",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
    ...(updatedAt && {
      other: { "article:modified_time": updatedAt },
    }),
  };
}
