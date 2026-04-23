"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import {
  Button,
  Field,
  Input,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Select,
  SplitButton,
} from "@fluentui/react-components";
import type { MenuButtonProps } from "@fluentui/react-components";
import { Add16Regular, Checkmark12Filled, Filter16Regular, Info16Regular, Search16Regular } from "@fluentui/react-icons";
import type { MatrixPortfolioRow } from "@/features/matrix/types";
import { MATRIX_ACTIVATION_DOSSIER_ID, MATRIX_ACTIVATION_QUERY_KEY } from "@/features/matrix/types";
import { MatrixUserManagementModal } from "@/features/matrix/components/matrix-user-management-modal";
import { useLocale } from "@/i18n/locale-context";

const PAGE_SIZE = 12;

type ActivateStep = 1 | 2;
type Workflow = "standard" | "direct";

function roleClass(role: MatrixPortfolioRow["role"]) {
  switch (role) {
    case "Admin":
      return "bg-surface-muted text-foreground";
    case "Auditor":
      return "bg-primary text-white";
    case "Reviewer":
      return "bg-[#1f1f1f] text-white";
    case "User":
      return "bg-[#fce1e6] text-[#d13438]";
    default:
      return "bg-border-soft text-secondary";
  }
}

type ActivateDossierDialogProps = {
  open: boolean;
  onClose: () => void;
};

type DialogPhase = "wizard" | "success";

