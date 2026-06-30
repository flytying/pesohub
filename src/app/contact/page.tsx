import { generatePageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/config/site";
import { ContactForm } from "./contact-form";

export const metadata = generatePageMetadata({
  title: "Contact",
  description: `Contact ${SITE_NAME} with a question, suggestion, data correction, or bug report. We typically respond within 1–2 business days.`,
  slug: "contact",
});

export default function ContactPage() {
  return <ContactForm />;
}
