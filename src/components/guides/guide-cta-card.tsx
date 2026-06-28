import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface GuideCtaCardProps {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

/**
 * Blue gradient call-to-action card used at the end of guide pages.
 * Matches the redesign prototype: radial glow, centered copy, white button.
 */
export function GuideCtaCard({
  title,
  description,
  href,
  ctaLabel,
}: GuideCtaCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(150deg,#1A3AD6_0%,#1430BE_55%,#0E2496_100%)] p-[clamp(26px,4vw,38px)] text-center text-white shadow-[0_24px_50px_-22px_rgba(21,53,199,.6)]">
      <div className="pointer-events-none absolute -right-10 -top-12 size-[200px] rounded-full bg-[radial-gradient(circle,rgba(43,229,223,.26),transparent_68%)]" />
      <div className="relative">
        <h2 className="text-[clamp(22px,2.6vw,28px)] font-semibold tracking-[-0.02em]">
          {title}
        </h2>
        <p className="mx-auto mt-[10px] max-w-[62ch] text-[16px] leading-[1.6] text-[#C9D4FF]">
          {description}
        </p>
        <Link
          href={href}
          className="mt-[22px] inline-flex items-center gap-[9px] rounded-[12px] bg-white px-6 py-[13px] text-[15px] font-bold text-[#1430BE] transition-transform hover:-translate-y-0.5"
        >
          {ctaLabel}
          <ArrowRight className="size-[17px]" />
        </Link>
      </div>
    </div>
  );
}
