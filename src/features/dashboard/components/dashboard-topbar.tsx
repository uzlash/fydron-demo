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
    <header className="flex h-[60px] items-center justify-between border-b border-border px-6 bg-surface">
      <Text size={500} weight="semibold" className="text-foreground text-[18px]">
        {title}
      </Text>
      <div className="flex items-center gap-3">
        <Input
          placeholder={t.dashboard.searchPlaceholder}
          className="w-[380px] h-[36px]"
          contentBefore={<Search20Regular className="text-muted" />}
        />
        <button
          className="relative inline-flex h-[36px] w-[36px] items-center justify-center rounded border border-border bg-surface text-secondary hover:bg-sidebar"
          aria-label={t.dashboard.notifications}
          type="button"
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
