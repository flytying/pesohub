import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${SITE_URL}/calculators`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/rates`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${SITE_URL}/guides`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/calculators/loans/car-loan-calculator-philippines`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/calculators/loans/home-loan-calculator-philippines`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/calculators/loans/personal-loan-calculator-philippines`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/calculators/tax/withholding-tax-calculator-philippines`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/calculators/retirement/sss-pension-calculator`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/rates/exchange-rates/usd-to-php-today`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${SITE_URL}/rates/savings-rates/best-savings-interest-rates-philippines`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/guides/tax/how-withholding-tax-works-philippines`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/guides/sss/how-to-compute-sss-pension`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/government`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/government/sss/sss-contribution-guide`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/government/sss/sss-pension-table`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/government/bir/withholding-tax-table-philippines`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/government/bsp/bsp-exchange-rate-guide`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/government/pag-ibig/pag-ibig-housing-loan-guide`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly" as const, priority: 0.2 },
  ];

  return pages.map((page) => ({ ...page, lastModified: new Date() }));
}
