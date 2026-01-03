import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Tool {
  title: string;
  slug: string;
  status: "experimental" | "stable" | "deprecated";
  summary: string;
  tags: string[];
  url: string;
  reference: {
    type: "repo" | "docs";
    url: string;
  };
}

export function ToolCard({ tool }: { tool: Tool }) {
  const statusVariant = {
    stable: "default",
    experimental: "secondary",
    deprecated: "destructive",
  } as const;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg sm:text-xl leading-tight">
            <Link href={tool.url} className="hover:underline">
              {tool.title}
            </Link>
          </CardTitle>
          <Badge
            variant={statusVariant[tool.status]}
            className="shrink-0 text-xs"
          >
            {tool.status}
          </Badge>
        </div>
        <CardDescription className="line-clamp-3 text-sm text-foreground/70">
          {tool.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {tool.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full text-xs sm:text-sm"
        >
          <a
            href={tool.reference.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {tool.reference.type === "repo" ? "Repository" : "Documentation"}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
