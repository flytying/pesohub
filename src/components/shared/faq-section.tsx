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
      <h2 className="mb-8 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
        Frequently Asked Questions
      </h2>
      <Accordion className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="overflow-hidden rounded-[14px] border border-[#E7EBF3] bg-white not-last:border-b not-last:border-b-[#E7EBF3]"
          >
            <AccordionTrigger className="px-[18px] py-4 text-[16px] font-semibold leading-[1.4] text-[#0E1525] hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="px-[18px] pb-[18px] text-[16px] leading-[1.6] text-[#475069]">
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
