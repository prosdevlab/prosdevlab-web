"use client";

import { useState } from "react";
import { ToolCard } from "@/components/tool-card";
import { Button } from "@/components/ui/button";
import { tools } from "@/lib/content";

type StatusFilter = "all" | "stable" | "experimental" | "deprecated";

export default function ToolsPage() {
  const [filter, setFilter] = useState<StatusFilter>("all");

  const sortedTools = tools.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  const filteredTools =
    filter === "all"
      ? sortedTools
      : sortedTools.filter((tool) => tool.status === filter);

  const counts = {
    all: tools.length,
    stable: tools.filter((t) => t.status === "stable").length,
    experimental: tools.filter((t) => t.status === "experimental").length,
    deprecated: tools.filter((t) => t.status === "deprecated").length,
  };

  return (
    <div className="container px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Tools
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base md:text-lg">
              Applications and utilities built on the kits
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="text-xs sm:text-sm"
            >
              All ({counts.all})
            </Button>
            <Button
              variant={filter === "stable" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("stable")}
              className="text-xs sm:text-sm"
            >
              Stable ({counts.stable})
            </Button>
            <Button
              variant={filter === "experimental" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("experimental")}
              className="text-xs sm:text-sm"
            >
              Experimental ({counts.experimental})
            </Button>
            {counts.deprecated > 0 && (
              <Button
                variant={filter === "deprecated" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("deprecated")}
                className="text-xs sm:text-sm"
              >
                Deprecated ({counts.deprecated})
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No tools found with status: {filter}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
