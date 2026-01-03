# CLAUDE.md - AI Assistant Context

This file provides context for AI assistants working on this project.

## Project Overview

**prosdevlab-web** is a Git-backed catalog site for developer tools and kits. Content is managed in MDX files, indexed and typed using Velite, and rendered as a static Next.js site. The design is clean, technical, minimal, and mobile-first.

**Live URL:** prosdevlab.com (when deployed)

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router, React 19)
- **Content:** MDX via Velite (content layer for indexing, validation, transformation)
- **Styling:** Tailwind CSS v4 + shadcn/ui (minimal usage: Card, Badge, Button, Separator)
- **Linting:** Biome (replaces ESLint + Prettier)
- **Commit:** Commitlint + Husky (conventional commits)
- **CI/CD:** GitHub Actions (lint, typecheck, build)

## Architecture

### Information Architecture

```
/ (Home)
  ├── Kits index (first)
  └── Tools index (second)

/kits → List all kits
/kits/[slug] → Kit detail (render MDX)

/tools → List all tools
/tools/[slug] → Tool detail (render MDX)
```

### Content Structure

```
content/
├── kits/
│   ├── 1.sdk-kit.mdx
│   └── 2.experience-sdk.mdx
└── tools/
    └── 1.auth-header-injector.mdx
```

**Naming Convention:** `N.slug-name.mdx` where N determines display order.

### How Velite Works

1. **At build time** (`pnpm build`):
   - Velite reads all `content/**/*.mdx` files
   - Validates frontmatter against Zod schemas (see `velite.config.ts`)
   - Compiles MDX to JavaScript with rehype plugins (syntax highlighting, slug generation)
   - Generates TypeScript types
   - Outputs to `.velite/` directory

2. **At runtime**:
   - Import `{ kits, tools }` from `.velite` (via `lib/content.ts`)
   - Get fully-typed arrays of content objects
   - Render MDX using `MDXContent` component

3. **MDX Rendering**:
   - Velite compiles MDX to a JS string that exports a function
   - `MDXContent` evaluates this string and passes JSX runtime (`Fragment`, `jsx`, `jsxs`)
   - Result is React components with custom styling via `components` object

### Frontmatter Schema

**Shared (Kit + Tool):**
- `title` (string, max 99 chars)
- `slug` (string, used in URL)
- `status` ("experimental" | "stable" | "deprecated")
- `summary` (string, max 500 chars) - **Required for cards**
- `tags` (string[])
- `lastUpdated` (YYYY-MM-DD)
- `reference` (object: `type: "repo"|"docs"`, `url: string`)

**Kit-only:**
- `category` ("sdk" | "runtime" | "testing" | "docs" | "ai" | "other")

**Tool-only:**
- `builtOn` (string[] of kit slugs)

**Computed fields (added by Velite):**
- `url` - generated from slug
- `order` - parsed from filename prefix (e.g., `1.sdk-kit.mdx` → order: 1)
- `body` - compiled MDX as JS string

## Key Technical Decisions

### Why Velite over Contentlayer?
- Contentlayer is unmaintained
- Velite has similar DX but active development
- Built-in Zod validation and computed fields

### Why Biome over ESLint + Prettier?
- Faster (Rust-based)
- Single tool for lint + format
- Less configuration overhead

### Why Tailwind v4?
- CSS-first configuration (no more JS config hell)
- Better performance
- Native CSS variables for theming

### Why shadcn/ui sparingly?
- Keep bundle small
- Only use when needed: Card, Badge, Button, Separator
- Custom components for everything else

### Syntax Highlighting
- `rehype-pretty-code` with `github-dark-dimmed` theme
- `keepBackground: true` (critical for colors to show)
- Pre blocks have explicit `bg-[#22272e]` to match theme
- Works in both light and dark modes (dark background always)

### Dark Mode Implementation
- `next-themes` with `class` strategy
- CSS variables in `globals.css` (`:root` and `.dark`)
- All components respect theme via Tailwind utilities
- ThemeToggle component with hydration handling

## File Structure

```
app/
├── layout.tsx              # Root layout (ThemeProvider, SiteHeader)
├── page.tsx                # Home (shows kits + tools)
├── kits/
│   ├── page.tsx            # List all kits
│   └── [slug]/page.tsx     # Kit detail
└── tools/
    ├── page.tsx            # List all tools
    └── [slug]/page.tsx     # Tool detail

components/
├── ui/                     # shadcn/ui components
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   └── separator.tsx
├── site-header.tsx         # Nav (Home, Kits, Tools, ThemeToggle)
├── theme-provider.tsx      # next-themes wrapper
├── theme-toggle.tsx        # Light/dark mode button
├── kit-card.tsx            # Kit card for grid
├── tool-card.tsx           # Tool card for grid
└── mdx-content.tsx         # MDX renderer (evaluates Velite output)

content/                    # Source of truth (Git-backed)
├── kits/*.mdx
└── tools/*.mdx

lib/
└── content.ts              # Re-exports Velite-generated data

.velite/                    # Generated (gitignored)
├── index.d.ts              # TypeScript types
└── index.js                # Compiled content data

velite.config.ts            # Content schema, validation, MDX plugins
```

## Common Tasks

### Adding Content

**New Kit:**
```bash
# 1. Create file
touch content/kits/3.my-kit.mdx

# 2. Add frontmatter (see existing files)
# 3. Write MDX content
# 4. Build to validate
pnpm build
```

**New Tool:**
```bash
# Same as kit, but ensure builtOn references existing kit slugs
```

