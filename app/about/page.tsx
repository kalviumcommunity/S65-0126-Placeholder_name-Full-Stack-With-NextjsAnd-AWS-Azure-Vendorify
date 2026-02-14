/**
 * STATIC PAGE - SSG (Static Site Generation)
 * 
 * Rendering Strategy: Static Rendering (SSG)
 * 
 * Why: The About page contains static information that rarely changes.
 * Using SSG ensures the page is pre-built at build time and served instantly
 * to all users with zero latency, improving performance and reducing server load.
 * 
 * When: Data is fetched ONCE at build time (next build).
 * The built HTML is cached and reused for every request until the next deployment.
 * 
 * Use Case: Perfect for content pages like About, Privacy Policy, Terms, etc.
 * that don't need real-time updates.
 */

import Link from "next/link";

export const revalidate = false; // Explicitly disable revalidation (true SSG)

async function getAboutData() {
  // Fetch static content from JSONPlaceholder
  // In a real app, this would come from a CMS or database
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
    cache: 'force-cache', // Cache indefinitely
  });

  if (!res.ok) {
    throw new Error('Failed to fetch about data');
  }

  return res.json();
}

export default async function AboutPage() {
  const post = await getAboutData();

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>About Vendorify</h1>
      
      {/* 
        UI IMPROVEMENT: Enhanced banner styling for accessibility and readability.
        Uses darker background (#065f46 - dark green) with light text for high contrast.
        Maintains visual distinction with bold border while ensuring WCAG compliance.
        SSG rendering logic unchanged.
      */}
      <div style={{ background: '#065f46', color: '#ffffff', padding: '1rem', borderLeft: '4px solid #34d399', marginBottom: '1rem', borderRadius: '4px' }}>
        <p style={{ margin: '0 0 0.5rem 0' }}><strong>✓ This page is statically generated (SSG)</strong></p>
        <p style={{ fontSize: '0.9rem', margin: 0, color: '#d1fae5' }}>
          Built once at deploy time, served instantly to all users.
        </p>
      </div>

      <h2>Sample Content (from API)</h2>
      <p><strong>Title:</strong> {post.title}</p>
      <p><strong>Body:</strong> {post.body}</p>

      {/* UI IMPROVEMENT: High-contrast styling for end-of-page info box */}
      <div style={{ background: '#1e3a8a', color: '#ffffff', padding: '1rem', marginTop: '1rem', borderRadius: '4px', borderLeft: '4px solid #60a5fa' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#dbeafe' }}>
          <strong>Build Info:</strong> This content was fetched at build time.
          No server computation needed per request.
        </p>
      </div>

      <nav style={{ marginTop: '2rem' }}>
        <Link href="/">← Home</Link> | <Link href="/dashboard">Dashboard (SSR) →</Link>
      </nav>
    </div>
  );
}
