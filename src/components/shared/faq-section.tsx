import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";

interface FaqSectionProps {
  faqs: { question: string; answer: string }[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const faqJsonLd = {
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

  return (
    <section>
      <h2 className="mb-8 text-[32px] font-medium leading-[48px] text-gray-500">
        Frequently Asked Questions
      </h2>
      <Accordion className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white not-last:border-b not-last:border-b-gray-200"
          >
            <AccordionTrigger className="px-5 py-4 text-[20px] font-semibold leading-[26px] text-gray-500 hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="px-5 text-[16px] leading-[22px] text-gray-400">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <JsonLd data={faqJsonLd} />
    </section>
  );
}
