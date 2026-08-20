import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { getTranslations } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/site";

const checkoutSshCommand = `git clone --recurse-submodules \\
  git@github.com:horizon2038/spencer.git spencer
cd spencer
git submodule status`;

const checkoutHttpsCommand = `git -c url."https://github.com/".insteadOf=git@github.com: \\
  clone --recurse-submodules \\
  https://github.com/horizon2038/spencer.git spencer
cd spencer
git submodule status`;

const buildCommand = `cargo xtask build \\
  --arch x86-64 \\
  --platform qemu \\
  --release`;

const runCommand = `cargo xtask run \\
  --arch x86-64 \\
  --platform qemu \\
  --release`;

const expectedOutput = `Nun - an operating system framework based on the A9N Microkernel
Configuring <init> ...
Configuring Initial IPC buffer to thread local storage...
Hello, world!
version: <kernel version>`;

export function GettingStartedPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale).gettingStarted;

  return (
    <main className="page-main document-page">
      <header className="page-header">
        <div>
          <p className="page-section-name">Getting Started</p>
          <h1>{t.title}</h1>
          <p>{t.introduction}</p>
        </div>
      </header>

      <aside className="status-note">
        <strong>{t.targetLabel}</strong>
        <span>{t.target}</span>
      </aside>

      <section className="document-section">
        <h2>{t.requirementsTitle}</h2>
        <ul>
          {t.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
        </ul>
        <p>{t.requirementsNote}</p>
      </section>

      <section className="document-section">
        <h2>{t.checkoutTitle}</h2>
        <p>{t.sshIntroduction}</p>
        <CodeBlock code={checkoutSshCommand} locale={locale} />
        <p>{t.httpsIntroduction}</p>
        <CodeBlock code={checkoutHttpsCommand} locale={locale} />
      </section>

      <section className="document-section">
        <h2>{t.buildTitle}</h2>
        <CodeBlock code={buildCommand} locale={locale} />
        <p>{t.buildDescription}</p>
        <div className="artifact-table">
          <div><span>Kernel</span><code>out/x86_64-qemu-release/a9n/kernel.elf</code></div>
          <div><span>Loader</span><code>out/x86_64-qemu-release/a9nloader/a9nloader-rs.efi</code></div>
          <div><span>Disk Image</span><code>out/x86_64-qemu-release/spencer.img</code></div>
        </div>
      </section>

      <section className="document-section">
        <h2>{t.runTitle}</h2>
        <CodeBlock code={runCommand} locale={locale} />
        <p>{t.outputIntroduction}</p>
        <CodeBlock code={expectedOutput} locale={locale} output />
      </section>

      <nav className="next-links">
        <Link href={localePath(locale, "/documents")}>
          {t.documentsLink} →
        </Link>
        <a href="https://github.com/horizon2038/spencer" target="_blank" rel="noreferrer">
          SPENCER Repository ↗
        </a>
      </nav>
    </main>
  );
}
