"use client";

import { Menu, MenuButton, MenuItem, MenuList, MenuPopover, MenuTrigger } from "@fluentui/react-components";
import { Globe24Regular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import type { Locale } from "@/i18n/translations";
import { useLocale } from "@/i18n/locale-context";

export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  const select = (next: Locale) => {
    setLocale(next);
  };

  return (
    <div className={className}>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button appearance="subtle" icon={<Globe24Regular />} size="small">
            {t.localeName[locale]}
          </Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem onClick={() => select("en")}>{t.localeName.en}</MenuItem>
            <MenuItem onClick={() => select("nl")}>{t.localeName.nl}</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
}
