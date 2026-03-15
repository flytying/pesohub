import { PageHero } from "@/components/shared/page-hero";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";
import { Clock } from "lucide-react";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "Take-Home Pay Calculator Philippines",
  description:
    "Estimate your take-home pay after common deductions such as withholding tax, SSS, PhilHealth, and Pag-IBIG contributions.",
  slug: "calculators/tax/take-home-pay-calculator-philippines",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Take-Home Pay Calculator" },
];

export default function TakeHomePayCalculatorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <PageHero
        title="Take-Home Pay Calculator Philippines"
        description="Estimate take-home pay after common deductions such as withholding tax and required contributions."
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
            use the{" "}
            <Link
              href="/calculators/tax/withholding-tax-calculator-philippines"
              className="text-primary hover:underline"
            >
              Withholding Tax Calculator
            </Link>{" "}
            to estimate one of the most common salary deductions.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
