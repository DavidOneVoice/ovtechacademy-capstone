# OVTech Academy — Capstone Run 2 QA Report

## Scope and branch isolation

- Run 1 final commit: `3a71656bc24219e0b8b86975a99ef703f4e29856`
- Run 2 branch: `capstone-run-2`, created directly from that commit
- Source repository: `DavidOneVoice/ovtechacademy` at `17ef9191e1ce3b605e7276d34f7233502fda3df9` (read-only)
- Capstone protected branches: `master` and `capstone-run-1` (read-only during Run 2)
- Live comparison: `https://ovtechacademy.com` (read-only)

No deployment, Netlify connection, payment, form submission, production login, credential use, Firebase write, or production record creation occurred.

## Run 2 compared with Run 1

| Manager feedback | Run 1 state | Run 2 improvement | Validation evidence |
| --- | --- | --- | --- |
| 1. Mobile overflow validation | `.payment-success-card` combined `width: 100%` with `20px` horizontal margins. The outer box could be 40px wider than its container. | The card now uses `width: min(700px, calc(100% - 40px))` with no horizontal margin. Its border-box is capped at 700px and always reserves a 20px gutter on both sides. | Focused Node regression checks calculate the border-box at 320, 360, 390, 768 and 1348px and assert it is no wider than the viewport. Build and CSS inspection pass. A local browser could not be connected, so **visual mobile testing and the requested live DOM measurement are not claimed**. |
| 2. Mobile-menu accessibility | Run 1 declared a modal dialog without focus containment, Escape closing or trigger state. | Replaced the inaccurate modal with a recognised non-modal disclosure/navigation pattern. The trigger exposes `aria-expanded` and `aria-controls`; the navigation has the matching ID and label; Escape and outside-click close it; closing restores focus to the trigger. Existing appearance and new-tab links are preserved. | Focused regression checks assert state/relationship attributes, absence of modal semantics, Escape handling and focus restoration. ESLint/build pass. Local interactive keyboard testing was blocked by the workspace browser boundary, so no visual/interactive pass is claimed. |
| 3. QA configuration and workflow safety | Run 1 globally disabled `react-hooks/set-state-in-effect`. Its workflow granted `contents: write`, cloned the source, restored assets, committed and pushed. | Recommended hook rules are restored globally. Five call sites have line-local exceptions with adjacent reasons; two unchanged, out-of-scope authentication/LMS files have explicit file-only exceptions. The workflow is now Run-2-only, `contents: read`, checks out the triggering commit, and only installs/builds/tests/lints. | `npm run lint` passes. Regression checks assert exactly two scoped file exceptions, five line exceptions, no global disable, no write permission, no `git commit`, no `git push`, and removal of the restoration workflow. |

## Complete route audit

| Route | Run 2 audit result |
| --- | --- |
| `/` | Home rendered live; headings, links, images, desktop overflow and opener protection checked. No broken image or desktop overflow observed. |
| `/courses` | Catalogue rendered live; current six-course and October 2026 content, links and dialog implementation reviewed. No broken image or desktop overflow observed; legacy July material was not used. |
| `/alumni` | Public directory rendered; filters, pagination entry point, metadata, links and states reviewed. No destructive action. |
| `/scholarship` | Application rendered; labels, course data and safe validation inspected. Form not submitted. |
| `/register` | Full-tuition form rendered; pricing/presentation inspected. Paystack not initiated. |
| `/registration/complete` | Opened without a payment reference. No verification completion or registration submission attempted. |
| `/scholarship-payment` | Opened without an application reference. No payment initiated. |
| `/lms` | Unauthenticated sign-in surface rendered; implementation inspected without credentials. |
| `/LMS` | Redirect to `/lms` confirmed. |
| `/student-lms` | Redirect to `/lms` confirmed. |
| `/admin-login` | Login surface rendered; no credentials used. Known authentication vulnerability remains unresolved. |
| `/attendance/:sessionId` | Inert ID `qa-safe-invalid-session` used; page rendered and no attendance submitted. |
| `/admin` | Unauthenticated redirect to `/admin-login` confirmed. |
| `/admin/assistant` | Unauthenticated redirect to `/admin-login` confirmed. |
| `/admin/lms` | Unauthenticated redirect to `/admin-login` confirmed. |
| `/admin/live-sessions` | Unauthenticated redirect to `/admin-login` confirmed. |
| `/enrolled-students` | Unauthenticated redirect to `/admin-login` confirmed. |
| `/admin/graduated-students` | Unauthenticated redirect to `/admin-login` confirmed. |
| `/payment-success` | Live site still shows the Run 1/source deployment and its known desktop overflow. Run 2 capstone CSS is corrected and statically regression-tested but not deployed. |
| `/contact` | Live site still exposes the pre-capstone WhatsApp `rel` finding; the Run 1/Run 2 capstone code retains the correction. Form not submitted. |
| `/about` | Rendered live; content, links, images and desktop overflow checked. |
| `/verify` | Search surface rendered; no lookup submitted. |
| `/verify/:certificateId` | Inert ID `QA-SAFE-INVALID` used; loading/error behavior reviewed without changing data. |

