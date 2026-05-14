"use client";

import { useEffect } from "react";

interface DisplayAdProps {
  slot?: string;
  className?: string;
  style?: React.CSSProperties;
  format?: string;
  fullWidthResponsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function DisplayAd({
  slot = "4926932770",
  className,
  style = { display: "block" },
  format = "auto",
  fullWidthResponsive = true,
}: DisplayAdProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // noop
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className ?? ""}`.trim()}
      style={style}
      data-ad-client="ca-pub-3392449098044156"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
    />
  );
}
