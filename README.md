# William Decatoire — Portfolio

A personal Software and Backend Engineering portfolio built with Next.js and TypeScript. The four project pages describe work in development and separate planned scope from verified implementation evidence.

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

Edit `src/content/projects.ts`. Keep descriptions of planned work in future tense. Add a verified section only after its architecture, tests, measurements, or incident results are supported by the actual project. Add a repository URL only when the project repository is available.

## Deploy

Connect the GitHub repository to Vercel and select `main` as the production branch. Vercel will create preview deployments for pull requests and production deployments from `main`.

For canonical URLs and the sitemap, set `SITE_URL` to the production origin (for example, `https://your-site.vercel.app`) in the Vercel project. If Vercel exposes `VERCEL_PROJECT_PRODUCTION_URL`, the site can use that automatically. Verify `/robots.txt`, `/sitemap.xml`, the homepage canonical URL, and each project canonical URL on the production deployment.
