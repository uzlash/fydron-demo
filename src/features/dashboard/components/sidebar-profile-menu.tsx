"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Avatar, Popover, PopoverSurface, PopoverTrigger, Text } from "@fluentui/react-components";
import {
  ChevronRight20Regular,
  Database20Regular,
  Headphones20Regular,
  Settings20Regular,
  SignOut20Regular,
  WeatherSunny20Regular,
} from "@fluentui/react-icons";
import { useDemoSession } from "@/features/auth/demo-session-context";
import { useLocale } from "@/i18n/locale-context";

type MenuRowProps = {
  icon: ReactNode;
  label: string;
  destructive?: boolean;
  href?: string;
  onClick?: () => void;
  onNavigate?: () => void;
};

function MenuRow({ icon, label, destructive, href, onClick, onNavigate }: MenuRowProps) {
  const className = `flex w-full items-center gap-4 rounded-[12px] px-4 py-3 text-left text-[16px] font-medium transition-colors hover:bg-surface-muted ${
    destructive ? "text-danger" : "text-foreground"
  }`;

  const inner = (
    <>
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center ${destructive ? "text-danger" : "text-secondary"}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">{label}</span>
      <ChevronRight20Regular className="h-5 w-5 shrink-0 text-muted" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} onClick={onNavigate}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {inner}
    </button>
  );
}

type SidebarProfileMenuProps = {
  name: string;
  email: string;
};

export function SidebarProfileMenu({ name, email }: SidebarProfileMenuProps) {
  const { t } = useLocale();
  const { signOut } = useDemoSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  return (
    <Popover
      open={open}
      onOpenChange={(_, data) => setOpen(data.open)}
      positioning={{ position: "after", align: "start", offset: { mainAxis: 10, crossAxis: 0 } }}
    >
      <PopoverTrigger disableButtonEnhancement>
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-[10px] rounded-lg border border-transparent px-1 py-1 text-left outline-none transition-colors hover:bg-border-soft focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
        >
          <Avatar name={name} color="colorful" size={32} />
          <div className="min-w-0 flex flex-1 flex-col justify-center gap-[2px]">
            <Text size={300} block className="text-[13px] font-semibold text-foreground leading-tight">
              {name}
            </Text>
            <Text size={200} block className="truncate text-[11px] text-secondary leading-tight">
              {email}
            </Text>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverSurface className="rounded-[24px] border border-border bg-surface p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <nav className="flex min-w-[280px] flex-col gap-1" aria-label={t.settings.userMenu.ariaLabel}>
          <MenuRow
            icon={<Settings20Regular />}
            label={t.settings.userMenu.settings}
            href="/settings"
            onNavigate={close}
          />
          <MenuRow
            icon={<WeatherSunny20Regular />}
            label={t.settings.userMenu.appearance}
            onClick={() => {
              close();
            }}
          />
          <MenuRow
            icon={<Database20Regular />}
            label={t.settings.userMenu.dataManagement}
            onClick={() => {
              close();
            }}
          />
          <MenuRow
            icon={<Headphones20Regular />}
            label={t.settings.userMenu.support}
            href="/settings/support"
            onNavigate={close}
          />
          <MenuRow
            icon={<SignOut20Regular />}
            label={t.settings.userMenu.logout}
            destructive
            onClick={() => {
              close();
              signOut();
              router.push("/auth/login");
            }}
          />
        </nav>
      </PopoverSurface>
    </Popover>
  );
}
