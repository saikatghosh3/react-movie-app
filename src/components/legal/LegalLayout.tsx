import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Mail } from 'lucide-react';
import { Header } from '../Header';
import { ScrollToTop } from '../ScrollToTop';
import { LEGAL_DOCS, LEGAL_LAST_UPDATED, SUPPORT_EMAIL, type LegalDocKey } from '../../config/legal';

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  sections: LegalSection[];
  active: LegalDocKey;
}

export const ProseP = ({ children }: { children: ReactNode }) => (
  <p className="text-gray-300 leading-relaxed">{children}</p>
);

export const ProseH3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-base font-semibold text-white pt-2">{children}</h3>
);

export const ProseUL = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc pl-5 space-y-2 text-gray-300 leading-relaxed marker:text-red-500/70">
    {children}
  </ul>
);

export const ExtLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-red-400 hover:text-red-300 underline underline-offset-2 decoration-red-500/40 hover:decoration-red-400 transition-colors break-words"
  >
    {children}
  </a>
);

export const DocLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    to={to}
    className="text-red-400 hover:text-red-300 underline underline-offset-2 decoration-red-500/40 hover:decoration-red-400 transition-colors"
  >
    {children}
  </Link>
);

export const LegalLayout = ({ title, subtitle, sections, active }: LegalLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="relative">
        <div className="absolute top-0 left-0 right-0 h-[420px] bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />

        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold uppercase tracking-wide">
              Legal
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {title}
            </h1>
            <p className="mt-4 text-gray-400 text-base sm:text-lg leading-relaxed">{subtitle}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="w-4 h-4" />
              Last updated: {LEGAL_LAST_UPDATED}
            </p>
          </div>

          <nav aria-label="Legal documents" className="mt-8 flex flex-wrap gap-2.5">
            {LEGAL_DOCS.map((doc) => {
              const isActive = doc.key === active;
              return (
                <Link
                  key={doc.key}
                  to={doc.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    isActive
                      ? 'bg-red-600 text-white border-red-500/40 shadow-lg shadow-red-500/20'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border-white/5'
                  }`}
                >
                  {doc.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 lg:mt-14 grid lg:grid-cols-[260px_minmax(0,1fr)] gap-10">
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-24">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-3">
                  On this page
                </p>
                <ol className="space-y-0.5 border-l border-white/10">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block pl-4 -ml-px py-1.5 text-sm text-gray-400 hover:text-white border-l border-transparent hover:border-red-500 transition-colors"
                      >
                        {index + 1}. {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <article className="min-w-0 space-y-8">
              <details className="lg:hidden rounded-2xl bg-white/[0.03] border border-white/5 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-white select-none">
                  On this page
                </summary>
                <ol className="mt-3 space-y-1.5 list-decimal list-inside">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="text-sm text-gray-400 hover:text-white">
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>

              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{section.title}</h2>
                  <div className="space-y-3">{section.content}</div>
                </section>
              ))}

              <section className="rounded-2xl bg-white/[0.03] border border-white/5 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-red-600 shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Questions or requests?</h2>
                    <p className="mt-1 text-gray-400 text-sm leading-relaxed">
                      Email us at{' '}
                      <ExtLink href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</ExtLink> and we will
                      respond within a reasonable timeframe.
                    </p>
                  </div>
                </div>
              </section>

              <p className="text-xs text-gray-500">
                This document is provided for general informational purposes and does not constitute
                legal advice. Consult a qualified professional for advice specific to your situation.
              </p>
            </article>
          </div>
        </div>
      </main>

      <ScrollToTop />
    </div>
  );
};
