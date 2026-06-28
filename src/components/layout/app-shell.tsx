"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  // Mobile drawer state. Sidebar links call closeNav on click, so the drawer
  // closes on navigation without a route-change effect.
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = useCallback(() => setNavOpen(false), []);

  // Blog post pages use a narrower 920px reading column; match the footer to it.
  const pathname = usePathname();
  const isBlogPost = /^\/blog\/.+/.test(pathname ?? "");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={navOpen} onClose={closeNav} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onBurger={() => setNavOpen(true)} />
        <main className="flex-1">{children}</main>
        <Footer
          maxWidthClassName={isBlogPost ? "max-w-[920px]" : "max-w-[1240px]"}
        />
      </div>
    </div>
  );
}
