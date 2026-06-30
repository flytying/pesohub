import Link from "next/link";
import Image from "next/image";
import { footerNavItems } from "@/data/navigation";
import { SITE_NAME } from "@/config/site";

const COLUMNS: { title: string; items: { label: string; href: string }[] }[] = [
  { title: "Tools", items: footerNavItems.tools },
  { title: "Calculators", items: footerNavItems.calculators },
  { title: "PesoHub", items: footerNavItems.company },
];

export function Footer({
  maxWidthClassName = "max-w-[1240px]",
}: {
  /** Constrain the footer's inner width to match the page content. */
  maxWidthClassName?: string;
}) {
  return (
    <footer className="mt-12 print:hidden">
      <div
        className={`mx-auto ${maxWidthClassName} px-[clamp(20px,3vw,36px)]`}
      >
        <div className="flex flex-wrap items-start justify-between gap-x-12 gap-y-10 border-t border-gray-200 py-12">
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
            <a
              href="https://verify.sentralid.com/t/pesohub-934885"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[14px] inline-block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://verify.sentralid.com/badge/SID-HQYT-SKMD/svg"
                alt="Verified by Sentral ID"
                width={280}
                height={72}
              />
            </a>
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
