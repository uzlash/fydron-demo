"use client";

import { useState } from "react";
import { Spinner, Text } from "@fluentui/react-components";
import {
  ArrowSync16Regular,
  ArrowDownload16Regular,
  CheckmarkCircle16Filled,
  Warning16Filled,
} from "@fluentui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { DashboardTopbar } from "@/features/dashboard/components/dashboard-topbar";
import { NotificationCenter } from "@/features/dashboard/components/notification-center";
import { notificationItems } from "@/features/dashboard/mock-data";
import { useLocale } from "@/i18n/locale-context";
import { fetchBillingData } from "@/features/billing/mock-data";
import type { InvoiceStatus } from "@/features/billing/types";

function StatusBadge({
  status,
  label,
}: {
  status: InvoiceStatus;
  label: string;
}) {
  if (status === "success") {
    return (
      <span className="inline-flex items-center gap-2 text-[13px] text-foreground">
        <CheckmarkCircle16Filled className="shrink-0 text-success" />
        {label}
      </span>
    );
  }

  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-2 text-[13px] text-foreground">
        <Warning16Filled className="shrink-0 text-danger" />
        {label}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-[13px] text-foreground">
      <ArrowSync16Regular className="shrink-0 text-primary" />
      {label}
    </span>
  );
}

function InvoiceEmptyState({ label }: { label: string }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center bg-surface px-6 py-16 text-[13px] text-secondary">
      {label}
    </div>
  );
}

