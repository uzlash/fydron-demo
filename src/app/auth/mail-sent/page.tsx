"use client";

import { Text } from "@fluentui/react-components";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { useLocale } from "@/i18n/locale-context";

export default function MailSentPage() {
  const { t } = useLocale();

  return (
    <AuthShell>
      <AuthCard>
        <Text as="h1" size={500} weight="semibold" block>
          {t.mailSent.title}
        </Text>
        <Text size={300} className="text-secondary">
          {t.mailSent.body}
        </Text>
      </AuthCard>
    </AuthShell>
  );
}
