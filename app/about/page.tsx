import Link from 'next/link';

export const revalidate = false; // SSG -- built once at deploy time

const TECH_STACK = [
  { name: 'Next.js 13+', desc: 'App Router, SSR & SSG', icon: '\u25b2' },
  { name: 'TypeScript', desc: 'Type-safe throughout', icon: 'TS' },
  { name: 'PostgreSQL', desc: 'Relational database', icon: 'PG' },
  { name: 'Prisma ORM', desc: 'Type-safe DB queries', icon: '\u25c8' },
  { name: 'TailwindCSS', desc: 'Utility-first styling', icon: 'TW' },
  { name: 'JWT + bcrypt', desc: 'Secure authentication', icon: '\u26f7' },
];

const FEATURES = [
  {
    title: 'Digital Onboarding',
    desc: 'Replace paper forms with a clean digital process. Vendors submit applications online in minutes.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: 'Certificate Uploads',
    desc: 'Vendors upload their license images directly. Documents are stored securely and linked to their profile.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    title: 'Application Tracking',
    desc: 'Real-time status updates: Pending, Approved, or Rejected -- visible on the vendor dashboard.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: 'Secure Authentication',
    desc: 'bcrypt-hashed passwords and JWT-based sessions. Routes are proxy-protected across the stack.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">

      {/* Navbar */}
      <nav className="border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-sm font-bold text-white">V</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Vendorify</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Home</Link>
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-blue-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300">
            About the project
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Digitising Railway<br />Vendor Verification
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Vendorify replaces the slow, paper-heavy process of railway stall licensing with a
            fast, transparent, fully digital platform -- from application to certificate upload.
          </p>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-red-500">The Problem</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Paper-based systems are holding vendors back</h2>
            <ul className="mt-6 space-y-4 text-slate-600">
              {[
                'License renewals require repeated physical visits to railway offices.',
                'Paper records are easily lost, damaged, or tampered with.',
                'No real-time visibility into application status.',
                'Manual verification is slow and error-prone.',
              ].map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs text-red-600">
                    x
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-green-600">Our Solution</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Vendorify makes it instant &amp; transparent</h2>
            <ul className="mt-6 space-y-4 text-slate-600">
              {[
                'Online signup and application from any device.',
                'Upload license certificates as images directly in-app.',
                'Dashboard shows live application status at a glance.',
                'JWT-protected routes keep vendor data secure.',
              ].map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-600">
                    v
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Features</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Everything a vendor needs</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Tech Stack</span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Built with modern web technologies</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {TECH_STACK.map((t) => (
            <div key={t.name} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
                {t.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-4 text-blue-100">
            Create a free account, submit your application, and upload your documents -- all in under 5 minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/login?tab=signup"
              className="rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow transition-all hover:bg-blue-50"
            >
              Create free account
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white px-6 py-8 text-center text-xs text-slate-400">
        &copy; 2026 Vendorify &middot; Built for AMOGAS Sprint 2.15
      </footer>
    </div>
  );
}
