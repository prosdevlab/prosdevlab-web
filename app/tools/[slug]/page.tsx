import { Box, Calendar, ChevronRight, ExternalLink } from "lucide-react";
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
      <article className="mx-auto max-w-3xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/tools"
            className="hover:text-foreground transition-colors"
          >
            Tools
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{tool.title}</span>
        </nav>

        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={statusVariant[tool.status]} className="text-xs">
                {tool.status}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {tool.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {tool.summary}
            </p>
          </div>

          {/* Metadata row */}
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center text-sm text-muted-foreground">
            <Button asChild variant="default" size="sm">
              <a
                href={tool.reference.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">
                  {tool.reference.type === "repo"
                    ? "Repository"
                    : "Documentation"}
                </span>
              </a>
            </Button>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>
                Updated {new Date(tool.lastUpdated).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Built On */}
          {builtOnKits.length > 0 && (
            <div className="rounded-lg border p-3 sm:p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                <Box className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Built on</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {builtOnKits.map((kit) =>
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

          {/* Tags */}
          {tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tool.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <Separator />

          {/* MDX Content */}
          <div className="max-w-none">
            <MDXContent code={tool.body} />
          </div>
        </div>
      </article>
    </div>
  );
}
