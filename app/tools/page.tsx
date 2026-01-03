import { ToolCard } from "@/components/tool-card";
import { tools } from "@/lib/content";

export default function ToolsPage() {
  const sortedTools = tools.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="container px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Tools
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
            Applications and utilities built on the kits
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
