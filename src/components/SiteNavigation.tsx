"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { getNavigation } from "@/lib/site";

export function SiteNavigation({ className, items, label }: {
  className: string;
  items: ReturnType<typeof getNavigation>;
  label: string;
}) {
  const pathname = usePathname().replace(/\/$/, "");

  return (
    <nav className={className} aria-label={label}>
      {items.map((item) => {
        const href = item.href.replace(/\/$/, "");
        return (
          <Link
            href={item.href}
            key={item.href}
            aria-current={pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
