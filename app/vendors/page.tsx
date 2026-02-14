/**
 * HYBRID PAGE - ISR (Incremental Static Regeneration)
 * 
 * Rendering Strategy: Hybrid Rendering (ISR)
 * 
 * Why: The Vendors page lists third-party vendors that update occasionally,
 * but don't need real-time updates. ISR is the "best of both worlds":
 * users get fast cached pages, but the cache refreshes in the background.
 * 
 * When:
 * - First request: page is built and cached
 * - Subsequent requests: served from cache (instant)
 * - Every 60 seconds: page is re-rendered in the background if accessed
 * 
 * How: Uses "stale-while-revalidate" pattern. Serves old cached version 
 * immediately while rebuilding in the background for the next user.
 * 
 * Use Case: Perfect for vendor lists, product catalogs, pricing pages,
 * or any content that updates occasionally.
 */

import Link from "next/link";

interface Vendor {
  id: number;
  name: string;
  email: string;
  website: string;
}

export const revalidate = 60; // Re-render page every 60 seconds
export const dynamic = 'auto'; // Allow ISR (default behavior)

async function getVendorsData() {
  // Fetch vendor list from public API
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { revalidate: 60 }, // Alternative: set revalidation per-fetch
  });

  if (!res.ok) {
    throw new Error('Failed to fetch vendors');
  }

  const users = await res.json();
  return users.slice(0, 5); // Return first 5 vendors for simplicity
}

export default async function VendorsPage() {
  const vendors = await getVendorsData();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Vendor Directory</h1>
      
      {/* 
        UI IMPROVEMENT: Enhanced banner styling for accessibility and readability.
        Uses darker background (#0c4a6e - dark cyan) with light text for high contrast.
        Maintains visual distinction with bold border while ensuring WCAG compliance.
        ISR rendering logic unchanged.
      */}
      <div style={{ background: '#0c4a6e', color: '#ffffff', padding: '1rem', borderLeft: '4px solid #22d3ee', marginBottom: '1rem', borderRadius: '4px' }}>
        <p style={{ margin: '0 0 0.5rem 0' }}><strong>🔄 This page uses ISR (Incremental Static Regeneration)</strong></p>
        <p style={{ fontSize: '0.9rem', margin: 0, color: '#cffafe' }}>
          Served from cache instantly, re-rendered every 60 seconds in the background.
        </p>
      </div>

      <h2>Active Vendors</h2>
      <div>
        {vendors.map((vendor: Vendor) => (
          <div key={vendor.id} style={{ 
            border: '1px solid #ddd', 
            padding: '1rem', 
            marginBottom: '0.5rem',
            borderRadius: '4px'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{vendor.name}</h3>
            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
              <strong>Email:</strong> {vendor.email}
            </p>
            <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
              <strong>Website:</strong> {vendor.website}
            </p>
          </div>
        ))}
      </div>

      <div style={{ background: '#064e3b', color: '#ffffff', padding: '1rem', marginTop: '1rem', borderRadius: '4px', borderLeft: '4px solid #6ee7b7' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#d1fae5' }}>ISR Benefits:</h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem', color: '#d1fae5' }}>
          <li>✓ Fast load times (served from cache)</li>
          <li>✓ Automatic background updates</li>
          <li>✓ Reduced server load vs SSR</li>
          <li>✓ Fresh data every 60 seconds</li>
        </ul>
      </div>

      <nav style={{ marginTop: '2rem' }}>
        <Link href="/">← Home</Link> | <Link href="/about">About (SSG)</Link> | <Link href="/dashboard">Dashboard (SSR)</Link>
      </nav>
    </div>
  );
}
