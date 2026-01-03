import {
  AlertCircle,
  Calendar,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type Kit, kits } from "@/lib/content";

interface KitPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return kits.map((kit: Kit) => ({
    slug: kit.slug,
  }));
}

export async function generateMetadata(props: KitPageProps) {
  const params = await props.params;
  const kit = kits.find((k: Kit) => k.slug === params.slug);

  if (!kit) {
    return {
      title: "Kit Not Found",
    };
  }

  return {
    title: `${kit.title} | ProsDevLab`,
    description: kit.summary,
  };
}

export default async function KitPage(props: KitPageProps) {
  const params = await props.params;
  const kit = kits.find((k: Kit) => k.slug === params.slug);

  if (!kit) {
    notFound();
  }

  const statusVariant: Record<string, "default" | "secondary" | "destructive"> =
    {
      stable: "default",
      experimental: "secondary",
      deprecated: "destructive",
    };

  return (
    <div className="container px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <article className="mx-auto max-w-3xl min-w-0">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 overflow-x-auto">
          <Link
            href="/"
            className="hover:text-foreground transition-colors whitespace-nowrap"
          >
            Home
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <Link
            href="/kits"
            className="hover:text-foreground transition-colors whitespace-nowrap"
          >
            Kits
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <span className="text-foreground truncate">{kit.title}</span>
        </nav>

        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {kit.title}
            </h1>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <Badge
                variant={statusVariant[kit.status]}
                className="text-sm px-3 py-1"
              >
                {kit.status}
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                {kit.category}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Updated {new Date(kit.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {kit.summary}
            </p>
          </div>

          {/* Experimental Warning */}
          {kit.status === "experimental" && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                    Experimental Release
                  </p>
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    This kit is under active development. APIs may change
                    without notice. Not recommended for production use.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Deprecated Warning */}
          {kit.status === "deprecated" && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-red-900 dark:text-red-200">
                    Deprecated
                  </p>
                  <p className="text-sm text-red-800 dark:text-red-300">
                    This kit is no longer maintained. Consider migrating to an
                    alternative solution.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <a
                href={kit.reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">
                  {kit.reference.type === "repo"
                    ? "Repository"
                    : "Documentation"}
                </span>
              </a>
            </Button>
          </div>

          <Separator />

          {/* MDX Content */}
          <div className="max-w-full overflow-x-hidden break-words">
            <MDXContent code={kit.body} />
          </div>
        </div>
      </article>
    </div>
  );
}
