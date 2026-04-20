"use client";

import { Button, Text } from "@fluentui/react-components";
import { Dismiss24Regular, ErrorCircle24Filled } from "@fluentui/react-icons";

type Props = {
  title: string;
  body: string;
  onDismiss: () => void;
};

export function ErrorToast({ title, body, onDismiss }: Props) {
  return (
    <div
      className="fixed top-4 right-4 z-[100] flex w-[min(360px,calc(100vw-2rem))] gap-3 rounded border border-[#e0e0e0] bg-white p-3 shadow-md"
      role="alert"
    >
      <ErrorCircle24Filled className="mt-0.5 shrink-0 text-[#d13438]" />
      <div className="min-w-0 flex-1">
        <Text weight="semibold" block>
          {title}
        </Text>
        <Text size={200} className="text-[#605e5c]">
          {body}
        </Text>
      </div>
      <Button
        appearance="transparent"
        size="small"
        icon={<Dismiss24Regular />}
        aria-label="Dismiss"
        onClick={onDismiss}
        className="shrink-0"
      />
    </div>
  );
}
