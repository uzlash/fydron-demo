"use client";

import { Button, Input, Text } from "@fluentui/react-components";
import type { DossierRow } from "@/features/dashboard/types";
import { useLocale } from "@/i18n/locale-context";

function roleClass(role: DossierRow["role"]) {
  switch (role) {
    case "Auditor":
      return "bg-[#0078d4] text-white";
    case "Reviewer":
      return "bg-[#242424] text-white";
    case "User":
      return "bg-[#fbc5d0] text-[#c1254a]";
    case "Uploader":
      return "bg-[#edebe9] text-[#605e5c]";
    default:
      return "bg-[#edebe9] text-[#605e5c]";
  }
}

function ProgressCell({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-end gap-[24px] pr-[32px]">
      <div className="h-[2px] w-[140px] bg-[#edebe9]">
        <div
          className="h-full bg-[#0078d4]"
          style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
        />
      </div>
      <span className="w-[28px] text-right text-[12px] font-medium text-[#242424]">
        {value.toString().padStart(2, "0")}%
      </span>
    </div>
  );
}

export function DossiersTable({ rows }: { rows: DossierRow[] }) {
  const { t } = useLocale();

  return (
    <section className="flex flex-col border-t border-[#edebe9] bg-white h-full px-6 py-6">
      <div className="mb-4">
        <Text size={500} weight="semibold" className="text-[18px] text-[#242424]">
          {t.dashboard.dossiers.title}
        </Text>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <Input
          className="w-[420px] h-[36px]"
          placeholder={t.dashboard.dossiers.searchPlaceholder}
          contentBefore={<span className="text-[#a19f9d] text-base px-1">⌕</span>}
        />
        <Button 
          appearance="outline" 
          className="h-[36px] text-[#605e5c] border-[#d2d0ce]"
          icon={<span className="text-[14px]">≡</span>}
        >
          {t.dashboard.dossiers.filterByRole}
        </Button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-[#e1dfdd] text-left text-[#605e5c] font-medium tracking-tight">
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
              <tr key={row.id} className="border-b border-[#f3f2f1] last:border-0 hover:bg-[#faf9f8] transition-colors">
                <td className="px-1 py-[16px] pl-[12px] text-[#242424] font-medium">{row.organization}</td>
                <td className="px-1 py-[16px] text-[#605e5c]">{row.dossier}</td>
                <td className="px-1 py-[16px]">
                  <span
                    className={`inline-flex items-center justify-center rounded-[4px] px-[8px] h-[22px] text-[11px] font-medium ${roleClass(row.role)}`}
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

      <div className="mt-8 flex items-center justify-end gap-1 text-[13px] text-[#605e5c] font-medium">
        <button type="button" className="flex items-center gap-1 hover:text-[#242424] px-2 py-1">
          <span className="text-[16px] leading-none mb-[1px]">‹</span> {t.dashboard.pagination.previous}
        </button>
        <button type="button" className="w-[28px] h-[28px] rounded hover:bg-[#f3f2f1] flex items-center justify-center">1</button>
        <button
          type="button"
          className="w-[28px] h-[28px] rounded border border-[#0078d4] text-[#0078d4] font-semibold flex items-center justify-center"
        >
          2
        </button>
        <button type="button" className="w-[28px] h-[28px] rounded hover:bg-[#f3f2f1] flex items-center justify-center">3</button>
        <span className="px-2">…</span>
        <button type="button" className="flex items-center gap-1 hover:text-[#242424] px-2 py-1">
          {t.dashboard.pagination.next} <span className="text-[16px] leading-none mb-[1px]">›</span>
        </button>
      </div>
    </section>
  );
}
