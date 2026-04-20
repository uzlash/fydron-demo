"use client";

import { Button, Field, Input, Text } from "@fluentui/react-components";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { ErrorToast } from "@/features/auth/components/error-toast";
import { LegalFooter } from "@/features/auth/components/legal-footer";
import { PasswordInput } from "@/features/auth/components/password-input";
import { useLocale } from "@/i18n/locale-context";

export function LoginForm() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(errorParam);
  const [showToast, setShowToast] = useState(errorParam);

  useEffect(() => {
    setShowError(errorParam);
    setShowToast(errorParam);
  }, [errorParam]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setShowError(true);
      setShowToast(true);
      return;
    }
    router.push("/auth/create-password");
  };

  return (
    <AuthShell footer={<LegalFooter />}>
      {showToast ? (
        <ErrorToast
          title={t.toast.loginErrorTitle}
          body={t.toast.loginErrorBody}
          onDismiss={() => setShowToast(false)}
        />
      ) : null}
      <AuthCard>
        <Text as="h1" size={500} weight="semibold" block>
          {t.login.title}
        </Text>
        <Text size={300} className="text-secondary">
          {t.login.subtitle}
        </Text>
        <form className="flex flex-col gap-4" onSubmit={submit}>
          <Field
            label={t.login.email}
            validationState={showError ? "error" : "none"}
          >
            <Input
              type="email"
              placeholder={t.login.emailPlaceholder}
              value={email}
              onChange={(_, d) => setEmail(d.value)}
            />
          </Field>
          <PasswordInput
            label={
              <Text size={200} weight="semibold">
                {t.login.password}
              </Text>
            }
            labelEndSlot={
              <Link
                href="/auth/forgot-password"
                className="shrink-0 text-sm text-primary underline"
              >
                {t.login.forgotPassword}
              </Link>
            }
            value={password}
            onChange={setPassword}
            validationState={showError ? "error" : "none"}
          />
          <Button appearance="primary" type="submit" className="w-full">
            {t.login.submit}
          </Button>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
