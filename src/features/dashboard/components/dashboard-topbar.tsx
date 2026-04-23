"use client";

import { Input, Text } from "@fluentui/react-components";
import { Search20Regular, Alert20Regular } from "@fluentui/react-icons";
import { useLocale } from "@/i18n/locale-context";

type DashboardTopbarProps = {
  onToggleNotifications: () => void;
  hasUnreadNotifications: boolean;
  title: string;
};

export function DashboardTopbar({
  onToggleNotifications,
  hasUnreadNotifications,
  title,
}: DashboardTopbarProps) {
  const { t } = useLocale();

  return (
    <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-border bg-surface px-6">
      <Text
        as="h1"
        size={500}
        weight="semibold"
        className="shrink-0 text-[18px] text-foreground"
      >
        {title}
      </Text>
      <div className="flex min-w-0 flex-1 items-center justify-end gap-3 pl-6">
        <Input
          placeholder={t.dashboard.searchPlaceholder}
          className="h-9 w-full min-w-0 max-w-[380px] rounded border-border"
          contentBefore={<Search20Regular className="text-muted" />}
        />
        <button
          type="button"
          className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded border border-border bg-surface text-secondary hover:bg-sidebar"
          aria-label={t.dashboard.notifications}
          onClick={onToggleNotifications}
        >
          <Alert20Regular />
          {hasUnreadNotifications ? (
            <span className="absolute mb-4 ml-4 inline-block h-2 w-2 rounded-full bg-danger" />
          ) : null}
        </button>
      </div>
    </header>
  );
}
