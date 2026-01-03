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

interface Kit {
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

export function KitCard({ kit }: { kit: Kit }) {
  const statusVariant = {
    stable: "default",
    experimental: "secondary",
    deprecated: "destructive",
  } as const;

  return (
    <Card className="flex flex-col h-full min-w-0 max-w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 min-w-0">
          <CardTitle className="text-lg sm:text-xl leading-tight break-words min-w-0">
            <Link href={kit.url} className="hover:underline">
              {kit.title}
            </Link>
          </CardTitle>
          <Badge
            variant={statusVariant[kit.status]}
            className="shrink-0 text-xs"
          >
            {kit.status}
          </Badge>
        </div>
        <CardDescription className="line-clamp-3 text-sm text-foreground/70 break-words">
          {kit.summary}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-3 mt-auto">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full text-xs sm:text-sm"
        >
          <a
            href={kit.reference.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {kit.reference.type === "repo" ? "Repository" : "Documentation"}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
