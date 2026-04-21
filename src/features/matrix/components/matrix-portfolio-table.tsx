"use client";

import Link from "next/link";
import { Button, Input } from "@fluentui/react-components";
import { ChevronDown16Regular, Filter16Regular, Search16Regular } from "@fluentui/react-icons";
import type { MatrixPortfolioRow } from "@/features/matrix/types";
import { useLocale } from "@/i18n/locale-context";

const PAGE_SIZE = 12;

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

type MatrixPortfolioTableProps = {
  rows: MatrixPortfolioRow[];
};

export function MatrixPortfolioTable({ rows }: MatrixPortfolioTableProps) {
  const { t } = useLocale();
  const currentPageRows = rows.slice(0, PAGE_SIZE);

  return (
    <section className="px-4 pb-5 pt-4 sm:px-5">
      <h2 className="text-[30px] font-semibold leading-none text-foreground">{t.matrix.portfolio.title}</h2>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Input
          className="h-[38px] w-[360px]"
          placeholder={t.matrix.portfolio.searchPlaceholder}
          contentBefore={<Search16Regular className="text-muted" />}
        />
        <div className="flex items-center gap-2">
          <Button appearance="outline" className="h-[36px] rounded-[2px] border-border px-3 text-secondary" icon={<Filter16Regular />}>
            {t.matrix.portfolio.filterByRole}
          </Button>
          <Button appearance="primary" className="h-[36px] rounded-[2px] px-3 font-medium" icon={<span className="text-[16px] leading-none">+</span>}>
            {t.matrix.portfolio.new}
          </Button>
          <Button size="small" appearance="primary" className="h-[36px] min-w-[32px] rounded-[2px] px-2">
            <ChevronDown16Regular />
          </Button>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto rounded-[4px] border border-border-soft">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-border-soft text-left text-secondary">
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

      <div className="mt-4 flex items-center justify-end gap-2 text-[13px] text-secondary">
        <button type="button" className="px-2 py-1 hover:text-foreground">‹ {t.matrix.common.previous}</button>
        <button type="button" className="h-7 w-7 rounded hover:bg-surface-muted">1</button>
        <button type="button" className="h-7 w-7 rounded border border-border bg-surface-muted">2</button>
        <button type="button" className="h-7 w-7 rounded hover:bg-surface-muted">3</button>
        <span>...</span>
        <button type="button" className="px-2 py-1 hover:text-foreground">{t.matrix.common.next} ›</button>
      </div>
    </section>
  );
}
