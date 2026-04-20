export type DashboardRole = "Uploader" | "User" | "Reviewer" | "Auditor";

export type DashboardStatKey =
  | "activeDossiers"
  | "unreadMessages"
  | "upcomingDeadlines";

export type DashboardStat = {
  key: DashboardStatKey;
  value: number;
};

export type DossierRow = {
  id: string;
  organization: string;
  dossier: string;
  role: DashboardRole;
  progress: number;
};

export type DashboardData = {
  greetingName: string;
  stats: DashboardStat[];
  dossiers: DossierRow[];
};

export type DashboardDataMode = "full" | "empty";