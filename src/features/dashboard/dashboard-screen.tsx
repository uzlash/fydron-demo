"use client";

import { useState } from "react";
import { Spinner, Text } from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { DashboardTopbar } from "@/features/dashboard/components/dashboard-topbar";
import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";
import { DossiersTable } from "@/features/dashboard/components/dossiers-table";
import { EmptyDashboardState } from "@/features/dashboard/components/empty-dashboard-state";
import { NotificationCenter } from "@/features/dashboard/components/notification-center";
import { fetchDashboardData, notificationItems } from "@/features/dashboard/mock-data";
import type { DashboardDataMode } from "@/features/dashboard/types";
import { useLocale } from "@/i18n/locale-context";

function DashboardDataLoading({ label }: { label: string }) {
  return (
    <section className="flex flex-1 items-center justify-center border-t border-border-soft px-6">
      <div className="flex items-center gap-2 text-secondary">
        <Spinner size="tiny" />
        <span className="text-[13px]">{label}</span>
      </div>
    </section>
  );
}

export function DashboardScreen() {
  const [mode, setMode] = useState<DashboardDataMode>("full");
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const { t } = useLocale();
  const dashboardQuery = useQuery({
    queryKey: ["dashboard-data", mode],
    queryFn: () => fetchDashboardData(mode),
  });

  const data = dashboardQuery.data;
  const isLoading = dashboardQuery.isPending;
  const isEmpty = !isLoading && (data?.dossiers.length ?? 0) === 0;

  return (
    <div className="relative flex h-screen w-full bg-surface font-sans text-foreground">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 border-l border-border">
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopbar
            title={t.dashboard.title}
            onToggleNotifications={() =>
              setIsNotificationCenterOpen((currentValue) => !currentValue)
            }
            hasUnreadNotifications={notificationItems.some((item) => item.unread)}
          />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className="px-6 py-6">
              <Text size={500} weight="semibold" block className="mb-[2px] text-[18px] text-foreground">
                {t.dashboard.greetingTitle.replace("{name}", data?.greetingName ?? "Michael")}
              </Text>
              <Text size={200} className="text-[13px] text-secondary" block>
                {t.dashboard.greetingSubtitle}
              </Text>
              <div className="mt-[20px]">
                <DashboardStats stats={data?.stats ?? []} />
              </div>
            </div>

            {isLoading ? (
              <DashboardDataLoading label={t.dashboard.loading} />
            ) : isEmpty ? (
              <EmptyDashboardState onAction={() => setMode("full")} />
            ) : (
              <div className="flex-1">
                <DossiersTable rows={data?.dossiers ?? []} />
              </div>
            )}
          </div>
        </div>
      </div>
      {isNotificationCenterOpen ? (
        <>
          <button
            type="button"
            aria-label="Close notifications panel"
            className="absolute inset-0 z-20 bg-black/45"
            onClick={() => setIsNotificationCenterOpen(false)}
          />
          <div className="absolute right-0 top-0 z-30 h-full">
            <NotificationCenter items={notificationItems} />
          </div>
        </>
      ) : null}
    </div>
  );
}
