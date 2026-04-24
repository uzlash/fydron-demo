"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Text } from "@fluentui/react-components";
import { ArrowSync16Regular, Document20Regular } from "@fluentui/react-icons";
import { AuditorTurboViewReviewerColumn } from "@/features/client-portfolio/components/auditor-turbo-view-reviewer-column";
import { getClientTurboDossierData } from "@/features/client-portfolio/mock-data";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { DashboardTopbar } from "@/features/dashboard/components/dashboard-topbar";
import { NotificationCenter } from "@/features/dashboard/components/notification-center";
import { notificationItems } from "@/features/dashboard/mock-data";
import { useLocale } from "@/i18n/locale-context";
import { AppPageFrame, AppMainCard } from "@/components/app-content-shell";
import { RightDrawerFrame, RIGHT_DRAWER_WIDTH_360 } from "@/components/right-drawer-frame";

const TURBO_VIEW_ROW_COUNT = 5;

type AuditorTurboViewScreenProps = {
  clientId: string;
  dossierId: string;
};

export function AuditorTurboViewScreen({ clientId, dossierId }: AuditorTurboViewScreenProps) {
  const { t } = useLocale();
  const av = t.clientPortfolio.turboDossier.auditorView;
  const turbo = t.clientPortfolio.turboDossier;
  const searchParams = useSearchParams();

  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState(0);

  const data = useMemo(() => getClientTurboDossierData(clientId, dossierId), [clientId, dossierId]);
  const rows = useMemo(() => (data ? data.rows.slice(0, TURBO_VIEW_ROW_COUNT) : []), [data]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedRow = rows[selectedIndex] ?? null;

  useEffect(() => {
    const id = searchParams.get("rowId");
    if (!id || rows.length === 0) return;
    const idx = rows.findIndex((r) => r.id === id);
    if (idx >= 0) setSelectedIndex(idx);
  }, [searchParams, rows]);

  const onPrev = useCallback(() => {
    setSelectedIndex((i) => Math.max(0, i - 1));
  }, []);

  const onNext = useCallback(() => {
    setSelectedIndex((i) => Math.min(rows.length - 1, i + 1));
  }, [rows.length]);

  const dossierLink = `/client-portfolio/${clientId}/dossier/${dossierId}`;

  if (!data || !selectedRow) {
    return null;
  }

  const fileTabs = [
    av.fileTabs.incidentResponse,
    av.fileTabs.incidentSummaries,
    av.fileTabs.analysis,
    av.fileTabs.resolutionTimelines,
    av.fileTabs.remediation,
  ];
  const reviewed = 0;
  const total = rows.length;

  return (
    <AppPageFrame>
      <DashboardSidebar />
      <AppMainCard>
      <div className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden bg-surface">
        <DashboardTopbar
          title={av.topbarTitle}
          onToggleNotifications={() => setIsNotificationCenterOpen((v) => !v)}
          hasUnreadNotifications={notificationItems.some((item) => item.unread)}
        />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="shrink-0 border-b border-border-soft bg-surface px-4 py-3 sm:px-5">
            <nav className="text-[12px] text-muted" aria-label="Breadcrumb">
              <Link className="hover:text-foreground" href="/matrix">
                {turbo.breadcrumbMatrix}
              </Link>
              <span> &gt; </span>
              <Link className="hover:text-foreground" href="/client-portfolio">
                {turbo.breadcrumbClientPortfolio}
              </Link>
              <span> &gt; </span>
              <Link className="hover:text-foreground" href={dossierLink}>
                {turbo.breadcrumbDossierPrefix} {data.frameworkTitle}
              </Link>
              <span> &gt; </span>
              <span className="text-secondary">{av.breadcrumbTurbo}</span>
            </nav>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-[22px] font-semibold leading-tight text-foreground sm:text-[26px]">{av.pageTitle}</h1>
              <Button
                appearance="outline"
                className="h-9 w-fit shrink-0 self-start border-border-strong font-medium sm:self-auto"
                disabled
              >
                {av.reviewingEvidence}
              </Button>
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-1">
            <div className="flex w-[280px] shrink-0 flex-col border-r border-border bg-surface">
              <div className="shrink-0 border-b border-border-soft px-4 py-3">
                <p className="text-[13px] font-semibold text-foreground">{av.indicatorsHeading}</p>
                <label className="mt-2 block text-[11px] font-medium text-muted" htmlFor="turbo-chapter">
                  {av.chapterLabel}
                </label>
                <select
                  id="turbo-chapter"
                  className="mt-1 w-full rounded border border-border-strong bg-surface px-2 py-1.5 text-[13px] text-foreground shadow-sm"
                  defaultValue="c1"
                >
                  <option value="c1">{av.chapter1}</option>
                </select>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto py-1">
                {rows.map((row, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => {
                        setSelectedIndex(idx);
                        setActiveDocTab(0);
                      }}
                      className={`flex w-full flex-col gap-0.5 border-b border-border-soft px-4 py-3 text-left transition-colors ${
                        isActive ? "bg-[#e8f4ff] text-foreground" : "bg-surface hover:bg-surface-muted"
                      }`}
                    >
                      <span className="text-[13px] font-medium leading-snug">{row.title}</span>
                      <span className="mt-0.5 inline-flex items-center gap-1.5 text-[12px] text-secondary">
                        <ArrowSync16Regular className="h-3.5 w-3.5" />
                        {av.listStatusToReview}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="shrink-0 border-t border-border-soft px-4 py-3">
                <p className="text-[12px] font-medium text-secondary">
                  {av.progressReviewed.replace("{reviewed}", String(reviewed)).replace("{total}", String(total))}
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: total > 0 ? `${(reviewed / total) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            </div>

            <div className="flex min-h-0 min-w-0 flex-1 flex-col border-r border-border bg-[#f3f2f1]">
              <div className="shrink-0 border-b border-border-soft bg-surface px-4 py-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-foreground">{selectedRow.title}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded border border-border-soft bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-secondary">
                        <Document20Regular className="h-3.5 w-3.5" />
                        {av.documentBadge}
                      </span>
                    </div>
                  </div>
                  <Button appearance="outline" className="h-8 shrink-0 text-[13px]">
                    {av.allDocs}
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-1 border-b border-border-soft pb-0">
                  {fileTabs.map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setActiveDocTab(i)}
                      className={`shrink-0 rounded-t px-2.5 py-1.5 text-[12px] font-medium transition-colors ${
                        activeDocTab === i
                          ? "bg-[#f3f2f1] text-primary border-t border-x border-border-soft -mb-px"
                          : "text-secondary hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-4">
                <div className="mx-auto max-w-[720px] rounded-sm border border-border-soft bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between text-[12px]">
                    <div className="inline-flex items-center gap-2 font-medium text-foreground">
                      <Document20Regular className="text-muted" />
                      Incident Response.docx
                    </div>
                    <Text size={100} className="text-[10px] font-semibold uppercase text-muted">
                      {av.readOnlyTag}
                    </Text>
                  </div>
                  <div className="space-y-2.5">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-3.5 rounded bg-surface-muted ${i % 7 === 0 ? "w-2/3" : i % 5 === 0 ? "w-1/2" : "w-full"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-center text-[11px] font-medium tracking-wide text-muted">{av.readOnlyPreview}</p>
              </div>
            </div>

            <div className="flex h-full min-h-0 w-[440px] shrink-0">
              <AuditorTurboViewReviewerColumn
                key={selectedRow.id}
                row={selectedRow}
                onPrev={onPrev}
                onNext={onNext}
                canPrev={selectedIndex > 0}
                canNext={selectedIndex < rows.length - 1}
              />
            </div>
          </div>
        </div>
      </div>
      </AppMainCard>

      {isNotificationCenterOpen ? (
        <>
          <button
            type="button"
            aria-label="Close notifications panel"
            className="fixed inset-0 z-[100] bg-black/45"
            onClick={() => setIsNotificationCenterOpen(false)}
          />
          <RightDrawerFrame widthClass={RIGHT_DRAWER_WIDTH_360} position="fixed" zClass="z-[110]">
            <NotificationCenter items={notificationItems} />
          </RightDrawerFrame>
        </>
      ) : null}
    </AppPageFrame>
  );
}
