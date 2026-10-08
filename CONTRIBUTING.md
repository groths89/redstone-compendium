# Contributing Guidelines & Branch Strategy

To maintain high code quality and smooth CI/CD deployments, please follow our standard branching conventions when working on `redstone-compendium`.

## Branch Naming Conventions

### 1. Feature Branches (`feature/*` or `feat/*`)
* **Naming:** `feature/redstone-comparator-logic`, `feat/blueprint-sharing-ui`
* **Purpose:** Isolated development for new features, UI components, or logic gates.
* **Pipeline Behavior:** Pull Requests targeting `staging` or `main` run the full test suite (Vitest + Playwright) and block merge if tests fail. Does **not** trigger deployments.

### 2. Bug Fix Branches (`fix/*` or `bugfix/*`)
* **Naming:** `fix/repeater-tick-delay`, `bugfix/cors-preflight`
* **Purpose:** Resolving bugs identified during testing or found in staging/production.
* **Pipeline Behavior:** Runs full test suite on PR. Merging into `staging` automatically deploys to the Cloudflare Workers staging environment.

### 3. Hotfix Branches (`hotfix/*`)
* **Naming:** `hotfix/api-crash-null-gate`
* **Purpose:** Emergency fixes for critical issues currently affecting the live production environment.
* **Pipeline Behavior:** Branches directly off `main` and targets `main` via PR. Once merged, tests run and it automatically deploys to Cloudflare Workers production.

### 4. Maintenance / Refactoring (`refactor/*` or `chore/*`)
* **Naming:** `refactor/express-middleware-restructure`, `chore/update-playwright-deps`
* **Purpose:** Internal code cleaning, dependency updates, or middleware restructuring.

---

## Deployment Workflow

1. Branch off `staging` using the appropriate prefix (`feat/`, `fix/`, `chore/`).
2. Push your branch and open a Pull Request targeting `staging`.
3. Verify that all GitHub Actions status checks pass (Vitest & Playwright) and review the live HTML test report.
4. Merge into `staging` to trigger the automated staging deployment.
5. Create a PR from `staging` to `main` for production releases.