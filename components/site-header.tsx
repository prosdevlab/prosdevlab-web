import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-6 gap-2">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <Link href="/" className="flex items-center shrink-0">
            <span className="font-bold text-sm sm:text-base whitespace-nowrap">
              prosdevlab
            </span>
          </Link>
          <nav className="flex items-center gap-3 sm:gap-6 text-sm font-medium">
            <Link
              href="/kits"
              className="transition-colors hover:text-foreground/80 text-foreground/60 whitespace-nowrap"
            >
              Kits
            </Link>
            <Link
              href="/tools"
              className="transition-colors hover:text-foreground/80 text-foreground/60 whitespace-nowrap"
            >
              Tools
            </Link>
          </nav>
        </div>
        <div className="flex items-center shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
