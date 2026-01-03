"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

const components = {
  a: ({ href, children, ...props }: React.ComponentProps<"a">) => {
    // Internal Next.js routes
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-primary hover:text-primary/80 underline underline-offset-4"
          {...props}
        >
          {children}
        </Link>
      );
    }
    // Anchor links (same-page navigation)
    if (href?.startsWith("#")) {
      return (
        <a
          href={href}
          className="text-primary hover:text-primary/80"
          {...props}
        >
          {children}
        </a>
      );
    }
    // External links
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 hover:text-primary/80"
        {...props}
      >
        {children}
      </a>
    );
  },
  h2: ({ children, ...props }: React.ComponentProps<"h2">) => (
    <h2
      className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight text-foreground first:mt-0"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.ComponentProps<"h4">) => (
    <h4
      className="mt-6 scroll-m-20 text-lg font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }: React.ComponentProps<"p">) => (
    <p
      className="leading-7 text-foreground/90 [&:not(:first-child)]:mt-6"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.ComponentProps<"ul">) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.ComponentProps<"ol">) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.ComponentProps<"li">) => (
    <li className="text-foreground/90" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-2 border-border pl-6 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: React.ComponentProps<"code">) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.ComponentProps<"pre">) => (
    <pre
      className="mb-4 mt-6 overflow-x-auto rounded-lg border border-border p-4 bg-[#22272e] dark:bg-[#22272e]"
      {...props}
    >
      {children}
    </pre>
  ),
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Content = useMemo(() => {
    // Velite MDX: `const{Fragment:e,jsx:n,jsxs:l}=arguments[0]; ... return{default:Component}`
    // Create function and pass JSX runtime as first argument
    try {
      const fn = new Function(code);
      const result = fn({ Fragment, jsx, jsxs });
      return result.default;
    } catch (error) {
      console.error("MDX render error:", error);
      return () => <div>Error rendering MDX content</div>;
    }
  }, [code]);

  return <Content components={components} />;
}
