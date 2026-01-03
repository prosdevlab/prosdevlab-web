import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { KitCard } from "@/components/kit-card";
import { ToolCard } from "@/components/tool-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { kits, tools } from "@/lib/content";

export default function Home() {
  const sortedKits = kits.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  const sortedTools = tools.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  const featuredKits = sortedKits.filter((kit) => kit.featured);
  const featuredTools = sortedTools.filter((tool) => tool.featured);
  const hasFeatured = featuredKits.length > 0 || featuredTools.length > 0;

  // Filter out featured items from regular sections
  const regularKits = sortedKits.filter((kit) => !kit.featured);
  const regularTools = sortedTools.filter((tool) => !tool.featured);

  return (
    <div className="container px-4 sm:px-6 py-8 md:py-12 lg:py-16 max-w-full">
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-16 min-w-0">
        {/* Hero */}
        <div className="space-y-3 sm:space-y-4 text-center px-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl break-words">
            Developer Tools & Kits
          </h1>
          <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-lg break-words">
            Foundational kits and patterns built to survive contact with
            reality.
          </p>
        </div>

        {hasFeatured && (
          <>
            <Separator />

            {/* Featured Section */}
            <section className="space-y-4 sm:space-y-6 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                    Start Here
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Foundational tools to get you started
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
                {featuredKits.map((kit) => (
                  <KitCard key={kit.slug} kit={kit} />
                ))}
                {featuredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          </>
        )}

        <Separator />

        {/* Kits Section */}
        <section className="space-y-4 sm:space-y-6 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                Kits
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                SDKs, runtimes, and development frameworks
              </p>
            </div>
            {regularKits.length > 6 && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/kits" className="flex items-center gap-1">
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
            {regularKits.slice(0, 6).map((kit) => (
              <KitCard key={kit.slug} kit={kit} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Tools Section */}
        <section className="space-y-4 sm:space-y-6 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
                Tools
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Applications and utilities built on the kits
              </p>
            </div>
            {regularTools.length > 6 && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/tools" className="flex items-center gap-1">
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
            {regularTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
