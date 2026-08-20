"use client";

import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export function MobileMenu({ children, label }: { children: ReactNode; label: string }) {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (detailsRef.current) detailsRef.current.open = false;
  }, [pathname]);

  function closeWithEscape(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== "Escape" || !detailsRef.current?.open) return;
    detailsRef.current.open = false;
    summaryRef.current?.focus();
  }

  return (
    <details className="mobile-menu" ref={detailsRef} onKeyDown={closeWithEscape}>
      <summary className="mobile-menu-summary" ref={summaryRef} aria-label={label}>
        <span className="hamburger-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </summary>
      <div className="mobile-menu-panel">
        <div className="mobile-menu-inner">{children}</div>
      </div>
    </details>
  );
}
