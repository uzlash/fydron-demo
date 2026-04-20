"use client";

import { Button, Spinner, Text } from "@fluentui/react-components";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthCard } from "@/features/auth/components/auth-card";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { ErrorToast } from "@/features/auth/components/error-toast";
import { LegalFooter } from "@/features/auth/components/legal-footer";
import { PasswordInput } from "@/features/auth/components/password-input";
import { useLocale } from "@/i18n/locale-context";
import { meetsPasswordRequirements } from "@/utils/helpers";

export function CreatePasswordForm() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mismatchPreview = searchParams.get("mismatch") === "1";

  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [showError, setShowError] = useState(mismatchPreview);
  const [showToast, setShowToast] = useState(mismatchPreview);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowError(mismatchPreview);
    setShowToast(mismatchPreview);
  }, [mismatchPreview]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (a !== b || !meetsPasswordRequirements(a)) {
      setShowError(true);
      setShowToast(true);
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      router.push("/auth/password-success");
    }, 1500);
  };

  return (
    <AuthShell footer={<LegalFooter />}>
      {showToast ? (
        <ErrorToast
          title={t.toast.passwordMismatchTitle}
          body={t.toast.passwordMismatchBody}
          onDismiss={() => setShowToast(false)}
        />
      ) : null}
      <AuthCard>
        <Text as="h1" size={500} weight="semibold" block>
          {t.createPassword.title}
        </Text>
        <Text size={300} className="text-[#605e5c]">
          {t.createPassword.subtitle}
        </Text>
        <form className="flex flex-col gap-4" onSubmit={submit}>
          <PasswordInput
            label={t.createPassword.newPassword}
            value={a}
            onChange={setA}
            validationState={showError ? "error" : "none"}
            placeholder={t.createPassword.placeholder}
          />
          <PasswordInput
            label={t.createPassword.confirmPassword}
            value={b}
            onChange={setB}
            validationState={showError ? "error" : "none"}
            placeholder={t.createPassword.placeholder}
          />
          <div>
            <Text size={200} weight="semibold" block className="mb-1">
              {t.createPassword.requirementsTitle}
            </Text>
            <ul className="list-disc pl-5 text-sm text-[#605e5c]">
              <li>{t.createPassword.req1}</li>
              <li>{t.createPassword.req2}</li>
              <li>{t.createPassword.req3}</li>
              <li>{t.createPassword.req4}</li>
            </ul>
          </div>
          <Button
            appearance="primary"
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? <Spinner size="tiny" className="text-white" /> : t.createPassword.submit}
          </Button>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
