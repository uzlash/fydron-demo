"use client";

import { FluentProvider } from "@fluentui/react-components";
import { webLightTheme } from "@fluentui/react-theme";

/** Fydron brand (#0070C0) over Fluent default (aligns with auth / UI spec). */
const fydronLightTheme = {
  ...webLightTheme,
  colorBrandBackground: "#0070c0",
  colorBrandBackgroundHover: "#0061a8",
  colorBrandBackgroundPressed: "#005994",
  colorCompoundBrandBackground: "#0070c0",
  colorCompoundBrandBackgroundHover: "#0061a8",
  colorCompoundBrandBackgroundPressed: "#005a8a",
  colorBrandForeground1: "#0070c0",
  colorCompoundBrandForeground1: "#0070c0",
  colorCompoundBrandForeground1Hover: "#0061a8",
  colorCompoundBrandForeground1Pressed: "#005994",
  colorBrandForegroundLink: "#0070c0",
  colorBrandForegroundLinkHover: "#0061a8",
  colorBrandForegroundLinkPressed: "#005994",
};
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { LocaleProvider } from "@/i18n/locale-context";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, retry: false },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <FluentProvider theme={fydronLightTheme}>
        <LocaleProvider>{children}</LocaleProvider>
      </FluentProvider>
    </QueryClientProvider>
  );
}
