import {
  AlertCircle,
  Box,
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
import { kits, tools } from "@/lib/content";

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata(props: ToolPageProps) {
  const params = await props.params;
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: `${tool.title} | ProsDevLab`,
    description: tool.summary,
  };
}

export default async function ToolPage(props: ToolPageProps) {
  const params = await props.params;
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const statusVariant: Record<string, "default" | "secondary" | "destructive"> =
    {
      stable: "default",
      experimental: "secondary",
      deprecated: "destructive",
    };

  // Get kit details for builtOn
  const builtOnKits = tool.builtOn
    .map((slug: string) => kits.find((k) => k.slug === slug))
    .filter(Boolean);

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
            href="/tools"
            className="hover:text-foreground transition-colors whitespace-nowrap"
          >
            Tools
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <span className="text-foreground truncate">{tool.title}</span>
        </nav>

        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {tool.title}
            </h1>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <Badge
                variant={statusVariant[tool.status]}
                className="text-sm px-3 py-1"
              >
                {tool.status}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Updated {new Date(tool.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {tool.summary}
            </p>
          </div>

          {/* Experimental Warning */}
          {tool.status === "experimental" && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                    Experimental Release
                  </p>
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    This tool is under active development. Features may change
                    without notice. Not recommended for production use.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Deprecated Warning */}
          {tool.status === "deprecated" && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-red-900 dark:text-red-200">
                    Deprecated
                  </p>
                  <p className="text-sm text-red-800 dark:text-red-300">
                    This tool is no longer maintained. Consider migrating to an
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
                href={tool.reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">
                  {tool.reference.type === "repo"
                    ? "Repository"
                    : "Documentation"}
                </span>
              </a>
            </Button>
          </div>

          {/* Built On */}
          {builtOnKits.length > 0 && (
            <div className="rounded-lg border p-3 sm:p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                <Box className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Built on</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {builtOnKits.map((kit: any) =>
                  kit ? (
                    <Button key={kit.slug} asChild variant="outline" size="sm">
                      <Link href={kit.url} className="text-xs sm:text-sm">
                        {kit.title}
                      </Link>
                    </Button>
                  ) : null,
                )}
              </div>
            </div>
          )}

          <Separator />

          {/* MDX Content */}
          <div className="max-w-full overflow-x-hidden break-words">
            <MDXContent code={tool.body} />
          </div>
        </div>
      </article>
    </div>
  );
}
