import Link from "next/link";
import Image from "next/image";
import { footerNavItems } from "@/data/navigation";
import { SITE_NAME } from "@/config/site";

export function Footer() {
  return (
    <footer>
      {/* Main Footer */}
      <div className="border-t border-gray-100 bg-surface-tertiary">
        <div className="mx-auto grid max-w-6xl gap-y-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-x-6">
          {/* Logo + Description */}
          <div className="lg:col-span-5">
            <Image
              src="/logo-pesohub-dark.png"
              alt="PesoHub"
              width={104}
              height={32}
              className="h-8 w-auto"
            />
            <p className="mt-6 text-[16px] leading-[22px] text-gray-400">
              {SITE_NAME} provides free financial tools and information for
              educational purposes only. This website is not affiliated with any
              government agency or financial institution. Always consult a
              qualified professional before making financial decisions.
            </p>
          </div>

          {/* Tools */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h3 className="mb-4 text-[14px] font-bold uppercase tracking-[0.1em] text-gray-500">
              Tools
            </h3>
            <ul className="space-y-3">
              {footerNavItems.tools.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[16px] leading-[22px] text-gray-400 transition-colors hover:text-gray-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Calculators */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[14px] font-bold uppercase tracking-[0.1em] text-gray-500">
              Calculators
            </h3>
            <ul className="space-y-3">
              {footerNavItems.calculators.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[16px] leading-[22px] text-gray-400 transition-colors hover:text-gray-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PesoHub */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[14px] font-bold uppercase tracking-[0.1em] text-gray-500">
              PesoHub
            </h3>
            <ul className="space-y-3">
              {footerNavItems.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[16px] leading-[22px] text-gray-400 transition-colors hover:text-gray-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-500 py-4 text-center">
        <p className="text-[14px] text-white">
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
