"use client";

import { Text } from "@fluentui/react-components";

export function FydronLogo({ className }: { className?: string }) {
  return (
    <Text
      weight="bold"
      size={500}
      className={`text-primary ${className ?? ""}`.trim()}
      style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
    >
      Fydron
    </Text>
  );
}
