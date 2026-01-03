# Contributing to prosdevlab-web

## Development Setup

```bash
pnpm install
pnpm dev
```

## Git Workflow

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear commit history:

```
<type>: <subject>

[optional body]

[optional footer]
```

#### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Code style (formatting, missing semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, config, etc.)
- **ci**: CI/CD changes

#### Examples

```bash
feat: add breadcrumbs to detail pages
fix(dark-mode): improve code block contrast
docs: update README with Velite setup
chore: add commitlint configuration
ci: add GitHub Actions workflow
```

### Git Hooks

We use Husky to enforce code quality:

#### Pre-commit
- Runs `lint-staged` to lint and format staged files with Biome
- Auto-fixes issues when possible
- **Fast** (~1-2 seconds)

#### Commit-msg
- Validates commit message format with commitlint
- Rejects invalid messages

#### Pre-push
- Runs full typecheck (`tsc --noEmit`)
- Runs full build (`velite && next build`)
- **Slower** (~10-30 seconds) but ensures nothing broken reaches remote

### Bypassing Hooks (Emergency Only)

```bash
# Skip pre-commit and commit-msg (not recommended)
git commit --no-verify -m "fix: emergency hotfix"

# Skip pre-push (not recommended)
git push --no-verify
```

## CI Pipeline

GitHub Actions runs on all pushes and PRs:

1. **Lint** - Biome checks
2. **Typecheck** - TypeScript validation
3. **Build** - Full Velite + Next.js build
4. **Commitlint** - Validates commit messages (PRs only)

All jobs must pass for PRs to be mergeable.

## Content Management

### Adding Kits

1. Create `content/kits/N.slug-name.mdx` (N = order number)
2. Add frontmatter (see existing files)
3. Write MDX content
4. Run `pnpm build` to validate

### Adding Tools

1. Create `content/tools/N.slug-name.mdx`
2. Ensure `builtOn` references existing kit slugs
3. Run `pnpm build` to validate

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production (Velite + Next.js)
pnpm start        # Start production server
pnpm lint         # Biome lint check
pnpm format       # Biome format (auto-fix)
pnpm typecheck    # TypeScript check (no emit)
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── kits/[slug]/       # Kit detail pages
│   ├── tools/[slug]/      # Tool detail pages
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── mdx-content.tsx   # MDX renderer
├── content/              # MDX content (Git-backed)
│   ├── kits/
│   └── tools/
├── lib/                  # Utilities
│   └── content.ts        # Velite exports
├── velite.config.ts      # Content processing config
└── .github/workflows/    # CI/CD
```

