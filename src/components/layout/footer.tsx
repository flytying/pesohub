import Link from "next/link";
import Image from "next/image";
import { footerNavItems } from "@/data/navigation";
import { SITE_NAME } from "@/config/site";

const COLUMNS: { title: string; items: { label: string; href: string }[] }[] = [
  { title: "Tools", items: footerNavItems.tools },
  { title: "Calculators", items: footerNavItems.calculators },
  { title: "PesoHub", items: footerNavItems.company },
];

export function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 print:hidden">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-10">
          {/* Brand block */}
          <div className="max-w-[460px] flex-[1_1_300px]">
            <div className="mb-[18px] flex items-center gap-[11px]">
              <Image
                src="/pesohub-mark.png"
                alt="PesoHub"
                width={38}
                height={38}
                className="size-[38px] rounded-[10px]"
              />
              <span className="text-[19px] font-extrabold tracking-[-.02em] text-[#0E1525]">
                {SITE_NAME}
              </span>
            </div>
            <p className="max-w-[42ch] text-[15px] leading-[1.7] text-[#6B7488]">
              {SITE_NAME} provides free financial tools and information for
              educational purposes only. This website is not affiliated with any
              government agency or financial institution. Always consult a
              qualified professional before making financial decisions.
            </p>
            <div className="mt-[18px] text-[13px] text-[#8A93A6]">
              &copy; {new Date().getFullYear()} {SITE_NAME}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <nav
              key={col.title}
              className="flex min-w-[120px] flex-col gap-[13px]"
              aria-label={col.title}
            >
              <div className="mb-[3px] text-[13px] font-bold uppercase tracking-[.08em] text-[#6B7488]">
                {col.title}
              </div>
              {col.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[15px] text-[#475069] transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
