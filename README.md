# William Decatoire — Portfolio

A personal Software and Backend Engineering portfolio built with Next.js and TypeScript. Seven project pages cover Payment & Ledger, AI Task Execution, Fraud Detection ML, Workspace SaaS, Python Code Analyzer, Security Log Analyzer and Snapshot Backup Engine. Each page distinguishes merged implementation and recorded verification from work still under review. The CV page offers the current English and French PDFs; its visible interface remains in English.

## Run locally

Use Node.js 24 and pnpm 11.25.0.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`.

## Verify

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Update project content

Edit `src/content/projects.ts`. Add verified claims only when architecture, tests, measurements or incidents are supported by the corresponding project. Use `status: "completed"` and a `completionNote` only for a finished, verified project. Keep branch-only work labeled as in development. Add a repository URL only when it is publicly accessible. The bilingual, seven-project CV source and editable DOCX files are in `cv-source/`; regenerate them with `python cv-source/build_cv.py`, render the DOCX files to one-page A4 PDFs, and replace the files under `public/cv/` after visual and link checks.

## Deploy

Connect the GitHub repository to Vercel and select `main` as the production branch. Vercel will create preview deployments for pull requests and production deployments from `main`.

For canonical URLs and the sitemap, set `SITE_URL` to the production origin (for example, `https://your-site.vercel.app`) in the Vercel project. If Vercel exposes `VERCEL_PROJECT_PRODUCTION_URL`, the site can use that automatically. Verify `/robots.txt`, `/sitemap.xml`, the homepage canonical URL, and each project canonical URL on the production deployment.
