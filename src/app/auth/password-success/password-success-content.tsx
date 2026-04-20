"use client";

import { Button, Text } from "@fluentui/react-components";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { LegalFooter } from "@/features/auth/components/legal-footer";
import { useLocale } from "@/i18n/locale-context";

export function PasswordSuccessContent() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dark = searchParams.get("theme") === "dark";

  const inner = (
    <AuthCard>
      <Text as="h1" size={500} weight="semibold" block>
        {t.passwordSuccess.title}
      </Text>
      <Text size={300} className="text-[#605e5c]">
        {t.passwordSuccess.body}
      </Text>
      <Button
        appearance="primary"
        className="w-full"
        onClick={() => router.push("/auth/mfa")}
      >
        {t.passwordSuccess.continueCta}
      </Button>
    </AuthCard>
  );

  if (dark) {
    return (
      <AuthShell bg="black" footer={null}>
        {inner}
      </AuthShell>
    );
  }

  return <AuthShell footer={<LegalFooter />}>{inner}</AuthShell>;
}
