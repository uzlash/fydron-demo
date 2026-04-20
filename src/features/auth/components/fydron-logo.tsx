"use client";

import { Text } from "@fluentui/react-components";

const brandColor = "#0078d4";

export function FydronLogo({ className }: { className?: string }) {
  return (
    <Text
      weight="bold"
      size={500}
      className={className}
      style={{ color: brandColor, fontSize: "1.5rem", letterSpacing: "-0.02em" }}
    >
      Fydron
    </Text>
  );
}
