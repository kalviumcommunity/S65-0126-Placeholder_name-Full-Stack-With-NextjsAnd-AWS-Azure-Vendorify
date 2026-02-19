/**
 * DYNAMIC PAGE - SSR (Server-Side Rendering)
 * 
 * Rendering Strategy: Dynamic Rendering (SSR)
 * 
 * Why: The Dashboard displays real-time user data that changes frequently.
 * Using SSR ensures the page is rendered on-demand at request time with fresh data,
 * so every user gets up-to-date information.
 * 
 * When: Data is fetched on EVERY REQUEST (server-side, before the page loads).
 * No caching happens—fresh data every time.
 * 
 * Trade-off: Slightly slower response time due to server processing,
 * but guaranteed fresh data.
 * 
 * Use Case: Perfect for dashboards, user profiles, real-time metrics,
 * or any content that must be current.
 */

import Link from "next/link";

export const dynamic = 'force-dynamic'; // Force SSR—render every request
export const revalidate = 0; // No caching

async function getDashboardData() {
  // Fetch fresh user data on every request
  const res = await fetch('https://jsonplaceholder.typicode.com/users/1', {
    cache: 'no-store', // Never cache—always fetch fresh
  });

  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  return res.json();
}

export default async function DashboardPage() {
  const user = await getDashboardData();

  // Show current time to demonstrate SSR (changes on every refresh)
  const now = new Date().toLocaleTimeString();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>User Dashboard</h1>
      
      {/* 
        UI IMPROVEMENT: Enhanced banner styling for accessibility and readability.
        Uses darker background (#1e40af - dark blue) with light text for high contrast.
        Maintains visual distinction with bold border while ensuring WCAG compliance.
        SSR rendering logic unchanged.
      */}
      <div style={{ background: '#1e40af', color: '#ffffff', padding: '1rem', borderLeft: '4px solid #fbbf24', marginBottom: '1rem', borderRadius: '4px' }}>
        <p style={{ margin: '0 0 0.5rem 0' }}><strong>⚡ This page is dynamically rendered (SSR)</strong></p>
        <p style={{ fontSize: '0.9rem', margin: 0, color: '#e5e7eb' }}>
          Rendered fresh on EVERY request with real-time data.
        </p>
      </div>

      <h2>User Info</h2>
      <ul>
        <li><strong>Name:</strong> {user.name}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Phone:</strong> {user.phone}</li>
        <li><strong>Company:</strong> {user.company.name}</li>
      </ul>

      <h2>Server Time</h2>
      <p style={{ fontSize: '1.5rem', fontFamily: 'monospace' }}>{now}</p>
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        ✓ Refresh the page to see this timestamp change!
      </p>

      {/* UI IMPROVEMENT: High-contrast styling for end-of-page info box */}
      <div style={{ background: '#3730a3', color: '#ffffff', padding: '1rem', marginTop: '1rem', borderRadius: '4px', borderLeft: '4px solid #a78bfa' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#e9d5ff' }}>
          <strong>Technical Details:</strong> This page uses &apos;dynamic = &apos;force-dynamic&apos;&apos; 
          and &apos;cache: &apos;no-store&apos;&apos; to bypass all Next.js caching.
        </p>
      </div>

      <nav style={{ marginTop: '2rem' }}>
        <Link href="/">← Home</Link> | <Link href="/about">About (SSG)</Link> | <Link href="/vendors">Vendors (ISR) →</Link>
      </nav>
    </div>
  );
}
