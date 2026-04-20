import type { DashboardData, DashboardDataMode } from "@/features/dashboard/types";
import { delay } from "@/utils/helpers";

const fullData: DashboardData = {
  greetingName: "Michael",
  stats: [
    { key: "activeDossiers", value: 0 },
    { key: "unreadMessages", value: 0 },
    { key: "upcomingDeadlines", value: 0 },
  ],
  dossiers: [
    { id: "1", organization: "Acme Corporation", dossier: "ISO 27001", role: "Uploader", progress: 15 },
    { id: "2", organization: "Stark Industries", dossier: "VCA 201", role: "User", progress: 54 },
    { id: "3", organization: "Beta Solutions", dossier: "ISO 4500", role: "Reviewer", progress: 0 },
    { id: "4", organization: "Wayne Enterprises", dossier: "ISO 27001", role: "Uploader", progress: 23 },
    { id: "5", organization: "Google", dossier: "VCA 201", role: "Auditor", progress: 85 },
    { id: "6", organization: "Facebook", dossier: "ISO 27001", role: "Uploader", progress: 90 },
    { id: "7", organization: "Acme Corporation", dossier: "ISO 4500", role: "Auditor", progress: 100 },
    { id: "8", organization: "Wayne Enterprises", dossier: "VCA 201", role: "Reviewer", progress: 45 },
    { id: "9", organization: "Beta Solutions", dossier: "ISO 4500", role: "User", progress: 10 },
    { id: "10", organization: "Acme Corporation", dossier: "VCA 201", role: "Auditor", progress: 75 },
    { id: "11", organization: "Wayne Enterprises", dossier: "ISO 27001", role: "User", progress: 60 },
    { id: "12", organization: "Beta Solutions", dossier: "VCA", role: "Reviewer", progress: 30 },
    { id: "13", organization: "Beta Solutions", dossier: "VCA", role: "Auditor", progress: 100 },
  ],
};

const emptyData: DashboardData = {
  ...fullData,
  dossiers: [],
};

export async function fetchDashboardData(
  mode: DashboardDataMode,
): Promise<DashboardData> {
  await delay(450);
  return mode === "empty" ? emptyData : fullData;
}
