"use client";

import { Spinner } from "@fluentui/react-components";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useDemoSession } from "@/features/auth/demo-session-context";

const AUTH_PREFIX = "/auth";

function isAuthPath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === "/") return false;
  return pathname === AUTH_PREFIX || pathname.startsWith(`${AUTH_PREFIX}/`);
}

/**
 * Enforces demo session for app routes. Auth routes (and /) are open.
 * Redirects logged-in users away from the login page.
 */
export function DemoSessionGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready } = useDemoSession();
  const auth = isAuthPath(pathname);
  const isLogin = pathname === "/auth/login";

  useEffect(() => {
    if (!ready) return;
    if (user && isLogin) {
      router.replace("/dashboard");
    }
  }, [ready, user, isLogin, router]);

  useEffect(() => {
    if (!ready) return;
    if (auth) return;
    if (!user) {
      router.replace("/auth/login");
    }
  }, [ready, user, auth, router]);

  if (!ready && !auth) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-secondary">
        <Spinner size="small" label="Loading" />
      </div>
    );
  }

  if (ready && !user && !auth) {
    return null;
  }

  return <>{children}</>;
}
