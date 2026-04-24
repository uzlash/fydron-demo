/**
 * Demo logins for the Fydron prototype — only these two users; shared simple password.
 *
 * | Name    | Email                 | Password |
 * |---------|----------------------|----------|
 * | Michael | michael@fydron.demo  | demo123  |
 * | Bram    | bram@fydron.demo     | demo123  |
 */
export const DEMO_PASSWORD = "demo123" as const;

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

/** Strip ZW* / BOM from pastes; trim. */
function normalizeInput(value: string): string {
  return value
    .replace(/[\u200B-\u200D\uFEFF\u2060\u00AD]/g, "")
    .trim();
}

function demoPasswordsMatch(entered: string, expected: string): boolean {
  const a = normalizeInput(entered).normalize("NFKC");
  const b = expected.normalize("NFKC");
  return a.toLowerCase() === b.toLowerCase();
}

export function matchDemoUser(
  email: string,
  password: string,
): DemoUser | null {
  const normalized = normalizeInput(email).toLowerCase();
  const row = ACCOUNTS.find(
    (a) => a.email === normalized && demoPasswordsMatch(password, a.password),
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
