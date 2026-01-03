import Link from "next/link";
import { KitCard } from "@/components/kit-card";
import { ToolCard } from "@/components/tool-card";
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

  return (
    <div className="container px-4 sm:px-6 py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-5xl space-y-10 md:space-y-16">
        {/* Hero */}
        <div className="space-y-3 sm:space-y-4 text-center px-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Developer Tools & Kits
          </h1>
          <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-lg">
            Foundational kits and patterns for building robust software systems.
            <br />
            Designed to survive contact with reality.
          </p>
        </div>

        <Separator />

        {/* Kits Section */}
        <section className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
              Kits
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              SDKs, runtimes, and development frameworks
            </p>
          </div>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedKits.map((kit) => (
              <KitCard key={kit.slug} kit={kit} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Tools Section */}
        <section className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
              Tools
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Applications and utilities built on the kits
            </p>
          </div>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
