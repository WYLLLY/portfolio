"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="not-found shell">
      <p className="section-index">ERROR / UNAVAILABLE</p>
      <h1>Something went wrong.</h1>
      <p>We couldn&apos;t load this page. Please try again.</p>
      <div className="error-actions">
        <button type="button" onClick={reset}>Try again</button>
        <Link className="inline-link" href="/">Return to homepage <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
