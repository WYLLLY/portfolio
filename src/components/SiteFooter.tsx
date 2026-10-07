import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <span>{site.name}</span>
      <div className="footer-links">
        <Link href="/#projects">Projects</Link>
        <a href={site.github}>GitHub</a>
        <a href={`mailto:${site.email}`}>Email</a>
      </div>
    </footer>
  );
}
