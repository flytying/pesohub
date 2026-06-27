"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Calculator,
  TrendingUp,
  BookOpen,
  Landmark,
  FileText,
  Bookmark,
  History,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
}

const MENU: NavLink[] = [
  { label: "Home", href: "/", icon: Home, exact: true },
  { label: "Calculators", href: "/calculators", icon: Calculator },
  { label: "Rates", href: "/rates", icon: TrendingUp },
  { label: "Guides", href: "/guides", icon: BookOpen },
  { label: "Government", href: "/government", icon: Landmark },
  { label: "Blog", href: "/blog", icon: FileText },
];

function isActive(pathname: string, link: NavLink) {
  if (link.exact) return pathname === link.href;
  return pathname === link.href || pathname.startsWith(link.href + "/");
}

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Scrim — mobile only, when drawer open */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-[#0A1432]/40 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-[264px] flex-col overflow-y-auto border-r border-[#E7EBF3] bg-white transition-transform duration-200",
          "lg:sticky lg:top-0 lg:z-30 lg:translate-x-0 lg:shadow-none",
          open ? "translate-x-0 shadow-[0_24px_70px_rgba(10,20,50,.25)]" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-[11px] px-[22px] pb-4 pt-[22px]"
        >
          <Image
            src="/pesohub-mark.png"
            alt="PesoHub"
            width={38}
            height={38}
            className="size-[38px] rounded-[10px] shadow-[0_4px_12px_rgba(21,53,199,.28)]"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="text-[18px] font-extrabold tracking-[-.02em] text-[#0E1525]">
              PesoHub
            </span>
            <span className="mt-1 text-sm font-semibold text-[#6B7488]">
              Financial tools
            </span>
          </span>
        </Link>

        {/* MENU group */}
        <nav className="flex flex-col gap-[3px] px-[14px] py-[6px]">
          <span className="px-3 pb-[6px] pt-[10px] text-sm font-bold tracking-[.08em] text-[#6B7488]">
            MENU
          </span>
          {MENU.map((link) => {
            const active = isActive(pathname, link);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-[12px] px-3 py-[11px] text-sm font-semibold transition-colors",
                  active
                    ? "bg-[#EAF0FF] text-brand"
                    : "text-[#6B7488] hover:bg-[#F7F9FD] hover:text-[#0E1525]"
                )}
              >
                <Icon
                  className="size-[18px] shrink-0"
                  strokeWidth={2}
                  aria-hidden
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* WORKSPACE group — placeholder features (not yet available) */}
        <nav className="mt-2 flex flex-col gap-[3px] px-[14px] py-[6px]">
          <span className="px-3 pb-[6px] pt-[10px] text-sm font-bold tracking-[.08em] text-[#6B7488]">
            WORKSPACE
          </span>
          {[
            { label: "Saved tools", icon: Bookmark },
            { label: "Recent calculations", icon: History },
          ].map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-[12px] px-3 py-[11px] text-sm font-semibold text-[#6B7488]"
            >
              <Icon className="size-[18px] shrink-0" strokeWidth={2} aria-hidden />
              <span>{label}</span>
              <span className="ml-auto rounded-[6px] bg-[#EAF0FF] px-[6px] py-[2px] text-[11px] font-bold tracking-[.06em] text-brand">
                SOON
              </span>
            </div>
          ))}
        </nav>

        {/* Pinned gradient promo card */}
        <div className="mt-auto p-4">
          <div className="relative overflow-hidden rounded-[16px] bg-[linear-gradient(135deg,#1535C7,#0F258F)] p-4 text-white">
            <div
              aria-hidden
              className="absolute -right-5 -top-[22px] size-[90px] rounded-full bg-[radial-gradient(circle,rgba(43,229,223,.45),transparent_70%)]"
            />
            <div className="relative mb-[5px] text-sm font-bold">
              Money, made clear
            </div>
            <div className="relative text-sm leading-[1.5] text-[#C9D4FF]">
              Free Philippine-ready calculators, rate tables and guides — no
              sign-up.
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
