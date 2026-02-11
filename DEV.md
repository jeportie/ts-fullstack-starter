# Full-Stack TypeScript Monorepo Starter

A production-ready starter template for building full-stack TypeScript web applications using a monorepo architecture with npm workspaces. This starter provides a pre-configured development environment with industry-standard tooling for code quality, testing, and automated releases.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [npm Commands: Root vs Workspace](#npm-commands-root-vs-workspace)
- [Tooling Overview](#tooling-overview)
- [Git Workflow and Best Practices](#git-workflow-and-best-practices)
- [Example: Building a Full-Stack App](#example-building-a-full-stack-app)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)

---

## Features

- **TypeScript** - Strict type checking across frontend and backend
- **npm Workspaces** - Monorepo structure with shared dependencies
- **Vitest** - Fast unit and integration testing
- **ESLint + Prettier** - Consistent code style and quality
- **Husky + lint-staged** - Pre-commit hooks for quality gates
- **Commitlint** - Enforce conventional commit messages
- **Secretlint** - Prevent accidental secret commits
- **CSpell** - Spell checking for code and documentation
- **Semantic Release** - Automated versioning and GitHub releases
- **mise** - Tool version management

---

## Prerequisites

### Install mise (Recommended)

[mise](https://mise.jdx.dev/) manages tool versions (Node.js, etc.) for this project.

```bash
# macOS
brew install mise

# Linux
curl https://mise.run | sh

# Add to your shell (bash)
echo 'eval "$(mise activate bash)"' >> ~/.bashrc

# Or for zsh
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc

# Restart your shell or run
source ~/.bashrc  # or ~/.zshrc
```

### Alternative: Using nvm or fnm

If you prefer not to use mise, you can use nvm or fnm with Node.js 20.14:

```bash
# With fnm
fnm use 20.14

# With nvm
nvm use 20.14
```

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url> my-app
cd my-app
```

### 2. Install the correct Node.js version

```bash
# With mise (recommended)
mise install

# This reads .mise.toml and installs Node.js 20.14
```

### 3. Install dependencies

```bash
npm install
```

This installs dependencies for:

- Root workspace (shared dev tools)
- `backend/` workspace
- `frontend/` workspace

### 4. Verify installation

```bash
npm run check
```

This runs all quality checks: formatting, linting, type checking, spell checking, secret scanning, and tests.

---

## Project Structure

```
/
├── .github/
│   └── workflows/
│       ├── pull-request-checks.yml  # CI checks on PRs to dev/main
│       ├── dev-to-main-pr.yml       # Auto-create PR from dev to main
│       └── semantic-release.yml     # Automated releases on main
├── .husky/
│   ├── pre-commit                   # Runs lint-staged before commits
│   └── commit-msg                   # Validates commit messages
├── backend/
│   ├── src/
│   │   ├── index.ts                 # Entry point
│   │   ├── constants.ts
│   │   └── hello-world.ts
│   ├── __tests__/
│   │   ├── setup.ts                 # Test setup
│   │   ├── unit/                    # Unit tests
│   │   └── integration/             # Integration tests
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
├── frontend/
│   ├── src/
│   │   ├── index.ts                 # Entry point
│   │   ├── constants.ts
│   │   └── hello-world.ts
│   ├── __tests__/
│   │   ├── setup.ts                 # Test setup
│   │   ├── unit/                    # Unit tests
│   │   └── integration/             # Integration tests
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
├── eslint.config.js                 # ESLint v9 flat config
├── .mise.toml                       # mise tool versions
├── .secretlintrc.json               # Secretlint rules
├── commitlint.config.js             # Commitlint rules
├── cspell.json                      # Spell check dictionary
├── lint-staged.config.mjs           # Pre-commit file checks
├── package.json                     # Root workspace config
├── prettier.config.cjs              # Prettier formatting rules
├── release.config.mjs               # Semantic release config
├── tsconfig.base.json               # Shared TypeScript config
└── tsconfig.json                    # Root TypeScript config
```

---

## Development Workflow

### Running development servers

```bash
# Run dev mode in all workspaces
npm run dev

# Run dev mode in a specific workspace
npm run dev --workspace=backend
npm run dev --workspace=frontend
```

### Running tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run tests with coverage
npm run test:coverage

# Run tests in a specific workspace
npm test --workspace=backend
npm test --workspace=frontend
```

### Code quality checks

```bash
# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint

# Type check with TypeScript
npm run typecheck

# Scan for secrets
npm run secretlint

# Check spelling
npm run spellcheck

# Run ALL checks (recommended before pushing)
npm run check
```

---

## npm Commands: Root vs Workspace

Understanding when to run commands from the root vs inside a workspace is key to efficient development.

### When to Use Root Commands

Run commands from the **root directory** (`/`) for:

| Scenario                       | Why Root?                                         |
| ------------------------------ | ------------------------------------------------- |
| CI/CD pipelines                | Ensures consistent checks across all workspaces   |
| Before pushing code            | `npm run check` validates everything              |
| Pre-commit hooks               | Automatically runs from root                      |
| Release builds                 | `npm run build` builds all workspaces             |
| Installing shared dependencies | `npm install` in root installs for all workspaces |

```bash
# From root - affects all workspaces
npm run check        # Format + lint + typecheck + test + secretlint + spellcheck
npm run lint         # Lints both backend and frontend
npm run test         # Tests both backend and frontend
npm run build        # Builds both backend and frontend
```

### When to Use Workspace Commands

Run commands in a **specific workspace** for:

| Scenario            | Why Workspace?                          |
| ------------------- | --------------------------------------- |
| Focused development | Faster feedback loop on one package     |
| Running dev server  | Start only backend or frontend          |
| Debugging tests     | Isolate test failures                   |
| Adding dependencies | `npm install <pkg> --workspace=backend` |

```bash
# From root - targets specific workspace
npm run dev --workspace=backend
npm run test --workspace=frontend
npm install express --workspace=backend

# Or cd into workspace
cd backend && npm run dev
cd frontend && npm test
```

### Dependency Installation

| Command                                 | Effect                                            |
| --------------------------------------- | ------------------------------------------------- |
| `npm install` (root)                    | Installs ALL dependencies (root + all workspaces) |
| `npm install <pkg>` (root)              | Adds to root package.json (shared dev tools)      |
| `npm install <pkg> --workspace=backend` | Adds to backend/package.json                      |
| `cd frontend && npm install <pkg>`      | Adds to frontend/package.json                     |

**Best practice:** Install shared dev dependencies (ESLint, Prettier, TypeScript) at root. Install runtime dependencies in the specific workspace.

---

## Tooling Overview

### Pre-commit Hooks (Husky + lint-staged)

When you run `git commit`, the following happens automatically:

1. **lint-staged** runs on staged files:
   - ESLint fixes auto-fixable issues
   - Prettier formats the code
   - CSpell checks spelling
   - Secretlint scans for secrets
   - Related tests run for changed files

2. **commitlint** validates your commit message

If any check fails, the commit is blocked until you fix the issue.

**Example:**

```bash
# Stage your changes
git add src/my-feature.ts

# Commit - pre-commit hooks run automatically
git commit -m "feat(backend): add user authentication"

# If linting fails, you'll see:
# ✖ eslint found issues...
# Fix the issues and try again
```

### Commit Message Format (Commitlint)

This project enforces [Conventional Commits](https://www.conventionalcommits.org/). Every commit message must follow this format:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types:** | Type | Description | |------------|---------------------------------------------------| | `feat` | New feature | | `fix` | Bug fix | | `docs` | Documentation only changes | | `style` | Code style changes (formatting, no logic change) | | `refactor` | Code refactoring (no feature or fix) | | `perf` | Performance improvements | | `test` | Adding or updating tests | | `build` | Build system or dependencies | | `ci` | CI configuration changes | | `chore` | Other changes (e.g., updating .gitignore) | | `revert` | Reverting a previous commit |

**Examples:**

```bash
# Feature
git commit -m "feat(frontend): add login page component"

# Bug fix
git commit -m "fix(backend): resolve database connection timeout"

# Documentation
git commit -m "docs: update README with installation steps"

# Breaking change (triggers major version bump)
git commit -m "feat(api)!: change authentication endpoint response format"
```

**Invalid commits (will be rejected):**

```bash
# Missing type
git commit -m "add new feature"
# ✖ type may not be empty

# Invalid type
git commit -m "feature: add login"
# ✖ type must be one of [feat, fix, docs, ...]

# Starting with uppercase
git commit -m "Feat: add login"
# ✖ type must be lower-case
```

### ESLint (v9 Flat Config)

This project uses **ESLint v9** with the new flat config format (`eslint.config.js`).

```bash
# Check for issues
npm run lint

# ESLint rules include:
# - TypeScript strict rules
# - Import ordering and organization
# - No unused variables
# - No explicit any (except in tests)
# - React hooks rules (frontend)
# - And many more...
```

**Why ESLint v9 Flat Config?**

| Feature        | Legacy (.eslintrc)          | Flat Config (eslint.config.js) |
| -------------- | --------------------------- | ------------------------------ |
| Format         | JSON/YAML/JS with `extends` | JavaScript arrays              |
| Plugin loading | String-based imports        | Direct imports                 |
| Configuration  | Cascading inheritance       | Explicit, predictable          |
| Future support | Removed in ESLint v10       | Default going forward          |

**Configuration files:**

- `/eslint.config.js` - Root config (shared rules for backend)
- `/frontend/eslint.config.js` - Frontend-specific config (React, browser env)

**Customizing rules:**

```javascript
// eslint.config.js
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // ... existing config
  {
    rules: {
      // Add your custom rules here
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
);
```

### Prettier

Formats code consistently:

```bash
# Format all files
npm run format

# Configuration (prettier.config.cjs):
# - 120 character line width
# - 2 space indentation
# - Single quotes
# - Trailing commas
# - Semicolons required
```

### CSpell

Spell checks code and documentation:

```bash
npm run spellcheck

# Add custom words to cspell.json:
{
  "words": [
    "mycompany",
    "customterm"
  ]
}
```

### Secretlint

Prevents accidental secret commits:

```bash
npm run secretlint

# Detects patterns like:
# - API keys
# - Passwords in code
# - Tokens
# - Private keys
```

### Semantic Release

Automatically creates GitHub releases based on commit messages:

| Commit Type                   | Version Bump  | Example                    |
| ----------------------------- | ------------- | -------------------------- |
| `fix:`                        | Patch (0.0.X) | `fix: resolve login bug`   |
| `feat:`                       | Minor (0.X.0) | `feat: add user profile`   |
| `feat!:` or `BREAKING CHANGE` | Major (X.0.0) | `feat!: change API format` |

Releases are triggered automatically when PRs from `dev` are merged to `main`. See [Git Workflow](#git-workflow-and-best-practices) for the full release process.

---

## Git Workflow and Best Practices

This project uses a **two-branch strategy** with `dev` as the integration branch and `main` as the release branch.

### Branch Strategy Overview

```
feature/xxx ──┐
              ├──> dev (integration & code review) ──> main (releases)
fix/xxx ──────┘
```

| Branch            | Purpose                                               | Protected |
| ----------------- | ----------------------------------------------------- | --------- |
| `main`            | Production releases only. Semantic Release runs here. | Yes       |
| `dev`             | Integration branch for code review and testing.       | Yes       |
| `feat/*`, `fix/*` | Individual developer branches.                        | No        |

### Starting a new feature

```bash
# 1. Create a feature branch from dev
git checkout dev
git pull origin dev
git checkout -b feat/user-authentication

# 2. Make your changes and commit frequently
git add src/auth/login.ts
git commit -m "feat(auth): add login form component"

git add src/auth/validation.ts
git commit -m "feat(auth): add form validation"

# 3. Run all checks before pushing
npm run check

# 4. Push your branch
git push -u origin feat/user-authentication

# 5. Create a Pull Request targeting 'dev' branch on GitHub
```

### Fixing a bug

```bash
# 1. Create a fix branch from dev
git checkout dev
git pull origin dev
git checkout -b fix/login-timeout

# 2. Make your fix
git add src/api/client.ts
git commit -m "fix(api): increase timeout for slow connections"

# 3. Push and create PR targeting 'dev'
git push -u origin fix/login-timeout
```

### Pull Request Flow

#### Step 1: Feature/Fix → Dev (Code Review)

1. Push your branch to GitHub
2. Create a Pull Request **targeting `dev`** (not `main`)
3. CI runs automatically:
   - Lint
   - Type check
   - Unit tests
   - Integration tests
   - Secret scan
   - Spell check
   - Coverage report
4. Get code review from teammates
5. Merge to `dev`

#### Step 2: Dev → Main (Automated Release PR)

When changes are merged to `dev`, a GitHub Action automatically:

1. Creates a PR from `dev` to `main` (or updates existing one)
2. The PR accumulates all changes since last release
3. When ready to release, a maintainer merges the PR to `main`
4. Semantic Release analyzes commits and creates a new version

### Release Process

```
dev ──(auto PR)──> main ──(semantic-release)──> GitHub Release v1.2.3
```

1. **Automatic**: When you merge to `dev`, a PR to `main` is created/updated
2. **Manual review**: A maintainer reviews the accumulated changes
3. **Merge to main**: Triggers Semantic Release
4. **Automatic versioning**: Based on commit messages:
   - `fix:` → Patch (0.0.X)
   - `feat:` → Minor (0.X.0)
   - `feat!:` or `BREAKING CHANGE` → Major (X.0.0)

### Setting Up Branch Protection (Recommended)

On GitHub, go to **Settings → Branches → Add rule** for both `main` and `dev`:

**For `main`:**

- Require pull request before merging
- Require status checks to pass
- Require branches to be up to date
- Do not allow bypassing the above settings

**For `dev`:**

- Require pull request before merging
- Require status checks to pass
- Require approvals (1 or more reviewers)

---

## Example: Building a Full-Stack App

This section shows how to transform this starter into a full-stack application with:

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Fastify + PostgreSQL

### Step 1: Set up the Frontend (React + Vite + Tailwind)

```bash
# Navigate to frontend workspace
cd frontend

# Remove the starter placeholder files
rm -rf src/* __tests__/unit/* __tests__/integration/*

# Initialize Vite with React template
npm create vite@latest . -- --template react-ts

# Note: When prompted, select "Ignore files and continue"
```

Update `frontend/package.json` to keep workspace scripts:

```json
{
  "name": "@app/frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint ./src --ext .ts,.tsx",
    "typecheck": "tsc --noEmit",
    "test": "vitest --no-cache --run --silent",
    "test:coverage": "vitest --coverage --run --silent",
    "test:unit": "vitest unit --run --silent",
    "test:integration": "vitest int --run --silent"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
```

Install Tailwind CSS:

```bash
# Still in frontend/
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure Tailwind (`frontend/tailwind.config.js`):

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Add Tailwind to CSS (`frontend/src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Create a test component (`frontend/src/App.tsx`):

```tsx
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">Hello from React + Tailwind!</h1>
        <p className="mt-4 text-gray-600">Your frontend is ready.</p>
      </div>
    </div>
  );
}

export default App;
```

Add a unit test (`frontend/__tests__/unit/App.unit.test.tsx`):

```tsx
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('App', () => {
  it('renders the greeting', () => {
    render(<App />);
    expect(screen.getByText(/Hello from React/i)).toBeInTheDocument();
  });
});
```

Install testing dependencies:

```bash
npm install -D @testing-library/react @testing-library/jest-dom jsdom
```

Update `frontend/vitest.config.ts`:

```ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: '__tests__/setup.ts',
    coverage: {
      enabled: true,
      reporter: ['json-summary', 'json', 'html'],
      include: ['src/**/*'],
      reportOnFailure: true,
    },
  },
});
```

Update `frontend/__tests__/setup.ts`:

```ts
import '@testing-library/jest-dom';
```

Run frontend tests:

```bash
# From frontend/
npm test

# From root
npm test --workspace=frontend
```

Start the frontend dev server:

```bash
# From frontend/
npm run dev

# Open http://localhost:5173
```

### Step 2: Set up the Backend (Fastify + PostgreSQL)

```bash
# Navigate back to root, then to backend
cd ../backend

# Remove placeholder files
rm -rf src/* __tests__/unit/* __tests__/integration/*

# Install Fastify and PostgreSQL dependencies
npm install fastify @fastify/postgres pg
npm install -D @types/pg
```

Create the Fastify server (`backend/src/server.ts`):

```ts
import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', async () => {
  return { message: 'Hello from Fastify!' };
});

fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

export { fastify };
```

Create the entry point (`backend/src/index.ts`):

```ts
import { fastify } from './server.js';

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

Update `backend/package.json`:

```json
{
  "name": "@app/backend",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint ./src ./__tests__ --ext .ts",
    "typecheck": "tsc --noEmit",
    "test": "vitest --no-cache --run --silent",
    "test:coverage": "vitest --coverage --run --silent",
    "test:unit": "vitest unit --run --silent",
    "test:integration": "vitest int --run --silent"
  },
  "dependencies": {
    "fastify": "^4.28.0",
    "@fastify/postgres": "^5.2.2",
    "pg": "^8.12.0"
  },
  "devDependencies": {
    "@types/pg": "^8.11.6",
    "tsx": "^4.16.0"
  }
}
```

Add a unit test (`backend/__tests__/unit/server.unit.test.ts`):

```ts
import { fastify } from '../../src/server.js';

describe('Fastify Server', () => {
  afterAll(async () => {
    await fastify.close();
  });

  describe('GET /', () => {
    it('returns a greeting message', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/',
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ message: 'Hello from Fastify!' });
    });
  });

  describe('GET /health', () => {
    it('returns health status', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/health',
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toHaveProperty('status', 'ok');
      expect(response.json()).toHaveProperty('timestamp');
    });
  });
});
```

Install tsx for development:

```bash
npm install -D tsx
```

Run backend tests:

```bash
# From backend/
npm test

# From root
npm test --workspace=backend
```

Start the backend dev server:

```bash
# From backend/
npm run dev

# Test with curl
curl http://localhost:3000
# {"message":"Hello from Fastify!"}

curl http://localhost:3000/health
# {"status":"ok","timestamp":"2024-..."}
```

### Step 3: Final verification

```bash
# Go back to root
cd ..

# Run all checks
npm run check

# This will:
# 1. Format all code
# 2. Lint frontend and backend
# 3. Type check both
# 4. Scan for secrets
# 5. Check spelling
# 6. Run all tests
```

### Step 4: Commit your changes

```bash
# Stage all changes
git add .

# Commit with conventional commit message
git commit -m "feat: set up React frontend and Fastify backend

- Add React with Vite and Tailwind CSS to frontend
- Add Fastify server with health endpoint to backend
- Add unit tests for both workspaces"

# Push to your feature branch and create PR to dev
git push -u origin feat/setup-fullstack

# Then create a PR targeting 'dev' on GitHub
# After review and merge to dev, a PR to main will be auto-created
```

---

## Available Scripts

### Root Level

| Script                     | Description                      |
| -------------------------- | -------------------------------- |
| `npm run check`            | Run all quality checks           |
| `npm run format`           | Format code with Prettier        |
| `npm run lint`             | Lint all workspaces              |
| `npm run typecheck`        | Type check all workspaces        |
| `npm run test`             | Run all tests                    |
| `npm run test:unit`        | Run unit tests only              |
| `npm run test:integration` | Run integration tests only       |
| `npm run test:coverage`    | Run tests with coverage          |
| `npm run secretlint`       | Scan for secrets                 |
| `npm run spellcheck`       | Check spelling                   |
| `npm run build`            | Build all workspaces             |
| `npm run dev`              | Start dev mode in all workspaces |

### Workspace-Specific

```bash
# Run a script in a specific workspace
npm run <script> --workspace=backend
npm run <script> --workspace=frontend

# Examples
npm run dev --workspace=frontend
npm test --workspace=backend
```

---

## Troubleshooting

### ESLint Issues

**"ESLint couldn't find an eslint.config.js file"**

This project uses ESLint v9 flat config. Ensure you have `eslint.config.js` (not `.eslintrc.*`) in your project root.

**"Parsing error: Cannot find module"**

Run `npm install` to ensure all dependencies are installed. ESLint v9 uses direct imports.

### Pre-commit Hook Failures

**Hook runs but doesn't find files**

Ensure you've staged files with `git add` before committing.

**Commitlint rejects message**

Your commit message must follow conventional commits format:

```bash
# Good
git commit -m "feat(auth): add login endpoint"

# Bad - missing type
git commit -m "add login endpoint"

# Bad - uppercase type
git commit -m "Feat: add login"
```

### Test Failures

**"Cannot find module" in tests**

Ensure the workspace has `vitest` configured in `vitest.config.ts` and test globals are enabled.

**Tests pass locally but fail in CI**

Run `npm run check` locally to replicate CI checks exactly.

### Workspace Issues

**"Missing script" error**

Ensure the specific workspace has the script defined in its `package.json`. Root scripts delegate to workspaces.

**Dependencies not found**

Run `npm install` from root to install all workspace dependencies.

### Using Bun

This starter includes Bun in the mise config. To use Bun for the backend:

```bash
# Ensure bun is installed
mise install

# Navigate to backend and use bun
cd backend
bun run dev
bun test
```

Note: The monorepo root scripts use npm. Use bun directly in the backend workspace for bun-specific features.

---

## License

MIT
