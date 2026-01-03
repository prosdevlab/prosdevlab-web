"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  "data-language"?: string;
}

export function CodeBlock({
  children,
  className = "",
  "data-language": language,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Extract text content from children
    const code = extractTextContent(children);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group max-w-full">
      {/* Header bar with language and copy button */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/30 rounded-t-lg">
        {language ? (
          <span className="text-xs font-mono text-muted-foreground">
            {language}
          </span>
        ) : (
          <span></span>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 w-7 p-0 hover:bg-muted"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      <pre className={`${className} max-w-full rounded-t-none`}>{children}</pre>
    </div>
  );
}

// Helper to extract text from React nodes
function extractTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractTextContent).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractTextContent((node as any).props.children);
  }
  return "";
}
