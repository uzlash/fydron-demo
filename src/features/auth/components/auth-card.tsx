"use client";

import { Card } from "@fluentui/react-components";
import type { ReactNode } from "react";

export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <Card className="w-full border border-[#e1dfdd] shadow-sm">
      <div className="flex flex-col gap-5 p-8">{children}</div>
    </Card>
  );
}
