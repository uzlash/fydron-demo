"use client";

import { Text } from "@fluentui/react-components";
import NextLink from "next/link";
import { useLocale } from "@/i18n/locale-context";

export function LegalFooter() {
  const { t } = useLocale();
  return (
    <Text size={200} className="max-w-md text-center text-[#605e5c]">
      {t.common.termsLead}{" "}
      <NextLink href="#" className="text-[#0078d4] underline">
        {t.common.terms}
      </NextLink>{" "}
      {t.common.and}{" "}
      <NextLink href="#" className="text-[#0078d4] underline">
        {t.common.privacy}
      </NextLink>
      .
    </Text>
  );
}
