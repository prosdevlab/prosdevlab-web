import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 sm:px-6 py-6 sm:py-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Brand */}
            <div className="space-y-3">
              <Link href="/" className="font-bold text-lg">
                prosdevlab
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                Foundational kits and patterns for building robust software
                systems.
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Catalog</h3>
              <nav className="flex flex-col space-y-2 text-sm">
                <Link
                  href="/kits"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kits
                </Link>
                <Link
                  href="/tools"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tools
                </Link>
              </nav>
            </div>

            {/* Resources (placeholder for future) */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Resources</h3>
              <nav className="flex flex-col space-y-2 text-sm">
                <a
                  href="https://github.com/prosdevlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} prosdevlab. Built to survive contact
              with reality.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
