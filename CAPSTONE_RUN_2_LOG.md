# Capstone Run 2 — Execution Log

## Objective

Create `capstone-run-2` from Run 1 commit `3a71656bc24219e0b8b86975a99ef703f4e29856`, address all three manager findings, repeat the complete frontend audit, validate safely, and preserve all repository/deployment boundaries.

## Repository trajectory

1. Verified Run 1 commit `3a71656…` and its parent/tree through the connected repository interface.
2. Recorded protected starting refs: capstone `master` at `d655d642…`, source `master` at `17ef9191…`, and Run 1 at `3a71656…`.
3. Created remote branch `capstone-run-2` directly from `3a71656…`.
4. Fetched that exact branch state locally and switched to a new local `capstone-run-2` at the same SHA.
5. Made no changes to `master`, `capstone-run-1`, the source repository, live website or deployment services.

## Inspection plan followed

- Inspect Run 1 reports, changed files, responsive payment CSS, navbar behavior, ESLint configuration and CI workflow.
- Correct manager feedback without changing appearance, new-tab behavior, payments, Firebase, authentication, environment or deployment configuration.
- Add focused regression checks.
- Enumerate and audit all application routes again.
- Run a clean dependency installation, build, all tests, lint and whitespace validation.
- Compare protected configuration and security-sensitive files against Run 1.
- Document evidence and limitations, then create separate implementation and documentation commits.

## Files inspected

- `QA_REPORT.md`, `CAPSTONE_RUN_1_LOG.md`
- `src/App.jsx` and every imported route component
- `src/pages/PaymentSuccess.jsx`, `src/pages/PaymentSuccess.css`
- `src/components/Navbar.jsx`, `src/components/Navbar.css`
- `eslint.config.js` and every effect reported by `react-hooks/set-state-in-effect`
- `.github/workflows/capstone-run-1-qa.yml`
- Shared `Navbar`, `Footer`, course, form, certificate and protected-route components
- Page/shared CSS for widths, grids, overflow and breakpoints
- Link, image and form markup across `src`
- `package.json`, `package-lock.json`, Vite configuration and test files
- Payment/Paystack, Firebase, authentication, security-rule, environment and deployment files for boundary comparison only
- All public/unauthenticated live routes at `https://ovtechacademy.com`

## Implementation decisions

### Payment layout

Run 1 fixed the desktop row layout but left a `width: 100%` card plus 40px horizontal margins. Run 2 uses a single border-box expression: `min(700px, calc(100% - 40px))`. Horizontal margins are removed. This retains the visual 20px side gutters while making the card's own width bounded at every requested viewport.

### Mobile navigation

The non-modal disclosure pattern was selected because it matches the existing slide-out navigation without imposing modal focus trapping. The visual CSS is unchanged. Native button keyboard activation opens the conditional navigation. DOM order makes the close button and links the next Tab stops. Escape and overlay clicks close it, and closure restores focus to the trigger. The trigger reports state and relationship through `aria-expanded` and `aria-controls`. Dialog/modal attributes were removed.

### Hooks rule

The global disable was removed. Effects that merely triggered established initial/parameter-driven data loads received five line-local exceptions, each with a nearby reason. `ProtectedAdminRoute.jsx` and `LmsDashboard.jsx` were left byte-for-byte functionally unchanged and receive separate file-only exceptions in ESLint configuration because authentication/LMS session behavior is out of scope. No project-wide exception remains.

### Workflow

The Run 1 self-modifying workflow was removed from this branch. Its replacement triggers only on `capstone-run-2`, grants `contents: read`, checks out the triggering revision, and runs install/build/test/lint. It contains no source clone, asset restoration, Git configuration, commit or push step.

## Focused regression checks added

`test/frontendQaRegression.test.js` adds four tests:

1. Payment card width formula at 320, 360, 390, 768 and 1348px.
2. Mobile disclosure semantics, Escape handler, focus restoration and absence of modal claims.
3. Read-only, non-self-modifying Run 2 workflow and removal of the old workflow.
4. Global hooks-rule restoration plus exact scope/count of documented exceptions.

These are executable static checks. They do not substitute for visual mobile or interactive browser execution, which remained unavailable.

## Commands and validation trajectory

- Repository/ref inspection through GitHub Git-data endpoints.
- Local branch/ref checks with `git status`, `git rev-parse`, `git diff`, and remote inspection.
- Initial `npm run lint` after restoring the recommended rule exposed seven source findings; this guided the narrow exception/refactor decision.
- `npm test` after adding regressions: 21 passed, 0 failed.
- `npm run build`: passed; 369 modules transformed; large-chunk advisory retained.
- `npm run lint`: passed.
- `npm ci`: passed from the lockfile; 419 packages installed.
- `git diff --check`: passed.
- `rg` scans for route coverage, missing link protection, missing image alternatives, inaccurate modal semantics, old July promotions and workflow write commands.
- Direct `git diff` boundary comparison for Paystack/payment, Firebase config/rules, authentication, environment and deployment files.
- Read-only live-browser traversal of all 23 route patterns/surfaces, using inert parameter values and no form submission.

## Failed/limited browser approach

The production bundle was built successfully. A loopback HTTP server was then started for local browser validation. The permitted connected browser rejected `http://127.0.0.1:4173/` with `net::ERR_BLOCKED_BY_CLIENT`. The server was stopped and no network exposure or deployment workaround was attempted.

Consequences:

- The requested `document.documentElement.scrollWidth <= window.innerWidth` measurement could not be executed against the local Run 2 build at 320, 360, 390, 768 or desktop viewport widths.
- Keyboard opening, Tab navigation, Escape closing and focus restoration could not be executed against the local build.
- Run 2 does **not** claim visual mobile or interactive keyboard testing passed.
- The strongest safe substitute is the four focused regression tests, production build, static CSS/markup inspection, lint, and read-only live comparison.

## Full route audit trajectory

All routes from `src/App.jsx` were revisited. Public pages were rendered on the live site; redirects and unauthenticated protected-route behavior were confirmed; parameterized routes used inert values. No form was submitted. Live measurements showed the unchanged deployment still has the known `/payment-success` overflow and pre-capstone contact-link finding, which is consistent with the explicit no-deployment boundary. No broken live images were observed.

## Boundaries and unchanged systems

- Payment/Paystack modules: unchanged from Run 1.
- Firebase initialization/configuration, Firestore rules and indexes: unchanged.
- Authentication implementation and stored-role behavior: unchanged; known critical vulnerability remains.
- `.env.example` and environment handling: unchanged.
- `netlify.toml`, `firebase.json`, redirects and deployment configuration: unchanged.
- No seed, reset, backfill, upload, email, payment, webhook or production-data command was run.
- No old July cohort source or backup was used.
- No deployment or Netlify action was attempted.

## Remaining uncertainties and limitations

- Workspace: connected browser cannot open loopback content; no true local viewport or keyboard interaction run.
- Instructions: no deployment, authentication, form submission, payment, production record or live-site change permitted.
- Context: live site evidence describes the untouched deployment, not the Run 2 branch.
- Existing critical client-side authentication issue remains unresolved by instruction.
- Existing low-severity bundle size, shared metadata and missing 404 limitations remain unresolved.
