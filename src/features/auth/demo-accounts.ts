/**
 * Demo logins for the Fydron prototype. Password is the same for each account.
 *
 * | Name    | Email                 | Password           |
 * |---------|----------------------|--------------------|
 * | Michael | michael@fydron.demo  | FastStarter34#$    |
 * | Bram    | bram@fydron.demo     | FastStarter34#$    |
 */
export const DEMO_PASSWORD = "FastStarter34#$" as const;

export type DemoUser = {
  email: string;
  firstName: string;
  lastName: string;
};

const ACCOUNTS: readonly (DemoUser & { password: string })[] = [
  {
    email: "michael@fydron.demo",
    password: DEMO_PASSWORD,
    firstName: "Michael",
    lastName: "",
  },
  {
    email: "bram@fydron.demo",
    password: DEMO_PASSWORD,
    firstName: "Bram",
    lastName: "",
  },
];

export function matchDemoUser(
  email: string,
  password: string,
): DemoUser | null {
  const normalized = email.trim().toLowerCase();
  const row = ACCOUNTS.find(
    (a) => a.email === normalized && a.password === password,
  );
  if (!row) return null;
  return {
    email: row.email,
    firstName: row.firstName,
    lastName: row.lastName,
  };
}

export function demoDisplayName(user: DemoUser): string {
  const full = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return full || user.firstName;
}
