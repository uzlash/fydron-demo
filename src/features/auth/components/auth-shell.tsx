"use client";

import type { ReactNode } from "react";
import { FydronLogo } from "@/features/auth/components/fydron-logo";
import { LocaleSwitcher } from "@/features/auth/components/locale-switcher";

type Bg = "muted" | "black";

const bgClass: Record<Bg, string> = {
  muted: "bg-background",
  black: "bg-black",
};

export function AuthShell({
  children,
  footer,
  bg = "muted",
  showLocale = true,
}: {
  children: ReactNode;
  footer?: ReactNode;
  bg?: Bg;
  showLocale?: boolean;
}) {
  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center px-4 py-12 ${bgClass[bg]}`}
    >
      {showLocale ? (
        <LocaleSwitcher className="absolute top-4 right-4 z-20" />
      ) : null}
      <div className="flex w-full max-w-[440px] flex-col items-center gap-6">
        <FydronLogo className="shrink-0" />
        {children}
        {footer}
      </div>
    </div>
  );
}
