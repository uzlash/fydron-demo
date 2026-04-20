"use client";

import { Button, Text } from "@fluentui/react-components";
import { useLocale } from "@/i18n/locale-context";

export function EmptyDashboardState({ onAction }: { onAction?: () => void }) {
  const { t } = useLocale();

  return (
    <section className="flex flex-1 items-center justify-center border-t border-[#edebe9] px-6 pb-20">
      <div className="flex max-w-[400px] flex-col items-center text-center">
        <Text size={500} weight="semibold" className="text-[16px] text-[#242424] mb-3">
          {t.dashboard.empty.title}
        </Text>
        <Text size={200} className="text-[#605e5c] text-[13px] leading-[18px] mb-6">
          {t.dashboard.empty.subtitle}
        </Text>
        <Button 
          appearance="primary" 
          className="h-8 px-4 rounded-[4px] bg-[#0078d4]"
          icon={<span className="text-[16px] leading-none pb-[2px] font-light">+</span>}
          onClick={onAction}
        >
          {t.dashboard.empty.cta}
        </Button>
      </div>
    </section>
  );
}
