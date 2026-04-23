"use client";

import { useState } from "react";
import { Button, Input, Textarea } from "@fluentui/react-components";
import {
  CheckmarkCircle16Filled,
  Document20Regular,
  Eye16Regular,
  Warning16Filled,
} from "@fluentui/react-icons";
import {
  TURBO_DOSSIER_EVIDENCE_FILE_ROWS,
  TURBO_DOSSIER_REQUIRED_ELEMENT_LINES,
  getTurboDossierReviewerTitle,
} from "@/features/client-portfolio/turbo-dossier-constants";
import type { MatrixDossierRow } from "@/features/matrix/types";
import { useLocale } from "@/i18n/locale-context";

type ReviewerTab = "assessment" | "logs";
type TurboIndicatorValue = "toReview" | "passed" | "failed";

type AuditorTurboViewReviewerColumnProps = {
  row: MatrixDossierRow;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

function LogsTab() {
  const { t } = useLocale();
  const mr = t.matrix.reviewer;
  const mc = t.matrix.common;
  const [logNote, setLogNote] = useState("");

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fcfcfc]">
      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-5">
        {["Yesterday", "Today"].map((day) => (
          <div key={day} className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border-soft"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#fcfcfc] px-3 text-[11px] font-medium text-secondary">{day}</span>
            </div>
            <div className="mt-4 space-y-3">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`mb-4 rounded-[4px] border border-border-soft p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] ${
                    idx % 2 === 0 ? "bg-[#f7f9fc]" : "bg-surface"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[13px] font-medium text-primary">Elysaa Jackson</p>
                    <span className="text-[11px] text-muted">1:15 PM</span>
                  </div>
                  <p className="text-[13px] leading-[1.6] text-foreground">
                    {idx === 0 && day === "Yesterday"
                      ? "I reviewed the SOC2_policy_v4.1.pdf. Section 7.3 refers to Appendix C, which seems to be missing. Could someone verify if it should be included?"
                      : idx === 1 && day === "Yesterday"
                        ? "Great. I'll share my thoughts on the proposal by EOD tomorrow."
                        : idx === 0 && day === "Today"
                          ? "Reviewed the IS_policy_v3.3.pdf. Section 4.2 reference an anex that isn't included in the upload. can someone confirm if it exists?."
                          : "Thanks for the update. Looking forward to reviewing the proposal."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="shrink-0 border-t border-border-soft bg-surface px-5 py-4">
        <div className="flex items-center gap-2">
          <Input
            className="h-[36px] flex-1 text-[13px]"
            placeholder={t.clientPortfolio.turboDossier.auditorView.discussionPlaceholder}
            value={logNote}
            onChange={(_, data) => setLogNote(data.value)}
          />
          <Button appearance="primary" className="h-[36px] rounded-[4px] px-5 font-medium">
            {mc.send}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function AuditorTurboViewReviewerColumn({ row, onPrev, onNext, canPrev, canNext }: AuditorTurboViewReviewerColumnProps) {
  const { t } = useLocale();
  const av = t.clientPortfolio.turboDossier.auditorView;
  const d = t.clientPortfolio.turboDossier.drawer;
  const mr = t.matrix.reviewer;
  const mc = t.matrix.common;

  const [activeTab, setActiveTab] = useState<ReviewerTab>("assessment");
  const [indicatorStatus, setIndicatorStatus] = useState<TurboIndicatorValue>("toReview");
  const [rejectNote, setRejectNote] = useState("");

  const title = getTurboDossierReviewerTitle(row.id);
  const showRejection = indicatorStatus === "failed";

  return (
    <aside className="flex h-full min-h-0 w-full min-w-0 flex-col border-l border-border bg-surface">
      <header className="shrink-0 border-b border-border-soft px-5 pb-4 pt-4">
        <h3 className="text-[18px] font-semibold leading-snug text-foreground">{title}</h3>
        <p className="mt-1.5 text-[12px] text-secondary">{mr.subtitle}</p>
        <div className="mt-4 flex items-center gap-6 text-[14px] font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("assessment")}
            className={`border-b-[3px] pb-1.5 ${activeTab === "assessment" ? "border-primary text-foreground" : "border-transparent text-secondary"}`}
          >
            {mr.tabs.assessment}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("logs")}
            className={`border-b-[3px] pb-1.5 ${activeTab === "logs" ? "border-primary text-foreground" : "border-transparent text-secondary"}`}
          >
            {mr.tabs.logs}
          </button>
        </div>
      </header>

      {activeTab === "assessment" ? (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            <h5 className="text-[14px] font-semibold text-foreground">{d.requirementsSectionTitle}</h5>
            <p className="mt-1.5 text-[13px] leading-[1.6] text-secondary">{mr.requirementsBody}</p>

            <div className="mt-4">
              <h5 className="text-[14px] font-semibold text-foreground">{d.requiredElementsTitle}</h5>
              <ul className="mt-2 space-y-1.5 text-[13px] text-secondary">
                {TURBO_DOSSIER_REQUIRED_ELEMENT_LINES.map((line) => (
                  <li key={line}>• {line}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5 border-t border-border-soft pt-4">
              <h5 className="text-[14px] font-semibold text-foreground">{mr.indicatorReview}</h5>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px] text-secondary">
                <span>{d.indicatorStatusLabel}</span>
                <span
                  className={`inline-flex items-center gap-1.5 font-medium ${
                    indicatorStatus === "passed" ? "text-success" : indicatorStatus === "failed" ? "text-danger" : "text-secondary"
                  }`}
                >
                  {indicatorStatus === "passed" ? (
                    <>
                      <CheckmarkCircle16Filled />
                      {d.statusPassed}
                    </>
                  ) : indicatorStatus === "failed" ? (
                    <>
                      <Warning16Filled />
                      {d.statusFailed}
                    </>
                  ) : (
                    av.statusToReview
                  )}
                </span>
                <select
                  aria-label={d.indicatorStatusLabel}
                  value={indicatorStatus}
                  onChange={(e) => setIndicatorStatus(e.target.value as TurboIndicatorValue)}
                  className="ml-0 rounded-[4px] border border-border-strong bg-surface px-2 py-1 text-[13px] text-foreground shadow-sm"
                >
                  <option value="toReview">{av.statusToReview}</option>
                  <option value="passed">{d.statusPassed}</option>
                  <option value="failed">{d.statusFailed}</option>
                </select>
              </div>
            </div>

            {showRejection ? (
              <div className="mt-5 border-t border-border-soft pt-4">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="text-[14px] font-semibold text-foreground">{mr.officialAssessment}</h5>
                  <span className="text-[11px] text-muted">{av.inEditMode}</span>
                </div>
                <div className="mt-2 flex items-start gap-2 rounded-[3px] border border-[#f4d58f] bg-[#fff6d8] px-3 py-2 text-[12px] text-[#8a6d00]">
                  <Warning16Filled className="mt-0.5 shrink-0" />
                  <span>{d.rejectReasonWarning}</span>
                </div>
                <Textarea
                  className="mt-3 min-h-[90px] w-full"
                  placeholder={mr.addNote}
                  value={rejectNote}
                  onChange={(_, data) => setRejectNote(data.value)}
                />
                <div className="mt-3 flex justify-end gap-2">
                  <Button appearance="outline" className="h-[34px] rounded-[4px] border-border-strong px-4 font-medium" onClick={() => setRejectNote("")}>
                    {mc.cancel}
                  </Button>
                  <Button appearance="primary" className="h-[34px] rounded-[4px] px-4 font-medium">
                    {mc.send}
                  </Button>
                </div>
              </div>
            ) : null}

            <div className="mt-6 border-t border-border-soft pt-4">
              <h5 className="text-[14px] font-semibold text-foreground">{d.uploadedEvidence}</h5>
              <div className="mt-3 space-y-2">
                {TURBO_DOSSIER_EVIDENCE_FILE_ROWS.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-[4px] border border-border-soft bg-surface p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded border border-border-soft bg-surface-muted">
                        <Document20Regular className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-foreground">{item.label}</p>
                        <p className="mt-0.5 text-[10px] uppercase text-muted">{item.meta}</p>
                      </div>
                    </div>
                    <Eye16Regular className="text-secondary" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-border-soft bg-surface px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <Button appearance="subtle" className="font-medium" disabled={!canPrev} onClick={onPrev}>
                {av.prev}
              </Button>
              <Button appearance="subtle" className="font-medium" disabled={!canNext} onClick={onNext}>
                {av.next}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <LogsTab />
        </div>
      )}
    </aside>
  );
}
