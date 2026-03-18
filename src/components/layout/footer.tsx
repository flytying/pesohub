import Link from "next/link";
import Image from "next/image";
import { footerNavItems } from "@/data/navigation";
import { SITE_NAME } from "@/config/site";

export function Footer() {
  return (
    <footer className="gradient-hero text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {/* Footer Columns */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          {/* Tools */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              Tools
            </h3>
            <ul className="space-y-2.5">
              {footerNavItems.tools.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              Calculators
            </h3>
            <ul className="space-y-2.5">
              {footerNavItems.calculators.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerNavItems.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="mb-4">
            <Image
              src="/pesohub-dark.webp"
              alt="PesoHub"
              width={40}
              height={40}
              className="size-10 rounded-lg"
            />
          </div>
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-white/30">
            {SITE_NAME} provides free financial tools and information for
            educational purposes only. This website is not affiliated with any
            government agency or financial institution. Always consult a
            qualified professional before making financial decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
