import Link from 'next/link';

// ─── Inline SVG icons — no external deps ──────────────────────────────────────
function ShieldIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286Z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  );
}

const features = [
  {
    icon: <ShieldIcon />,
    title: 'Digital Verification',
    description:
      'Instantly verify vendor licenses online. Inspectors approve or reject applications from a single dashboard — no paper needed.',
    accent: 'bg-blue-600',
    card: 'bg-blue-50 border-blue-100',
    text: 'text-blue-600',
  },
  {
    icon: <ClockIcon />,
    title: 'Fast Approvals',
    description:
      'Cut processing from weeks to hours. Vendors submit once and track their application status in real time.',
    accent: 'bg-indigo-600',
    card: 'bg-indigo-50 border-indigo-100',
    text: 'text-indigo-600',
  },
  {
    icon: <ChartIcon />,
    title: 'Compliance Tracking',
    description:
      'Monitor renewal deadlines and compliance across all vendors with automated alerts and full audit trails.',
    accent: 'bg-violet-600',
    card: 'bg-violet-50 border-violet-100',
    text: 'text-violet-600',
  },
];

const steps = [
  { num: '01', title: 'Register', desc: 'Create your vendor account in under two minutes.' },
  { num: '02', title: 'Apply', desc: 'Submit your stall details and license information digitally.' },
  { num: '03', title: 'Get Verified', desc: 'Receive your digital approval and start operating legally.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm">
              <span className="text-sm font-bold text-white">V</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Vendorify</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-slate-400 transition-colors hover:text-white">Features</a>
            <a href="#how-it-works" className="text-sm text-slate-400 transition-colors hover:text-white">How it works</a>
            <Link href="/about" className="text-sm text-slate-400 transition-colors hover:text-white">About</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-300 transition-colors hover:text-white">Sign in</Link>
            <Link
              href="/login?tab=signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 pb-24 pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Digital Vendor Compliance Platform
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Modernise Railway{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Vendor Licensing
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Say goodbye to paper-based renewals. Vendorify brings railway stall vendors online —
            enabling faster approvals, real-time compliance, and a permanent digital record for
            every license.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/login?tab=signup"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Start for free
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center rounded-xl border border-slate-600 px-8 text-base font-medium text-slate-300 transition-all hover:border-slate-500 hover:bg-slate-800"
            >
              Sign in to dashboard
            </Link>
          </div>

          <div className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-8 border-t border-slate-700/60 pt-12">
            {[
              { value: '10x', label: 'Faster approvals' },
              { value: '100%', label: 'Digital process' },
              { value: '0', label: 'Paperwork required' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-white">{s.value}</div>
                <div className="mt-1 text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section id="features" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-slate-900">Everything you need</h2>
            <p className="mt-4 text-lg text-slate-500">One platform to manage vendor compliance from application to renewal.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className={`rounded-2xl border ${f.card} p-8 transition-all hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className={`mb-5 inline-flex rounded-xl bg-white p-3 shadow-sm ${f.text}`}>{f.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-slate-900">Up and running in minutes</h2>
            <p className="mt-4 text-lg text-slate-500">Three simple steps to digitise your vendor compliance.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
                  <span className="text-2xl font-extrabold text-white">{s.num}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/login?tab=signup"
              className="inline-flex h-12 items-center rounded-xl bg-slate-900 px-8 text-base font-semibold text-white transition-colors hover:bg-slate-700"
            >
              Create your account
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600">
              <span className="text-xs font-bold text-white">V</span>
            </div>
            <span className="text-sm font-semibold text-slate-800">Vendorify</span>
          </div>
          <p className="text-sm text-slate-400">© 2026 Vendorify. Built for the Digital India initiative.</p>
          <div className="flex gap-6">
            <Link href="/about" className="text-sm text-slate-500 transition-colors hover:text-slate-800">About</Link>
            <Link href="/login" className="text-sm text-slate-500 transition-colors hover:text-slate-800">Login</Link>
            <Link href="/login?tab=signup" className="text-sm text-slate-500 transition-colors hover:text-slate-800">Register</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
