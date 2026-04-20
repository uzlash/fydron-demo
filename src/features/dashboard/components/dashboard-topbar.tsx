"use client";

import { Input, Text } from "@fluentui/react-components";
import { Search20Regular, Alert20Regular } from "@fluentui/react-icons";
import { useLocale } from "@/i18n/locale-context";

export function DashboardTopbar() {
  const { t } = useLocale();

  return (
    <header className="flex h-[60px] items-center justify-between border-b border-border px-6 bg-surface">
      <Text size={500} weight="semibold" className="text-foreground text-[18px]">
        {t.dashboard.title}
      </Text>
      <div className="flex items-center gap-3">
        <Input
          placeholder={t.dashboard.searchPlaceholder}
          className="w-[380px] h-[36px]"
          contentBefore={<Search20Regular className="text-muted" />}
        />
        <button
          className="inline-flex h-[36px] w-[36px] items-center justify-center rounded border border-border bg-surface text-secondary hover:bg-sidebar"
          aria-label={t.dashboard.notifications}
          type="button"
        >
          <Alert20Regular />
        </button>
      </div>
    </header>
  );
}
