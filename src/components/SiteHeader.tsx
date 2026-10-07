import Link from "next/link";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner shell">
        <Link className="brand" href="/" aria-label="William Decatoire, home">
          WD<span className="brand-mark" aria-hidden="true">.</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/#projects">Projects</Link>
          <Link href="/#engineering">Engineering</Link>
          <a href={site.github}>GitHub</a>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