There are 23 distinct route patterns/surfaces in `src/App.jsx` (including redirects, protected routes and parameterized routes); all are accounted for above.

## Broader frontend findings

- Static scan found no JSX image missing an `alt` attribute.
- Static scan found no JSX `target="_blank"` link missing a `rel` attribute.
- Live audit found no broken images on the inspected unauthenticated route surfaces.
- Existing internal new-tab behavior and `noopener noreferrer` protection remain unchanged.
- Responsive breakpoints and mobile navigation CSS were reviewed across shared and page styles.
- No current code references an old July cohort promotion; ordinary calendar/month data and LMS datasets were excluded from that determination.
- The production build still reports one large JavaScript chunk (`879.95 kB` minified). This remains the Run 1 low-severity performance limitation.
- Route-specific metadata remains incomplete on several public pages, and there is still no catch-all 404 route. Both remain Run 1 low-severity limitations.

## Validation results

| Validation | Result |
| --- | --- |
| Clean `npm ci` | Pass; 419 packages installed. |
| `npm run build` | Pass; 369 modules transformed. Large-chunk advisory remains. |
| `npm test` | Pass; 21 tests, 0 failures (17 existing + 4 Run 2 regression checks). |
| `npm run lint` | Pass with recommended hooks rules active globally. |
| `git diff --check` | Pass. |
| New-tab protection scan | Pass in capstone source. |
| Image-alt scan | Pass in capstone source. |
| Workflow safety regression | Pass; read-only permission and no self-modifying commands. |
| Configuration boundary comparison | Payment/Paystack, Firebase configuration/rules, authentication implementation, environment template, Netlify and deployment files have no Run 2 functional changes. |

## Unresolved items

1. **Critical authentication vulnerability — unchanged by instruction.** Plaintext client-side admin credentials and localStorage-controlled roles remain. This was explicitly outside authorised scope. No credential was used.
2. **Large production bundle — low severity.** Route-level code splitting remains future work.
3. **Incomplete route metadata — low severity.** Several routes retain the shared title.
4. **No catch-all route — low severity.** Unknown paths may render an empty application shell.
5. **Local interactive viewport/keyboard evidence unavailable.** The permitted connected browser rejects loopback URLs with `net::ERR_BLOCKED_BY_CLIENT`. Run 2 therefore uses executable static regression checks and does not claim visual mobile or interactive keyboard testing passed.

## Limitation classification

| Limitation | Origin |
| --- | --- |
| Live site cannot demonstrate Run 2 changes because deployment is prohibited. | **Instructions** |
| Local capstone cannot be opened in the connected browser because loopback navigation is blocked. | **Workspace** |
| True local DOM checks at 320/360/390/768 and desktop, plus interactive keyboard execution, were therefore unavailable. | **Workspace** |
| Protected admin/LMS states were not exercised using credentials. | **Instructions** |
| Payment, contact, registration, attendance and certificate forms were not submitted. | **Instructions** |
| The live site represents the unchanged source/Run 1-era deployment, not the Run 2 branch. | **Context** |
