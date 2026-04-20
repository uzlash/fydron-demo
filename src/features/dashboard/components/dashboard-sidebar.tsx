"use client";


import type { ReactNode } from "react";
import { Avatar, Text } from "@fluentui/react-components";

import {
  Board20Regular,
  GridDots20Regular,
  ChatMultiple20Regular,
  Folder20Regular,
  ContactCard20Regular,
  Payment20Regular,
  Cloud20Regular,
  Sparkle20Regular,
} from "@fluentui/react-icons";
import { FydronLogo } from "@/features/auth/components/fydron-logo";
import { useLocale } from "@/i18n/locale-context";

type NavItem = {
  label: string;
  icon: ReactNode;
  active?: boolean;
  disabled?: boolean;
  alertCount?: number;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

function NavRow({ item }: { item: NavItem }) {
  return (
    <div
      className={`group relative flex h-9 cursor-pointer items-center justify-between pl-[24px] pr-[16px] ${
        item.active
          ? "bg-white text-[#242424] font-semibold"
          : item.disabled
            ? "text-[#a19f9d]"
            : "text-[#323130] hover:bg-[#edebe9]"
      }`}
    >
      {item.active && (
        <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 bg-[#0078d4]" />
      )}
      
      <div className="flex min-w-0 items-center gap-[12px]">
        <span className={`w-4 text-center font-mono text-[16px] leading-none ${item.active ? "text-[#0078d4]" : "text-[#605e5c]"}`}>
          {item.icon}
        </span>
        <span className="truncate text-[13px] pb-[1px]">{item.label}</span>
      </div>
      
      {item.alertCount ? (
        <span className="inline-flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#d13438] px-1 text-[10px] font-bold text-white">
          {item.alertCount}
        </span>
      ) : null}
    </div>
  );
}

export function DashboardSidebar() {
  const { t } = useLocale();

  const groups: NavGroup[] = [
    {
      title: t.dashboard.sections.platform,
      items: [
        { label: t.dashboard.nav.dashboard, icon: <Board20Regular />, active: true },
        { label: t.dashboard.nav.matrix, icon: <GridDots20Regular /> },
        { label: t.dashboard.nav.globalMessages, icon: <ChatMultiple20Regular />, alertCount: 1 },
        { label: t.dashboard.nav.clientPortfolio, icon: <Folder20Regular /> },
        { label: t.dashboard.nav.partnerAssets, icon: <ContactCard20Regular /> },
      ],
    },
    {
      title: t.dashboard.sections.payments,
      items: [{ label: t.dashboard.nav.billingSubscription, icon: <Payment20Regular /> }],
    },
    {
      title: t.dashboard.sections.other,
      items: [
        { label: t.dashboard.nav.hrVault, icon: <Cloud20Regular />, disabled: true },
        { label: t.dashboard.nav.insights, icon: <Sparkle20Regular />, disabled: true },
      ],
    },
  ];

  return (
    <aside className="flex h-full w-[240px] flex-col border-none bg-[#f3f2f1]">
      <div className="px-6 py-[22px]">
        <FydronLogo className="text-[30px]" />
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto mt-2">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col">
            <Text size={200} className="mb-[6px] px-6 text-[10px] text-[#a19f9d] uppercase tracking-wide">
              {group.title}
            </Text>
            <div className="flex flex-col gap-[2px]">
              {group.items.map((item) => (
                <NavRow key={item.label} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto px-[24px] py-[24px]">
        <div className="flex items-center gap-[10px]">
          <Avatar name="Mary Jane" color="colorful" size={32} />
          <div className="min-w-0 flex flex-col justify-center gap-[2px]">
            <Text size={300} block className="text-[13px] font-semibold text-[#242424] leading-tight">
              {t.dashboard.profile.name}
            </Text>
            <Text size={200} block className="truncate text-[11px] text-[#605e5c] leading-tight">
              {t.dashboard.profile.email}
            </Text>
          </div>
        </div>
      </div>
    </aside>
  );
}
