import { generatePageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { LegalPage } from "@/components/shared/legal-page";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}. Learn how we handle your data and protect your privacy.`,
  slug: "privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="March 14, 2026"
      breadcrumbLabel="Privacy Policy"
      intro={`${SITE_NAME} (${SITE_URL}) respects your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.`}
      sections={[
        {
          heading: "Information we collect",
          body: (
            <>
              <p>
                {SITE_NAME} is a utility website that does not require account
                creation or login. We do not collect personal information such as
                names, email addresses, or phone numbers unless you voluntarily
                provide it through a contact form.
              </p>
              <p>
                We may collect anonymous usage data through analytics tools (such
                as Google Analytics) to understand how visitors use our website.
                This data includes page views, device type, browser type, and
                general geographic location.
              </p>
            </>
          ),
        },
        {
          heading: "Calculator data",
          body: (
            <p>
              All calculations performed on {SITE_NAME} happen entirely in your
              browser. We do not send, store, or have access to any values you
              enter into our calculators. Your financial data stays on your
              device.
            </p>
          ),
        },
        {
          heading: "Cookies",
          body: (
            <p>
              We use cookies for analytics purposes. Third-party services such as
              Google Analytics may place cookies on your browser to provide their
              services. You can manage cookie preferences through your browser
              settings.
            </p>
          ),
        },
        {
          heading: "Third-party services",
          body: (
            <>
              <p>
                We use the following third-party services that may collect data
                according to their own privacy policies:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Google Analytics — for website usage analytics</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Changes to this policy",
          body: (
            <p>
              We may update this Privacy Policy from time to time. Changes will be
              posted on this page with an updated revision date.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              If you have questions about this Privacy Policy, please reach out
              through our website.
            </p>
          ),
        },
      ]}
    />
  );
}
