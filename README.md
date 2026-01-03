# prosdevlab-web

Git-backed catalog and renderer for ProsDevLab developer tools and kits. Built with Next.js 16, React 19, MDX, and Velite.

## Tech Stack

- **Next.js 16** (App Router) with React 19
- **Velite** for type-safe MDX content processing
- **Tailwind CSS v4** for styling
- **shadcn/ui** components (Card, Badge, Button, Separator)
- **TypeScript** (strict mode)
- **next-mdx-remote** for MDX rendering
- **next-themes** for dark mode support

## Project Structure

```
prosdevlab-web/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with navigation & theme provider
│   ├── page.tsx             # Home page (kits + tools)
│   ├── globals.css          # Tailwind v4 config & CSS variables
│   ├── kits/
│   │   ├── page.tsx         # List all kits
│   │   └── [slug]/page.tsx  # Kit detail page
│   └── tools/
│       ├── page.tsx         # List all tools
│       └── [slug]/page.tsx  # Tool detail page
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── separator.tsx
│   ├── kit-card.tsx         # Kit card component
│   ├── tool-card.tsx        # Tool card component
│   ├── site-header.tsx      # Navigation header
│   ├── theme-provider.tsx   # Theme context provider
│   ├── theme-toggle.tsx     # Dark mode toggle
│   └── mdx-content.tsx      # MDX renderer with custom components
├── content/
│   ├── kits/                # MDX files for kits
│   │   ├── 1.sdk-kit.mdx
│   │   ├── 2.experience-sdk.mdx
│   │   └── 3.chrome-kit.mdx
│   └── tools/               # MDX files for tools
│       └── 1.auth-hi.mdx
├── lib/
│   ├── content.ts           # Exports generated Velite data
│   └── utils.ts             # cn() utility for Tailwind
├── velite.config.ts         # Velite configuration
├── tsconfig.json
├── package.json
└── .gitignore
```

## Content Structure

### Kits

Location: `content/kits/*.mdx`

Frontmatter:
```yaml
---
title: SDK Kit
slug: sdk-kit
status: stable | experimental | deprecated
summary: Short description (1-2 sentences)
tags:
  - tag1
  - tag2
lastUpdated: YYYY-MM-DD
reference:
  type: repo | docs
  url: https://github.com/...
category: sdk | runtime | testing | docs | ai | other
---
```

### Tools

Location: `content/tools/*.mdx`

Frontmatter (same as Kits, plus):
```yaml
builtOn:
  - kit-slug-1
  - kit-slug-2
```

The `builtOn` field references kit slugs and will render links to those kits on the tool detail page.

## Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Format code
pnpm format

# Lint code
pnpm lint
```

## Adding Content

1. Create a new `.mdx` file in `content/kits/` or `content/tools/`
2. Use numeric prefixes for ordering: `1.name.mdx`, `2.name.mdx`, etc.
3. Add frontmatter (see structure above)
4. Write content using standard Markdown + MDX
5. Run `pnpm dev` or `pnpm build` - Velite will validate and process

## Mobile Responsiveness

The site is built mobile-first with responsive breakpoints:

- **Mobile**: 1 column grid (< 640px)
- **Tablet**: 2 columns (640px - 1024px)
- **Desktop**: 3 columns (> 1024px)

Navigation, cards, and detail pages all adapt fluidly.

## Dark Mode

Dark mode is supported via `next-themes` with system preference detection. Toggle in the header.

## Key Features

✅ Type-safe content with Velite + TypeScript  
✅ Static site generation (SSG) for all pages  
✅ Syntax highlighting in code blocks (rehype-pretty-code)  
✅ Responsive mobile-first design  
✅ Dark mode with smooth transitions  
✅ Clean, minimal UI with shadcn/ui  
✅ Git-backed content (no CMS)  

## URLs

- `/` - Home (featured kits & tools)
- `/kits` - All kits
- `/kits/[slug]` - Kit detail
- `/tools` - All tools
- `/tools/[slug]` - Tool detail

## License

MIT
