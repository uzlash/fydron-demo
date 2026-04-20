"use client";

import { useState } from "react";
import { Spinner, Text } from "@fluentui/react-components";
import { useQuery } from "@tanstack/react-query";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { DashboardTopbar } from "@/features/dashboard/components/dashboard-topbar";
import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";
import { DossiersTable } from "@/features/dashboard/components/dossiers-table";
import { EmptyDashboardState } from "@/features/dashboard/components/empty-dashboard-state";
import { fetchDashboardData } from "@/features/dashboard/mock-data";
import type { DashboardDataMode } from "@/features/dashboard/types";
import { useLocale } from "@/i18n/locale-context";

function DashboardDataLoading({ label }: { label: string }) {
  return (
    <section className="flex flex-1 items-center justify-center border-t border-[#edebe9] px-6">
      <div className="flex items-center gap-2 text-[#605e5c]">
        <Spinner size="tiny" />
        <span className="text-[13px]">{label}</span>
      </div>
    </section>
  );
}

export function DashboardScreen() {
  const [mode, setMode] = useState<DashboardDataMode>("full");
  const { t } = useLocale();
  const dashboardQuery = useQuery({
    queryKey: ["dashboard-data", mode],
    queryFn: () => fetchDashboardData(mode),
  });

  const data = dashboardQuery.data;
  const isLoading = dashboardQuery.isPending;
  const isEmpty = !isLoading && (data?.dossiers.length ?? 0) === 0;

  return (
    <div className="flex h-screen w-full bg-[#ffffff] font-sans text-[#242424]">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col border-l border-[#e1dfdd]">
        <DashboardTopbar />
        
        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="px-6 py-6">
            <Text size={500} weight="semibold" block className="text-[18px] text-[#242424] mb-[2px]">
              {t.dashboard.greetingTitle.replace("{name}", data?.greetingName ?? "Michael")}
            </Text>
            <Text size={200} className="text-[#605e5c] text-[13px]" block>
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
  );
}
