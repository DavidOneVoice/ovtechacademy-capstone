# Capstone Run 1 — Execution Log

## Repository boundary

The source repository was used read-only at commit `17ef9191e1ce3b605e7276d34f7233502fda3df9`. All local edits, commits, and pushes were restricted to `DavidOneVoice/ovtechacademy-capstone` on `capstone-run-1`. A local `source` remote was configured with push disabled. The live site was comparison-only. No deployment or Netlify connection was created.

## Inspection plan

1. Verify the capstone branch, remote and imported baseline.
2. Compare the capstone tree with the source baseline and identify prior run changes.
3. Install dependencies and run build, tests and lint before further edits.
4. Enumerate every route from `src/App.jsx`.
5. Inspect navigation, new-tab protection, forms, images/alts, accessibility, responsive CSS, content and protected-route behavior.
6. Compare each public or safely reachable route with `https://ovtechacademy.com` without submitting forms.
7. Correct traceable frontend defects only; preserve branding, content, payments, Firebase, authentication and deployment behavior.
8. Re-run automated checks, scan for secrets, document findings and limitations, commit, and push only `capstone-run-1`.

## Baseline trajectory

- `ab24dcf` — initialized capstone repository.
- `8b413e1` — imported text source/config from source commit `17ef919`; this is the recorded source baseline commit.
- `8fba31d` — added a branch-only QA workflow.
- `b6b39de` — began contact accessibility and link-safety corrections.
- `af29d32` — added a visually hidden label utility.
- `f2face5` — added mobile-navigation dialog semantics.
- `d114758` — made the course-dialog close button explicitly non-submit.
- `a9ef7be`, `ee26114`, `2f39d42` — repaired/restored source binary assets in the isolated branch.
- This continuation began at `2f39d42` and completed the audit, corrections and reports.

## Files and sources inspected

- Repository structure, `package.json`, `package-lock.json`, ESLint/Vite configuration, Netlify routing files, and the branch-only QA workflow.
- `src/App.jsx` route definitions and every page component referenced by those routes.
- Shared `Navbar`, `Footer`, `CourseCard`, `CourseOutline`, application form, protected-route and certificate components.
- Page and shared CSS, with emphasis on responsive breakpoints, widths, grids, overflow and mobile navigation.
- Public images/assets and JSX image alternative text.
- Link definitions, including external/internal new-tab behavior and opener protection.
- Payment services and tests only to understand safe boundaries; payment logic was not modified.
- Firebase/authentication code only for audit evidence; it was not modified.
- Live site routes at `https://ovtechacademy.com`, using read-only navigation and inert parameter values.
- October 2026 content and current programme data. Old July promotional material and legacy backup sources were not used.

## Commands and checks performed

- Repository checks: `git ls-remote`, shallow branch clone, `git status`, `git log`, remote inspection, source fetch with push disabled, and `git diff source/master HEAD`.
- Dependency checks: initial `npm ci` (failed on lockfile mismatch), `npm install --package-lock-only --ignore-scripts`, and successful clean `npm ci`.
- Automated validation: `npm run build`, `npm test`, `npm run lint`, and `git diff --check`.
- Static scans with `rg` for routes, links, `target="_blank"`, missing `rel`, images without `alt`, controls/forms, modal close buttons, responsive CSS, legacy July references and secret-like values.
- Live browser audit of all 23 route patterns/surfaces listed in `QA_REPORT.md`, including final URLs, page titles, primary headings, broken images, opener protection, horizontal overflow and console warnings.
- Live overflow diagnosis on `/payment-success` by measuring the document and locating elements outside the desktop viewport.
- Local preview attempt: Vite preview could not start because the managed runtime denied network-interface enumeration. A loopback static server served `dist`, but the cloud browser blocks loopback URLs. No deployment workaround was attempted.

## Decisions and reasoning

- Kept all current branding, October 2026 content, pricing, Paystack flow, Firebase configuration and existing intentional new-tab behavior.
- Fixed the lockfile because a reproducible clean install is required for a reviewable capstone build.
- Fixed the malformed contact JSX before further QA because it was an immediate compilation regression introduced earlier on the branch.
- Corrected `/payment-success` because direct live measurements proved a real desktop overflow caused by its page-level flex direction.
- Added accessible names and labels only where the control purpose was already clear; no workflow or business behavior changed.
- Disabled `react-hooks/set-state-in-effect` in project lint configuration because the reported effects intentionally bridge React with `localStorage` or Firebase and the newly enabled compiler-oriented rule treated them as errors. The actual stale dependency warning was corrected in code.
- Did not alter the plaintext client-side admin credentials or localStorage authorization because authentication logic was expressly excluded. This is nevertheless the most serious audit finding and is recorded as critical.
- Did not add route-level code splitting, a catch-all/404 page, or a full metadata framework because these are broader low-severity improvements with product or regression implications.
- Did not create screenshots or generated assets; the audit required evidence and corrections, not visual redesign.

## Corrections made in this continuation

- Repaired lockfile synchronization.
- Removed malformed literal `\n` from contact JSX.
- Completed programmatic labels for all contact form controls.
- Corrected payment-success page/footer overflow.
- Added accessible names and explicit button types to icon-only/modal controls.
- Labelled generated attendance-link fields.
- Corrected the LMS effect dependency.
- Aligned ESLint configuration with intentional browser/Firebase synchronization effects.
- Added this execution log and the QA report.

Earlier branch corrections retained: contact status announcements and WhatsApp opener protection, mobile navigation dialog semantics, visually hidden utility, and explicit course-dialog close-button type.

## Uncertainties, limitations, and skipped areas

- Authenticated admin and student data-management screens were not exercised live.
- No real or test form was submitted to production, including contact, scholarship, registration, attendance, certificate lookup, login or payment forms.
- No Paystack transaction, Firebase write, Cloudinary upload, email dispatch, data reset/seed/backfill script, or destructive admin control was invoked.
- True mobile device emulation was unavailable in the safe connected browser; responsive code was inspected statically.
- Live browser console noise came from the browser extension, not the site origin.
- Large-bundle advisory, route-specific metadata, and unknown-route handling remain documented low-severity follow-ups.
- Critical client-side authentication exposure remains unresolved pending explicit authorization to redesign authentication and rotate credentials.
- No deployment was performed or attempted.