function ActivateDossierDialog({ open, onClose }: ActivateDossierDialogProps) {
  const { t } = useLocale();
  const router = useRouter();
  const [phase, setPhase] = useState<DialogPhase>("wizard");
  const [step, setStep] = useState<ActivateStep>(1);
  const [workflow, setWorkflow] = useState<Workflow>("standard");
  const [auditDate, setAuditDate] = useState<Date | null>(null);

  useEffect(() => {
    if (open) {
      setPhase("wizard");
      setStep(1);
      setWorkflow("standard");
      setAuditDate(null);
    }
  }, [open]);

  if (!open) return null;

  const openMatrix = () => {
    const path = `/matrix/${MATRIX_ACTIVATION_DOSSIER_ID}?${MATRIX_ACTIVATION_QUERY_KEY}=${encodeURIComponent(workflow)}`;
    onClose();
    router.push(path);
  };

  if (phase === "success") {
    return (
      <>
        <button type="button" aria-label="Close" className="fixed inset-0 z-40 bg-black/45" onClick={onClose} />
        <div
          className="fixed left-1/2 top-1/2 z-50 w-[min(400px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[4px] border border-border bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="matrix-activate-success-title"
        >
          <div className="px-6 pb-2 pt-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00ca48]">
              <Checkmark12Filled className="text-white" />
            </div>
            <h3 id="matrix-activate-success-title" className="text-[20px] font-normal leading-snug text-foreground">
              {t.matrix.portfolio.activateDialog.successTitle}
              <br />
              {t.matrix.portfolio.activateDialog.successSubtitle}
            </h3>
          </div>
          <div className="border-t border-border-soft px-6 py-3.5">
            <div className="flex justify-end">
              <Button appearance="primary" className="h-8 min-h-8 rounded-[4px] px-4 text-[13px] font-medium" onClick={openMatrix}>
                {t.matrix.portfolio.activateDialog.openMatrix}
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <button type="button" aria-label="Close activate dossier dialog" className="fixed inset-0 z-40 bg-black/45" onClick={onClose} />
      <div
        className={
          step === 1
            ? "fixed left-1/2 top-1/2 z-50 w-[min(480px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-[4px] border border-border bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
            : "fixed left-1/2 top-1/2 z-50 w-[min(720px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-[4px] border border-border bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby="matrix-activate-dossier-title"
      >
        {step === 1 ? (
          <>
            <div className="px-6 pb-5 pt-5">
              <h3 id="matrix-activate-dossier-title" className="text-[20px] font-semibold leading-tight text-foreground">
                {t.matrix.portfolio.activateDialog.title}
              </h3>

              <section className="mt-5">
                <p className="mb-1.5 text-[13px] text-foreground">{t.matrix.portfolio.activateDialog.selectOrganization}</p>
                <Select className="h-8 w-full min-h-8 text-[13px]" defaultValue="">
                  <option value="">{t.matrix.portfolio.activateDialog.chooseClient}</option>
                  <option value="acme">Acme Corporation</option>
                  <option value="wayne">Wayne Enterprises</option>
                  <option value="stark">Stark Industries</option>
                </Select>
              </section>

              <section className="mt-4">
                <p className="mb-1.5 text-[13px] text-foreground">{t.matrix.portfolio.activateDialog.dossierName}</p>
                <Input className="h-8 min-h-8" placeholder={t.matrix.portfolio.activateDialog.enterDossierName} size="small" />
              </section>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
                <section>
                  <p className="mb-1.5 text-[13px] text-foreground">{t.matrix.portfolio.activateDialog.selectFramework}</p>
                  <Select className="h-8 w-full min-h-8 text-[13px]" defaultValue="">
                    <option value="">{t.matrix.portfolio.activateDialog.chooseFramework}</option>
                    <option value="iso27001">ISO 27001</option>
                    <option value="iso9001">ISO 9001</option>
                    <option value="soc2">SOC 2</option>
                  </Select>
                </section>
                <Field label={t.matrix.portfolio.activateDialog.auditName} size="small" className="w-full">
                  {(fieldControlProps) => (
                    <DatePicker
                      {...fieldControlProps}
                      className="w-full min-w-0"
                      placeholder={t.matrix.portfolio.activateDialog.searchDate}
                      value={auditDate}
                      onSelectDate={(d) => setAuditDate(d ?? null)}
                      showGoToToday
                      positioning={{ position: "below" }}
                    />
                  )}
                </Field>
              </div>
            </div>

            <div className="flex flex-row-reverse flex-wrap items-center justify-start gap-2 border-t border-border-soft px-6 py-3.5">
              <Button appearance="outline" className="h-8 min-h-8 rounded-[4px] px-4 text-[13px] font-medium" onClick={onClose}>
                {t.matrix.portfolio.activateDialog.cancel}
              </Button>
              <Button appearance="primary" className="h-8 min-h-8 rounded-[4px] px-4 text-[13px] font-medium" onClick={() => setStep(2)}>
                {t.matrix.portfolio.activateDialog.continue}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="px-6 pb-5 pt-5">
              <h3 id="matrix-activate-dossier-title" className="text-[20px] font-semibold leading-tight text-foreground">
                {t.matrix.portfolio.activateDialog.title}
              </h3>
              <p className="mt-1.5 text-[13px] text-secondary">{t.matrix.portfolio.activateDialog.chooseWorkflow}</p>

              <section className="mt-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setWorkflow("standard")}
                    className={`overflow-hidden rounded-[4px] border bg-surface text-left transition-colors ${
                      workflow === "standard" ? "border-primary ring-1 ring-primary" : "border-border-soft"
                    }`}
                  >
                    <div className="px-4 py-3.5">
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 ${
                            workflow === "standard" ? "border-primary" : "border-foreground/40"
                          }`}
                          aria-hidden
                        >
                          {workflow === "standard" ? <span className="h-2.5 w-2.5 rounded-full bg-primary" /> : null}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[14px] font-semibold text-foreground">{t.matrix.portfolio.activateDialog.standardUnit}</p>
                          <p className="mt-1 text-[12px] leading-relaxed text-secondary">{t.matrix.portfolio.activateDialog.standardSubtitle}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 border-t border-border-soft bg-surface-muted px-4 py-2 text-[12px] text-foreground">
                      <Info16Regular className="shrink-0 text-secondary" />
                      {t.matrix.portfolio.activateDialog.fullReviewProcess}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWorkflow("direct")}
                    className={`overflow-hidden rounded-[4px] border bg-surface text-left transition-colors ${
                      workflow === "direct" ? "border-primary ring-1 ring-primary" : "border-border-soft"
                    }`}
                  >
                    <div className="px-4 py-3.5">
                      <div className="flex items-start gap-2.5">
                        <span
                          className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 ${
                            workflow === "direct" ? "border-primary" : "border-foreground/40"
                          }`}
                          aria-hidden
                        >
                          {workflow === "direct" ? <span className="h-2.5 w-2.5 rounded-full bg-primary" /> : null}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[14px] font-semibold text-foreground">{t.matrix.portfolio.activateDialog.directAuditor}</p>
                          <p className="mt-1 text-[12px] leading-relaxed text-secondary">{t.matrix.portfolio.activateDialog.directSubtitle}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 border-t border-border-soft bg-surface-muted px-4 py-2 text-[12px] text-foreground">
                      <Info16Regular className="shrink-0 text-secondary" />
                      {t.matrix.portfolio.activateDialog.immediateReady}
                    </div>
                  </button>
                </div>
              </section>
            </div>

            <div className="flex flex-row-reverse flex-wrap items-center justify-start gap-2 border-t border-border-soft px-6 py-3.5">
              <Button appearance="outline" className="h-8 min-h-8 rounded-[4px] px-4 text-[13px] font-medium" onClick={() => setStep(1)}>
                {t.matrix.portfolio.activateDialog.back}
              </Button>
              <Button appearance="primary" className="h-8 min-h-8 rounded-[4px] px-4 text-[13px] font-medium" onClick={() => setPhase("success")}>
                {t.matrix.portfolio.activateDialog.activateDossier}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

type MatrixPortfolioTableProps = {
  rows: MatrixPortfolioRow[];
};

export function MatrixPortfolioTable({ rows }: MatrixPortfolioTableProps) {
  const { t } = useLocale();
  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const currentPageRows = rows.slice(0, PAGE_SIZE);

  return (
    <>
      <section className="flex h-full min-h-0 flex-col px-4 pb-5 pt-4 sm:px-5">
        <h2 className="shrink-0 text-[30px] font-semibold leading-none text-foreground">
          {t.matrix.portfolio.title}
        </h2>

        <div className="mt-4 flex shrink-0 items-center justify-between gap-3">
          <Input
            className="h-[38px] w-[360px]"
            placeholder={t.matrix.portfolio.searchPlaceholder}
            contentBefore={<Search16Regular className="text-muted" />}
          />
          <div className="flex items-center gap-2">
            <Button appearance="outline" className="h-[36px] rounded-[2px] border-border px-3 text-secondary" icon={<Filter16Regular />}>
              {t.matrix.portfolio.filterByRole}
            </Button>

            <Menu positioning="below-end">
              <MenuTrigger disableButtonEnhancement>
                {(triggerProps: MenuButtonProps) => (
                  <SplitButton
                    appearance="primary"
                    className="font-medium"
                    icon={<Add16Regular />}
                    iconPosition="before"
                    menuButton={triggerProps}
                    primaryActionButton={{ onClick: () => setIsActivateDialogOpen(true) }}
                    size="medium"
                  >
                    {t.matrix.portfolio.new}
                  </SplitButton>
                )}
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem onClick={() => setIsActivateDialogOpen(true)}>{t.matrix.portfolio.actions.activateNewDossier}</MenuItem>
                  <MenuItem onClick={() => setIsUserManagementOpen(true)}>{t.matrix.portfolio.actions.userManagement}</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        </div>

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto">
          <div className="overflow-x-auto rounded-[4px] border border-border-soft">
          <table className="w-full border-collapse text-[13px]">
            <thead className="sticky top-0 z-10 bg-surface text-left text-secondary">
              <tr className="border-b border-border-soft">
                <th className="px-4 py-3 font-medium">{t.matrix.portfolio.columns.dossier} ↕</th>
                <th className="px-4 py-3 font-medium">{t.matrix.portfolio.columns.framework} ↕</th>
                <th className="px-4 py-3 font-medium">{t.matrix.portfolio.columns.roles} ↕</th>
                <th className="px-4 py-3 font-medium">{t.matrix.portfolio.columns.progress}</th>
              </tr>
            </thead>
            <tbody>
              {currentPageRows.map((row, idx) => (
                <tr key={row.id} className="border-b border-border-soft text-foreground last:border-b-0 hover:bg-surface-muted">
                  <td className="px-4 py-3">
                    <Link href={`/matrix/${row.id}`} className="text-[14px] font-medium hover:text-primary">
                      {row.organization}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-secondary">{row.framework}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex h-5 items-center rounded-[4px] px-2 text-[10px] font-semibold ${roleClass(row.role)}`}>
                      {row.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px]">{idx === 0 ? "82%" : `${row.progress}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div className="mt-4 flex shrink-0 items-center justify-end gap-2 border-t border-border-soft pt-3 text-[13px] text-secondary">
          <button type="button" className="px-2 py-1 hover:text-foreground">‹ {t.matrix.common.previous}</button>
          <button type="button" className="h-7 w-7 rounded hover:bg-surface-muted">1</button>
          <button type="button" className="h-7 w-7 rounded border border-border bg-surface-muted">2</button>
          <button type="button" className="h-7 w-7 rounded hover:bg-surface-muted">3</button>
          <span>...</span>
          <button type="button" className="px-2 py-1 hover:text-foreground">{t.matrix.common.next} ›</button>
        </div>
      </section>

      <ActivateDossierDialog open={isActivateDialogOpen} onClose={() => setIsActivateDialogOpen(false)} />
      <MatrixUserManagementModal open={isUserManagementOpen} onClose={() => setIsUserManagementOpen(false)} />
    </>
  );
}
