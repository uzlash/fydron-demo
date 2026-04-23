import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AuditorTurboViewScreen } from "@/features/client-portfolio/auditor-turbo-view-screen";
import { getClientTurboDossierData } from "@/features/client-portfolio/mock-data";

type PageProps = {
  params: Promise<{ clientId: string; dossierId: string }>;
};

function TurboLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background text-[13px] text-secondary">
      Loading…
    </div>
  );
}

export default async function AuditorTurboViewPage({ params }: PageProps) {
  const { clientId, dossierId } = await params;
  if (!getClientTurboDossierData(clientId, dossierId)) {
    notFound();
  }
  return (
    <Suspense fallback={<TurboLoading />}>
      <AuditorTurboViewScreen clientId={clientId} dossierId={dossierId} />
    </Suspense>
  );
}
