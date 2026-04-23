"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { DashboardTopbar } from "@/features/dashboard/components/dashboard-topbar";
import { NotificationCenter } from "@/features/dashboard/components/notification-center";
import { notificationItems } from "@/features/dashboard/mock-data";
import { fetchMatrixPortfolioData } from "@/features/matrix/mock-data";
import { MatrixPortfolioTable } from "@/features/matrix/components/matrix-portfolio-table";
import type { MatrixPortfolioMode } from "@/features/matrix/types";
import { useLocale } from "@/i18n/locale-context";

export function MatrixPortfolioScreen() {
  const { t } = useLocale();
  const [mode] = useState<MatrixPortfolioMode>("full");
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const query = useQuery({
    queryKey: ["matrix-portfolio", mode],
    queryFn: () => fetchMatrixPortfolioData(mode),
  });

  return (
    <div className="relative flex h-screen min-h-0 w-full overflow-hidden bg-background font-sans text-foreground">
      <DashboardSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-l border-border bg-surface">
        <DashboardTopbar
          title={t.dashboard.nav.matrix}
          onToggleNotifications={() => setIsNotificationCenterOpen((currentValue) => !currentValue)}
          hasUnreadNotifications={notificationItems.some((item) => item.unread)}
        />

        <div className="min-h-0 flex-1 overflow-hidden px-1 py-1">
          <MatrixPortfolioTable rows={query.data?.rows ?? []} />
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
