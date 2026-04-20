"use client";

import { Card, Text } from "@fluentui/react-components";
import {
  Folder20Regular,
  ChatMultiple20Regular,
  CalendarLtr20Regular,
} from "@fluentui/react-icons";
import type { DashboardStat } from "@/features/dashboard/types";
import { useLocale } from "@/i18n/locale-context";

function iconFor(key: DashboardStat["key"]) {
  switch (key) {
    case "activeDossiers":
      return <Folder20Regular />;
    case "unreadMessages":
      return <ChatMultiple20Regular />;
    case "upcomingDeadlines":
      return <CalendarLtr20Regular />;
    default:
      return <Folder20Regular />;
  }
}

export function DashboardStats({ stats }: { stats: DashboardStat[] }) {
  const { t } = useLocale();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.key}
          className="flex flex-col justify-center h-[76px] rounded-[4px] border border-[#d2d0ce] bg-white shadow-none px-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-[#a19f9d] text-lg">{iconFor(stat.key)}</span>
            <div className="flex flex-col justify-center">
              <Text size={500} weight="semibold" block className="leading-[20px] text-[16px] text-[#242424]">
                {stat.value}
              </Text>
              <Text size={200} block className="text-[12px] text-[#605e5c] leading-[16px]">
                {t.dashboard.stats[stat.key]}
              </Text>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
