"use client";

import { Button, Input, Text } from "@fluentui/react-components";
import type { DossierRow } from "@/features/dashboard/types";
import { useLocale } from "@/i18n/locale-context";

function roleClass(role: DossierRow["role"]) {
  switch (role) {
    case "Auditor":
      return "bg-primary text-primary-foreground";
    case "Reviewer":
      return "bg-foreground text-primary-foreground";
    case "User":
      return "bg-accent text-accent-foreground";
    case "Uploader":
      return "bg-border-soft text-secondary";
    default:
      return "bg-border-soft text-secondary";
  }
}

function ProgressCell({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-end gap-[24px] pr-[32px]">
      <div className="h-[2px] w-[140px] bg-border-soft">
        <div
          className="h-full bg-primary"
          style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
        />
      </div>
      <span className="w-[28px] text-right text-[12px] font-medium text-foreground">
        {value.toString().padStart(2, "0")}%
      </span>
    </div>
  );
}

export function DossiersTable({ rows }: { rows: DossierRow[] }) {
  const { t } = useLocale();

  return (
    <section className="flex min-h-0 flex-1 flex-col border-t border-border-soft bg-surface">
      <div className="shrink-0 px-6 pt-6">
        <Text size={500} weight="semibold" className="text-[18px] text-foreground">
          {t.dashboard.dossiers.title}
        </Text>
      </div>

      <div className="mb-4 flex shrink-0 items-center justify-between px-6 pt-4">
        <Input
          className="h-[36px] w-[420px]"
          placeholder={t.dashboard.dossiers.searchPlaceholder}
          contentBefore={<span className="px-1 text-base text-muted">⌕</span>}
        />
        <Button
          appearance="outline"
          className="h-[36px] border-border-strong text-secondary"
          icon={<span className="text-[14px]">≡</span>}
        >
          {t.dashboard.dossiers.filterByRole}
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6">
        <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead className="sticky top-0 z-10 bg-surface text-left font-medium tracking-tight text-secondary">
            <tr className="border-b border-border">
              <th className="px-1 py-[12px] pl-[12px] w-[30%]">
                <span className="flex items-center gap-[4px]">{t.dashboard.dossiers.organization} <span className="text-[10px]">↕</span></span>
              </th>
              <th className="px-1 py-[12px] w-[30%]">
                <span className="flex items-center gap-[4px]">{t.dashboard.dossiers.dossier} <span className="text-[10px]">↕</span></span>
              </th>
              <th className="px-1 py-[12px] w-[20%]">
                <span className="flex items-center gap-[4px]">{t.dashboard.dossiers.roles} <span className="text-[10px]">↕</span></span>
              </th>
              <th className="px-1 py-[12px] pr-[32px] w-[20%]">
                <span className="flex items-center justify-end gap-[4px]">{t.dashboard.dossiers.progress} <span className="text-[10px]">↕</span></span>
              </th>
            </tr>
          </thead>
            <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-sidebar transition-colors last:border-0 hover:bg-surface-muted">
                <td className="px-1 py-[16px] pl-[12px] font-medium text-foreground">{row.organization}</td>
                <td className="px-1 py-[16px] text-secondary">{row.dossier}</td>
                <td className="px-1 py-[16px]">
                  <span
                    className={`inline-flex h-[22px] items-center justify-center rounded-[4px] px-[8px] text-[11px] font-medium ${roleClass(row.role)}`}
                  >
                    {row.role}
                  </span>
                </td>
                <td className="px-1 py-[16px]">
                  <ProgressCell value={row.progress} />
                </td>
              </tr>
            ))}
            </tbody>
        </table>
        </div>
      </div>

      <div className="mt-auto flex shrink-0 items-center justify-end gap-1 border-t border-border-soft px-6 py-4 text-[13px] font-medium text-secondary">
        <button type="button" className="flex items-center gap-1 px-2 py-1 hover:text-foreground">
          <span className="text-[16px] leading-none mb-[1px]">‹</span> {t.dashboard.pagination.previous}
        </button>
        <button type="button" className="flex h-[28px] w-[28px] items-center justify-center rounded hover:bg-sidebar">1</button>
        <button
          type="button"
          className="flex h-[28px] w-[28px] items-center justify-center rounded border border-primary font-semibold text-primary"
        >
          2
        </button>
        <button type="button" className="flex h-[28px] w-[28px] items-center justify-center rounded hover:bg-sidebar">3</button>
        <span className="px-2">…</span>
        <button type="button" className="flex items-center gap-1 px-2 py-1 hover:text-foreground">
          {t.dashboard.pagination.next} <span className="text-[16px] leading-none mb-[1px]">›</span>
        </button>
      </div>
    </section>
  );
}
