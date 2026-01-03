import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 sm:px-6">
        <div className="mr-2 sm:mr-4 flex">
          <Link href="/" className="mr-3 sm:mr-6 flex items-center">
            <span className="font-bold text-sm sm:text-base">prosdevlab</span>
          </Link>
          <nav className="flex items-center space-x-3 sm:space-x-6 text-sm font-medium">
            <Link
              href="/kits"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Kits
            </Link>
            <Link
              href="/tools"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Tools
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
