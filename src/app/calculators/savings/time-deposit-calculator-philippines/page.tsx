import { PageHero } from "@/components/shared/page-hero";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";
import { Clock } from "lucide-react";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "Time Deposit Calculator Philippines",
  description:
    "Estimate possible returns on a time deposit based on your deposit amount, interest rate, and term.",
  slug: "calculators/savings/time-deposit-calculator-philippines",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Time Deposit Calculator" },
];

export default function TimeDepositCalculatorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <PageHero
        title="Time Deposit Calculator Philippines"
        description="Estimate possible returns on a time deposit based on your deposit amount, interest rate, and term."
        breadcrumbs={breadcrumbs}
      />

      <Card className="mx-auto max-w-lg text-center">
        <CardHeader className="items-center py-12">
          <div className="flex size-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <Clock className="size-6" />
          </div>
          <CardTitle className="mt-4 text-lg">Coming soon</CardTitle>
          <CardDescription className="mt-2 max-w-sm text-sm leading-relaxed">
            This calculator is currently being built. In the meantime, you can
            compare{" "}
            <Link
              href="/rates/savings-rates/best-savings-interest-rates-philippines"
              className="text-primary hover:underline"
            >
              savings interest rates
            </Link>{" "}
            across Philippine banks.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
