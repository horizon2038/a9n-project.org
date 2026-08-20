"use client";

import { useEffect, useRef, useState } from "react";
import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/site";

type CopyState = "idle" | "copied" | "failed";

export function CodeBlock({
  code,
  locale,
  output = false,
}: {
  code: string;
  locale: Locale;
  output?: boolean;
}) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = getTranslations(locale).codeBlock;

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyState("idle"), 1800);
  }

  const buttonLabel =
    copyState === "copied"
      ? t.copied
      : copyState === "failed"
        ? t.failed
        : t.copy;

  return (
    <div className={`code-block${output ? " code-output" : " code-block-copyable"}`}>
      {!output && (
        <button className="copy-button" type="button" onClick={copyCode}>
          {buttonLabel}
        </button>
      )}
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
