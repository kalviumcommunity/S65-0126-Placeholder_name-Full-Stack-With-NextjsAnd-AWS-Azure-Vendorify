import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { verifyToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { LogoutButton } from '@/src/components/LogoutButton';

// Server component — reads cookie and DB directly
export const dynamic = 'force-dynamic';

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('vendorify_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    Approved: 'bg-green-50 text-green-700 ring-green-600/20',
    Rejected: 'bg-red-50 text-red-700 ring-red-600/20',
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
        styles[status] ?? 'bg-slate-50 text-slate-700 ring-slate-600/20'
      }`}
    >
      {status}
    </span>
  );
}

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login');

  const [applications, documents] = await Promise.all([
    prisma.vendorApplication.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.document.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'Pending').length,
    approved: applications.filter((a) => a.status === 'Approved').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-sm font-bold text-white">V</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Vendorify</span>
          </Link>

          <nav className="hidden items-center gap-6 sm:flex">
            <Link href="/vendors/new" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              New Application
            </Link>
            <Link href="/dashboard/upload" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              Upload Doc
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-10 space-y-10">

        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user.name.split(' ')[0]} ���
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your railway stall vendor applications and uploaded certificates.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {[
            { label: 'Total Applications', value: stats.total, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Pending Review', value: stats.pending, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Approved', value: stats.approved, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Documents', value: documents.length, color: 'text-violet-600', bg: 'bg-violet-50' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
              <div className={`mt-2 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-extrabold ${s.bg} ${s.color}`}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Vendor Applications ───────────────────────────────────────── */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-900">Vendor Applications</h2>
            <Link
              href="/vendors/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              New Application
            </Link>
          </div>

          {applications.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">No applications yet</h3>
              <p className="mt-2 text-sm text-slate-500">Submit your first application to get your stall verified.</p>
              <Link
                href="/vendors/new"
                className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                Apply now
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {['Vendor Name', 'Stall Type', 'License Number', 'Status', 'Applied'].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900">{app.vendorName}</td>
                      <td className="px-6 py-4 text-slate-600">{app.stallType}</td>
                      <td className="px-6 py-4 font-mono text-slate-600">{app.licenseNumber}</td>
                      <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(app.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Uploaded Documents ────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="text-base font-semibold text-slate-900">Uploaded Documents</h2>
            <Link
              href="/dashboard/upload"
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              Upload New
            </Link>
          </div>

          {documents.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">No documents uploaded</h3>
              <p className="mt-2 text-sm text-slate-500">Upload your vendor license or certificate images here.</p>
              <Link
                href="/dashboard/upload"
                className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
              >
                Upload now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-4">
              {documents.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <Image
                      src={doc.fileUrl}
                      alt={doc.fileName}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-xs font-medium text-slate-700">{doc.fileName}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {new Date(doc.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
