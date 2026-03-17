import { PageHero } from "@/components/shared/page-hero";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";
import { Clock } from "lucide-react";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "Emergency Fund Calculator Philippines",
  description:
    "Estimate how much you may want to set aside for emergencies based on your monthly expenses and target number of months.",
  slug: "calculators/savings/emergency-fund-calculator-philippines",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Emergency Fund Calculator" },
];

export default function EmergencyFundCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <PageHero
        title="Emergency Fund Calculator Philippines"
        description="Estimate how much you may want to set aside for emergencies based on your monthly expenses and target number of months."
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-lg text-center">
        <CardHeader className="items-center py-12">
          <div className="flex size-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <Clock className="size-6" />
          </div>
          <CardTitle className="mt-4 text-lg">Coming soon</CardTitle>
          <CardDescription className="mt-2 max-w-sm text-sm leading-relaxed">
            This calculator is currently being built. In the meantime, you can
            browse{" "}
            <Link
              href="/rates/savings-rates/best-savings-interest-rates-philippines"
              className="text-primary hover:underline"
            >
              savings rate tables
            </Link>{" "}
            to compare where to keep your emergency fund.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
    </>
  );
}