export function BillingScreen() {
  const { t } = useLocale();
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const billingQuery = useQuery({
    queryKey: ["billing-data"],
    queryFn: fetchBillingData,
  });

  const data = billingQuery.data;
  const isLoading = billingQuery.isPending;
  const overview = data?.overview;

  return (
    <div className="relative flex h-screen w-full bg-surface font-sans text-foreground">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col border-l border-border">
        <DashboardTopbar
          title={t.billing.title}
          onToggleNotifications={() => setIsNotificationCenterOpen((current) => !current)}
          hasUnreadNotifications={notificationItems.some((item) => item.unread)}
        />

        {isLoading ? (
          <section className="flex flex-1 items-center justify-center border-t border-border-soft px-6">
            <div className="flex items-center gap-2 text-secondary">
              <Spinner size="tiny" />
              <span className="text-[13px]">{t.billing.loading}</span>
            </div>
          </section>
        ) : (
          <main className="flex-1 overflow-y-auto bg-surface">
            <div className="px-6 py-6">
              <div className="mb-6">
                <Text size={500} weight="semibold" className="text-[18px] text-foreground">
                  {t.billing.overview.title}
                </Text>
                <Text size={200} className="mt-1 block text-[13px] text-secondary">
                  {t.billing.overview.subtitle}
                </Text>

                <div className="mt-4 w-full max-w-[580px] border border-border bg-surface">
                  <div className="flex min-h-[168px] flex-col sm:flex-row">
                    <div className="flex min-h-[140px] min-w-0 flex-1 flex-col border-border px-5 py-5 sm:border-r">
                      <div>
                        <Text weight="semibold" className="block text-[16px] text-foreground">
                          {overview?.suiteName}
                        </Text>
                        <Text
                          className={`mt-2 block text-[13px] ${
                            overview?.isActive ? "text-success" : "text-secondary"
                          }`}
                        >
                          {overview?.statusLabel}
                        </Text>
                      </div>
                      <button
                        type="button"
                        disabled={!overview?.isActive}
                        className={`mt-auto inline-flex h-[32px] w-fit shrink-0 items-center rounded-[4px] border px-4 text-[13px] ${
                          overview?.isActive
                            ? "border-border-strong text-secondary hover:bg-sidebar"
                            : "cursor-not-allowed border-border text-muted opacity-70"
                        }`}
                      >
                        {t.billing.overview.contactCta}
                      </button>
                    </div>
                    <div className="hidden w-px shrink-0 bg-border sm:block" aria-hidden />
                    <div className="flex w-full shrink-0 flex-col justify-center gap-5 border-t border-border px-5 py-5 sm:w-[240px] sm:border-t-0 sm:py-5">
                      <Text className="text-[13px] leading-snug text-foreground">
                        <span className="font-semibold tabular-nums">{overview?.activeClients}</span>{" "}
                        <span className="text-secondary">{t.billing.overview.activeClients}</span>
                      </Text>
                      <Text className="text-[13px] leading-snug text-foreground">
                        <span className="font-semibold tabular-nums">{overview?.activeDossiers}</span>{" "}
                        <span className="text-secondary">{t.billing.overview.activeDossiers}</span>
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              <section className="border-t border-border-soft pt-6">
                <Text size={500} weight="semibold" className="text-[18px] text-foreground">
                  {t.billing.invoices.title}
                </Text>
                <Text size={200} className="mt-1 block text-[13px] text-secondary">
                  {t.billing.invoices.subtitle}
                </Text>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[720px] border-collapse text-[13px]">
                    <thead>
                      <tr className="border-b border-border text-left text-secondary font-medium tracking-tight">
                        <th className="px-1 py-[12px] pl-[12px] w-[22%]">
                          <span className="flex items-center gap-[4px]">
                            {t.billing.invoices.columns.invoice}{" "}
                            <span className="text-[10px]">↕</span>
                          </span>
                        </th>
                        <th className="px-1 py-[12px] w-[22%]">
                          <span className="flex items-center gap-[4px]">
                            {t.billing.invoices.columns.status}{" "}
                            <span className="text-[10px]">↕</span>
                          </span>
                        </th>
                        <th className="px-1 py-[12px] w-[18%]">{t.billing.invoices.columns.date}</th>
                        <th className="px-1 py-[12px] w-[18%]">{t.billing.invoices.columns.amount}</th>
                        <th className="px-1 py-[12px] pr-[12px] w-[20%]" />
                      </tr>
                    </thead>
                    <tbody>
                      {(data?.invoices.length ?? 0) > 0 ? (
                        data?.invoices.map((row) => (
                          <tr
                            key={row.id}
                            className="border-b border-sidebar transition-colors last:border-0 hover:bg-surface-muted"
                          >
                            <td className="px-1 py-[16px] pl-[12px] font-medium text-foreground">
                              {row.invoiceNumber}
                            </td>
                            <td className="px-1 py-[16px]">
                              <StatusBadge
                                status={row.status}
                                label={t.billing.invoices.statusLabels[row.status]}
                              />
                            </td>
                            <td className="px-1 py-[16px] text-secondary">{row.date}</td>
                            <td className="px-1 py-[16px] text-foreground">{row.amount}</td>
                            <td className="px-1 py-[16px] pr-[12px]">
                              <button
                                type="button"
                                className="inline-flex h-[32px] items-center gap-1.5 rounded-[4px] border border-border-strong px-3 text-[13px] text-secondary hover:bg-sidebar"
                              >
                                <ArrowDownload16Regular className="text-muted" />
                                {t.billing.invoices.download}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-0">
                            <InvoiceEmptyState label={t.billing.invoices.empty} />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {(data?.invoices.length ?? 0) > 0 ? (
                  <div className="mt-8 flex items-center justify-end gap-1 text-[13px] font-medium text-secondary">
                    <button type="button" className="flex items-center gap-1 px-2 py-1 hover:text-foreground">
                      <span className="mb-[1px] text-[16px] leading-none">‹</span>{" "}
                      {t.dashboard.pagination.previous}
                    </button>
                    <button
                      type="button"
                      className="flex h-[28px] w-[28px] items-center justify-center rounded hover:bg-sidebar"
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className="flex h-[28px] w-[28px] items-center justify-center rounded border border-border font-semibold text-foreground"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className="flex h-[28px] w-[28px] items-center justify-center rounded hover:bg-sidebar"
                    >
                      3
                    </button>
                    <span className="px-2">…</span>
                    <button type="button" className="flex items-center gap-1 px-2 py-1 hover:text-foreground">
                      {t.dashboard.pagination.next}{" "}
                      <span className="mb-[1px] text-[16px] leading-none">›</span>
                    </button>
                  </div>
                ) : null}
              </section>
            </div>
          </main>
        )}
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
