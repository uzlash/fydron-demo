"use client";

import {
  Button,
  Field,
  Input,
  Spinner,
  Text,
} from "@fluentui/react-components";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { LegalFooter } from "@/features/auth/components/legal-footer";
import { useLocale } from "@/i18n/locale-context";

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export default function ForgotPasswordPage() {
  const { t } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");

  const submitMutation = useMutation({
    mutationFn: async () => {
      await delay(1600);
    },
    onSuccess: () => {
      router.push("/auth/mail-sent");
    },
  });

  return (
    <AuthShell footer={<LegalFooter />}>
      <AuthCard>
        <Text as="h1" size={500} weight="semibold" block>
          {t.forgot.title}
        </Text>
        <Text size={300} className="text-secondary">
          {t.forgot.subtitle}
        </Text>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            submitMutation.mutate();
          }}
        >
          <Field label={t.forgot.email}>
            <Input
              type="email"
              placeholder={t.forgot.emailPlaceholder}
              value={email}
              onChange={(_, d) => setEmail(d.value)}
            />
          </Field>
          <Text size={200} className="text-secondary">
            {t.forgot.hint}
          </Text>
          <Button
            appearance="primary"
            type="submit"
            className="w-full"
            disabled={submitMutation.isPending}
          >
            {submitMutation.isPending ? (
              <Spinner size="tiny" className="text-primary-foreground" />
            ) : (
              t.forgot.submit
            )}
          </Button>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
