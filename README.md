# Full-Stack TypeScript Monorepo Starter

A production-ready starter template for building full-stack TypeScript web applications using a monorepo architecture with npm workspaces.

## Quick Start

```bash
# 1. Use this template (GitHub) or clone
git clone <your-repo-url> my-app
cd my-app

# 2. Install Node.js via mise (or use nvm/fnm with Node 20.14)
mise install

# 3. Install dependencies
npm install

# 4. Verify everything works
npm run check

# 5. Start development
npm run dev
```

## Using This Template

### Option 1: GitHub Template (Recommended)

1. Click **"Use this template"** on GitHub
2. Name your repository
3. Clone your new repository
4. Run `npm install`

### Option 2: Manual Clone

```bash
# Clone the starter
git clone https://github.com/your-org/fullstack-ts-starter.git my-app
cd my-app

# Remove git history and reinitialize
rm -rf .git
git init
git add .
git commit -m "chore: initial commit from fullstack-ts-starter"

# Set up your remote
git remote add origin https://github.com/your-org/my-app.git
git push -u origin main
```

### Post-Template Setup

1. **Update `package.json`**: Change the name, description, and repository URL
2. **Update `cspell.json`**: Add your project-specific terms
3. **Set up branch protection**: See [DEV.md](./DEV.md#setting-up-branch-protection-recommended)
4. **Create `dev` branch**: `git checkout -b dev && git push -u origin dev`

## Project Structure

```
/
├── backend/           # Backend workspace (API, server)
├── frontend/          # Frontend workspace (React, Vite)
├── .github/workflows/ # CI/CD pipelines
├── .husky/            # Git hooks
└── [config files]     # Shared tooling config
```

## npm Commands Reference

### When to Use Root vs Workspace Commands

| Use Root (`npm run ...`) | Use Workspace (`npm run ... --workspace=backend`) |
| ------------------------ | ------------------------------------------------- |
| CI/CD pipelines          | Focused development on one package                |
| Pre-commit hooks         | Running specific workspace dev server             |
| Before pushing code      | Debugging one workspace                           |
| Release builds           | Adding workspace-specific dependencies            |

### Root Commands (Run from `/`)

```bash
# Quality checks
npm run check           # ALL checks (format, lint, typecheck, test, etc.)
npm run format          # Format all files with Prettier
npm run lint            # Lint all workspaces
npm run typecheck       # Type check all workspaces
npm run secretlint      # Scan for secrets
npm run spellcheck      # Check spelling

# Testing
npm run test            # Run all tests
npm run test:unit       # Unit tests only
npm run test:integration # Integration tests only
npm run test:coverage   # Tests with coverage

# Development
npm run dev             # Start all dev servers
npm run build           # Build all workspaces
```

### Workspace Commands

```bash
# Run command in specific workspace (from root)
npm run dev --workspace=backend
npm run dev --workspace=frontend
npm run test --workspace=backend

# Or cd into workspace
cd backend && npm run dev
```

## Git Workflow

### Branch Strategy

```
feat/xxx ──┐
           ├──> dev (review) ──> main (release)
fix/xxx ───┘
```

| Branch            | Purpose               | Direct Push  |
| ----------------- | --------------------- | ------------ |
| `main`            | Production releases   | No (PR only) |
| `dev`             | Integration & testing | No (PR only) |
| `feat/*`, `fix/*` | Your work             | Yes          |

### Typical Workflow

```bash
# 1. Start from dev
git checkout dev && git pull

# 2. Create feature branch
git checkout -b feat/my-feature

# 3. Make commits (conventional format required)
git commit -m "feat(backend): add user endpoint"
git commit -m "test(backend): add user endpoint tests"

# 4. Run all checks before pushing
npm run check

# 5. Push and create PR targeting 'dev'
git push -u origin feat/my-feature
# Create PR on GitHub targeting 'dev' branch
```

### Commit Message Format

```
<type>(<scope>): <subject>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Examples:**

```bash
git commit -m "feat(auth): add JWT authentication"
git commit -m "fix(api): handle null user response"
git commit -m "docs: update installation guide"
```

## Pre-commit Hooks

When you run `git commit`, these checks run automatically:

1. **ESLint** - Fixes auto-fixable issues
2. **Prettier** - Formats code
3. **CSpell** - Checks spelling
4. **Secretlint** - Scans for secrets
5. **Commitlint** - Validates commit message format

If any check fails, the commit is blocked.

## Automated Releases

When PRs are merged to `main`, [Semantic Release](https://semantic-release.gitbook.io/) automatically:

1. Analyzes commit messages
2. Determines version bump:
   - `fix:` → Patch (0.0.X)
   - `feat:` → Minor (0.X.0)
   - `feat!:` or `BREAKING CHANGE` → Major (X.0.0)
3. Creates GitHub release with changelog

## Tech Stack

| Category   | Tool                              |
| ---------- | --------------------------------- |
| Language   | TypeScript                        |
| Monorepo   | npm workspaces                    |
| Testing    | Vitest                            |
| Linting    | ESLint v9 (flat config)           |
| Formatting | Prettier                          |
| Git Hooks  | Husky + lint-staged               |
| Commits    | Commitlint (conventional commits) |
| Secrets    | Secretlint                        |
| Spelling   | CSpell                            |
| Releases   | Semantic Release                  |
| Tooling    | mise                              |

## Documentation

- **[DEV.md](./DEV.md)** - Detailed development guide, tooling configuration, and examples
- **[TODO.md](./TODO.md)** - Current project tasks and roadmap

## Using Bun (Optional)

This starter includes [Bun](https://bun.sh/) in the mise config for users who prefer it for the backend:

```bash
# Install bun via mise
mise install

# Use bun for backend development
cd backend
bun run dev
bun test
```

## License

MIT