### Styling Changes

- **Theme colors:** `app/globals.css` (CSS variables)
- **Component styles:** Inline Tailwind classes
- **Global styles:** `@layer base` in `globals.css`
- **MDX content styles:** `components/mdx-content.tsx` (components object)

### Adding shadcn/ui Components

```bash
# Use the CLI (already configured)
npx shadcn@latest add <component-name>
# Components go to components/ui/
```

### Debugging Velite

```bash
# Check Velite output
cat .velite/index.js

# Rebuild with fresh state
rm -rf .velite && pnpm build

# Check generated types
cat .velite/index.d.ts
```

### MDX Rendering Issues

If MDX content doesn't render:
1. Check Velite compiled it: `.velite/index.js` should have `body: "const{Fragment:e..."`
2. Check `MDXContent` evaluates correctly (browser console for errors)
3. Ensure `components` object in `mdx-content.tsx` has all needed elements
4. Verify rehype plugins in `velite.config.ts`

## Important Patterns

### Mobile-First Responsive

Always start with mobile, then scale up:
```tsx
// ✅ Good
className="text-sm sm:text-base md:text-lg"

// ❌ Bad
className="md:text-sm text-lg"
```

### Component Composition

Keep components small and composable:
```tsx
// ✅ Good
<Card>
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>

// ❌ Bad (monolithic component)
```

### Type Safety

Velite generates types automatically. Use them:
```tsx
import { kits } from '@/lib/content'
// kits is typed as Kit[] with all fields known
```

## Things to Be Careful About

1. **Don't remove `.velite` from `.gitignore`** - It's generated at build time
2. **Always run `pnpm build` after content changes** - Velite needs to recompile
3. **Numeric prefixes must be unique** - `order` field sorts by this
4. **Tool `builtOn` slugs must exist** - Velite validates at build time
5. **Dark mode classes** - Always test in both modes
6. **Syntax highlighting** - `keepBackground: true` is critical, don't change it
7. **MDX inline code vs code blocks** - Inline `code` uses `bg-muted`, blocks use theme background
8. **Breadcrumbs** - Always show hierarchy: Home > Category > Item

## Development Workflow

```bash
# 1. Start dev server
pnpm dev

# 2. Make changes (content or code)

# 3. For content changes, rebuild
pnpm build

# 4. Test in browser (light + dark mode)

# 5. Commit (hooks will run)
git add .
git commit -m "feat: add new kit"
  → pre-commit: lint-staged (fast)
  → commit-msg: commitlint validates

# 6. Push (heavier checks)
git push
  → pre-push: typecheck + build (slower)
  → CI: runs on GitHub Actions
```

## CI/CD

**GitHub Actions** (`.github/workflows/ci.yml`):
- Runs on push to `main` and all PRs
- Jobs: lint, typecheck, build, commitlint
- All must pass for merge

**Git Hooks** (via Husky):
- `pre-commit`: lint-staged with Biome
- `commit-msg`: commitlint (conventional commits)
- `pre-push`: full typecheck + build

## Commit Message Format

```
<type>: <subject>

Types: feat, fix, docs, style, refactor, perf, test, chore, ci

Examples:
feat: add breadcrumbs to detail pages
fix(dark-mode): improve code block contrast
docs: update README
```

See `CONTRIBUTING.md` for full details.

## Design Principles

1. **Mobile-first** - Always start with mobile layout
2. **Minimal** - Don't add features "just in case"
3. **Type-safe** - TypeScript for everything
4. **Git-backed** - Content lives in repo, not database
5. **Fast** - SSG, minimal JS, optimized images
6. **Clean** - Technical aesthetic, no fluff
7. **Dark mode first** - Both modes are first-class

## Known Quirks

1. **Velite build required for content changes** - Dev server doesn't hot-reload content
2. **Dual theme not working for syntax highlighting** - Stick with single `github-dark-dimmed` theme
3. **Tailwind Typography removed** - We use custom MDX components instead (better control)
4. **`bg-muted` in dark mode** - Defined in CSS variables, not a fixed color

## Deployment Notes

- **Static export:** Next.js generates static HTML/CSS/JS
- **No server required:** Can deploy to Vercel, Netlify, Cloudflare Pages, etc.
- **Build command:** `pnpm build`
- **Output directory:** `.next` (or `out` if using `output: 'export'`)
- **Environment:** Node.js 20+

## Questions to Ask User

When working on this project, common clarifications needed:

1. **Content changes:** "Should I rebuild after adding content?" (Yes)
2. **New features:** "Should this work in both light and dark modes?" (Yes)
3. **Components:** "Should I use shadcn/ui or custom?" (Custom unless shadcn makes sense)
4. **Mobile:** "Does this need to be responsive?" (Always yes)
5. **Links:** "Internal or external?" (Use `Link` for internal, `a` with `target="_blank"` for external)

## Useful Commands Reference

```bash
pnpm dev          # Dev server (port 3000)
pnpm build        # Velite + Next.js build
pnpm start        # Prod server
pnpm lint         # Biome lint check
pnpm format       # Biome format (auto-fix)
pnpm typecheck    # TypeScript check

# Velite only
pnpm velite       # Rebuild content (not in package.json, use build)

# Git
git add .
git commit -m "feat: ..."  # Runs hooks
git push                   # Runs pre-push hook
```

## Contact / Ownership

- **Owner:** prosdevlab
- **Site:** prosdevlab.com
- **Repo:** (to be set up)

---

**Last Updated:** 2026-01-03

This document should be updated when major architectural decisions change.

