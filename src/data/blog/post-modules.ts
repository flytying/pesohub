import type { BlogPostData } from "@/types/content";

/**
 * Maps blog slugs to dynamic imports of their full BlogPostData.
 *
 * Shared by the [slug] page (full render) and the blog hub (to pull the
 * featured post's hero image). Static-export safe: every import path is a
 * literal so the bundler can statically analyze it.
 *
 * New entries are added here by the blog agent or manually, alongside the
 * registry entry in ./index.ts.
 */
export const postModules: Record<
  string,
  () => Promise<{ default: BlogPostData }>
> = {
  "best-savings-account-philippines-2026": () =>
    import("@/data/blog/best-savings-account-philippines-2026"),
  "high-interest-savings-account-philippines": () =>
    import("@/data/blog/high-interest-savings-account-philippines"),
  "what-is-a-savings-rate-philippines": () =>
    import("@/data/blog/what-is-a-savings-rate-philippines"),
  "time-deposit-vs-savings-account-philippines": () =>
    import("@/data/blog/time-deposit-vs-savings-account-philippines"),
  "how-to-compute-withholding-tax-philippines": () =>
    import("@/data/blog/how-to-compute-withholding-tax-philippines"),
  "car-loan-calculator-guide-philippines": () =>
    import("@/data/blog/car-loan-calculator-guide-philippines"),
  "home-loan-vs-pagibig-housing-loan-philippines": () =>
    import("@/data/blog/home-loan-vs-pagibig-housing-loan-philippines"),
  "pagibig-mp2-salary-deduction-guide": () =>
    import("@/data/blog/pagibig-mp2-salary-deduction-guide"),
  "best-digital-banks-philippines": () =>
    import("@/data/blog/best-digital-banks-philippines"),
  "digital-bank-interest-rates-philippines": () =>
    import("@/data/blog/digital-bank-interest-rates-philippines"),
  "highest-interest-digital-banks-philippines": () =>
    import("@/data/blog/highest-interest-digital-banks-philippines"),
  "maximize-digital-bank-interest-philippines": () =>
    import("@/data/blog/maximize-digital-bank-interest-philippines"),  "are-digital-banks-safe-philippines": () =>
    import("@/data/blog/are-digital-banks-safe-philippines"),  "maya-vs-gotyme-vs-seabank-vs-tonik": () =>
    import("@/data/blog/maya-vs-gotyme-vs-seabank-vs-tonik"),  "digital-banking-guide-philippines": () =>
    import("@/data/blog/digital-banking-guide-philippines"),  "digital-bank-vs-traditional-bank-philippines": () =>
    import("@/data/blog/digital-bank-vs-traditional-bank-philippines"),  "where-to-park-emergency-fund-philippines": () =>
    import("@/data/blog/where-to-park-emergency-fund-philippines"),
};

/** Loads a post's hero image, or null if the slug/image is absent. */
export async function loadPostImage(
  slug: string,
): Promise<{ src: string; alt: string } | null> {
  const loader = postModules[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default.image ?? null;
}
