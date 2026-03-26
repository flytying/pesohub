import { generatePageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/config/site";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}. Learn how we handle your data and protect your privacy.`,
  slug: "privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-[32px] font-medium leading-[48px] text-gray-500">Privacy Policy</h1>
      <p className="mt-2 text-[16px] leading-[22px] text-gray-400">Last updated: March 14, 2026</p>

      <div className="mt-6 space-y-6 text-[16px] leading-[22px] text-gray-400">
        <p>
          {SITE_NAME} ({SITE_URL}) respects your privacy. This Privacy Policy
          explains what information we collect, how we use it, and your rights
          regarding your data.
        </p>

        <h2 className="text-[24px] font-semibold leading-[30px] text-gray-500 mt-16">Information We Collect</h2>
        <p>
          {SITE_NAME} is a utility website that does not require account creation
          or login. We do not collect personal information such as names, email
          addresses, or phone numbers unless you voluntarily provide it through a
          contact form.
        </p>
        <p>
          We may collect anonymous usage data through analytics tools (such as
          Google Analytics) to understand how visitors use our website. This data
          includes page views, device type, browser type, and general geographic
          location.
        </p>

        <h2 className="text-[24px] font-semibold leading-[30px] text-gray-500 mt-16">Calculator Data</h2>
        <p>
          All calculations performed on {SITE_NAME} happen entirely in your
          browser. We do not send, store, or have access to any values you enter
          into our calculators. Your financial data stays on your device.
        </p>

        <h2 className="text-[24px] font-semibold leading-[30px] text-gray-500 mt-16">Cookies</h2>
        <p>
          We use cookies for analytics and advertising purposes. Third-party
          services such as Google Analytics and Google AdSense may place cookies
          on your browser to provide their services. You can manage cookie
          preferences through your browser settings.
        </p>

        <h2 className="text-[24px] font-semibold leading-[30px] text-gray-500 mt-16">Third-Party Services</h2>
        <p>
          We use the following third-party services that may collect data
          according to their own privacy policies:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Google Analytics — for website usage analytics</li>
          <li>Google AdSense — for displaying advertisements</li>
        </ul>

        <h2 className="text-[24px] font-semibold leading-[30px] text-gray-500 mt-16">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated revision date.
        </p>

        <h2 className="text-[24px] font-semibold leading-[30px] text-gray-500 mt-16">Contact</h2>
        <p>
          If you have questions about this Privacy Policy, please reach out
          through our website.
        </p>
      </div>
    </div>
  );
}
