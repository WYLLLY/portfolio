import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { PaymentCaseStudy } from "@/components/PaymentCaseStudy";
import { AICaseStudy } from "@/components/AICaseStudy";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { getSiteUrl } from "@/content/site-url";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} | ${site.name}`;
  const description = `${project.status === "completed" ? "A completed" : "An in-development"} personal engineering project. ${project.summary}`;
  const siteUrl = getSiteUrl();
  const path = `/projects/${slug}`;

  return {
    title,
    description,
    ...(siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title,
      description,
      type: "article",
      ...(siteUrl ? { url: `${siteUrl}${path}` } : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  if (project.slug === "payment-ledger-system") return <PaymentCaseStudy project={project} />;
  if (project.slug === "ai-task-execution-platform") return <AICaseStudy project={project} />;
  return <CaseStudy project={project} />;
}
