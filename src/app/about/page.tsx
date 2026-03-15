import { generatePageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/config/site";

export const metadata = generatePageMetadata({
  title: `About ${SITE_NAME}`,
  description: `Learn about ${SITE_NAME}, a free Philippine finance utility website offering calculators, rate comparisons, and practical money guides for Filipinos.`,
  slug: "about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">About {SITE_NAME}</h1>

      <div className="mt-6 space-y-6 text-muted-foreground leading-relaxed">
        <p>
          {SITE_NAME} is a free finance utility website built for Filipinos who need
          quick, practical answers to everyday money questions. Whether you are computing
          your monthly car loan payment, checking the latest USD to PHP exchange rate,
          or figuring out how much withholding tax you owe, {SITE_NAME} gives you the
          tool or answer right away.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">Our Mission</h2>
        <p>
          We believe financial information should be clear, accessible, and practical.
          Too many finance websites are cluttered with ads, buried in long articles,
          or hard to use on mobile. {SITE_NAME} puts the calculator, table, or answer
          first — then provides the explanation.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">What We Offer</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Calculators</strong> — Free tools for loans, tax, savings, and
            retirement computations specific to the Philippines.
          </li>
          <li>
            <strong>Rate Pages</strong> — Current exchange rates and savings account
            interest rate comparisons from Philippine banks.
          </li>
          <li>
            <strong>Guides</strong> — Plain-language explanations of tax rules, SSS
            benefits, and other financial topics that affect Filipino workers and
            families.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-foreground pt-4">Important Disclaimer</h2>
        <p>
          {SITE_NAME} is an independent website and is not affiliated with any bank,
          government agency, or financial institution. The information provided is for
          educational and informational purposes only. It should not be considered
          professional financial advice. Always consult with a qualified financial
          advisor before making important financial decisions.
        </p>
      </div>
    </div>
  );
}
