import { Calendar, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { kits } from "@/lib/content";

interface KitPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return kits.map((kit) => ({
    slug: kit.slug,
  }));
}

export async function generateMetadata(props: KitPageProps) {
  const params = await props.params;
  const kit = kits.find((k) => k.slug === params.slug);

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
  const kit = kits.find((k) => k.slug === params.slug);

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
      <article className="mx-auto max-w-3xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/kits"
            className="hover:text-foreground transition-colors"
          >
            Kits
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{kit.title}</span>
        </nav>

        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={statusVariant[kit.status]} className="text-xs">
                {kit.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {kit.category}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {kit.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {kit.summary}
            </p>
          </div>

          {/* Metadata row */}
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center text-sm text-muted-foreground">
            <Button asChild variant="default" size="sm">
              <a
                href={kit.reference.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">
                  {kit.reference.type === "repo"
                    ? "Repository"
                    : "Documentation"}
                </span>
              </a>
            </Button>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>
                Updated {new Date(kit.lastUpdated).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Tags */}
          {kit.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {kit.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <Separator />

          {/* MDX Content */}
          <div className="max-w-none">
            <MDXContent code={kit.body} />
          </div>
        </div>
      </article>
    </div>
  );
}
