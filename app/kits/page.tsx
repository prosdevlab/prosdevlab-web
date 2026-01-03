import { KitCard } from "@/components/kit-card";
import { kits } from "@/lib/content";

export default function KitsPage() {
  const sortedKits = kits.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="container px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Kits
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
            SDKs, runtimes, and development frameworks
          </p>
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedKits.map((kit) => (
            <KitCard key={kit.slug} kit={kit} />
          ))}
        </div>
      </div>
    </div>
  );
}
