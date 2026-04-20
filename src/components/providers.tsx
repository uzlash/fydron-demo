"use client";

import { FluentProvider } from "@fluentui/react-components";
import { webLightTheme } from "@fluentui/react-theme";
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
      <FluentProvider theme={webLightTheme}>
        <LocaleProvider>{children}</LocaleProvider>
      </FluentProvider>
    </QueryClientProvider>
  );
}
