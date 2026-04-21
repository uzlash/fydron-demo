"use client";

import { Button } from "@fluentui/react-components";
import { Archive16Regular, ArrowDownload16Regular, ChevronDown16Regular } from "@fluentui/react-icons";
import type { MatrixDossierAuditMode } from "@/features/matrix/types";
import { useLocale } from "@/i18n/locale-context";

type MatrixDossierToolbarProps = {
  selectedCount: number;
  onAddTeam: () => void;
  auditMode?: MatrixDossierAuditMode;
};

export function MatrixDossierToolbar({ selectedCount, onAddTeam, auditMode = "standard" }: MatrixDossierToolbarProps) {
  const { t } = useLocale();
  const restrictActions = auditMode !== "standard";
  const archiveDisabled = auditMode === "inspection";

  return (
    <div className="flex items-center justify-end gap-2">
      {selectedCount > 0 && !restrictActions ? (
        <>
          <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#1f1f1f] px-3 text-[12px] font-medium text-white">
            {t.matrix.dossier.selectedCount.replace("{count}", String(selectedCount))}
            <span className="cursor-pointer text-white/70 hover:text-white">✕</span>
          </span>
          <Button appearance="primary" className="h-8 rounded-[3px] px-3 text-[13px] font-medium">
            {t.matrix.dossier.approveSelected}
          </Button>
        </>
      ) : null}

      <Button appearance="outline" className="h-8 rounded-[3px] border-border px-3 text-[13px]" icon={<ArrowDownload16Regular />} disabled={restrictActions}>
        {t.matrix.dossier.export}
      </Button>
      <Button appearance="outline" className="h-8 rounded-[3px] border-border px-3 text-[13px]" icon={<Archive16Regular />} disabled={archiveDisabled}>
        {t.matrix.dossier.archive}
      </Button>
      <Button appearance="primary" className="h-8 rounded-[3px] px-3 text-[13px] font-medium" onClick={onAddTeam} disabled={restrictActions}>
        + {t.matrix.dossier.addTeam}
      </Button>
      <Button appearance="primary" className="h-8 min-w-[30px] rounded-[3px] px-2" disabled={restrictActions}>
        <ChevronDown16Regular />
      </Button>
    </div>
  );
}
