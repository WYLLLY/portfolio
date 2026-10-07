import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="not-found shell">
      <p className="section-index">404 / NOT FOUND</p>
      <h1>Page not found.</h1>
      <p>The page you were looking for is not available.</p>
      <Link className="inline-link" href="/">Return to homepage <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
