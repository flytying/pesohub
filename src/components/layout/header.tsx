"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { mainNavItems } from "@/data/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeaderSearch } from "@/components/layout/header-search";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/pesohub-logo.png"
            alt="PesoHub"
            width={140}
            height={36}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation + Search */}
        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-8">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <HeaderSearch />
        </div>

        {/* Mobile: Search + Hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <HeaderSearch />
          <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/10 md:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <nav className="mx-auto max-w-6xl space-y-1 px-4 py-3 sm:px-6">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
