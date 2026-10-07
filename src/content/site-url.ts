export function getSiteUrl(): string | undefined {
  const configured = process.env.SITE_URL;
  const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const value = configured ?? (vercelProductionHost ? `https://${vercelProductionHost}` : undefined);

  if (!value) return undefined;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}
