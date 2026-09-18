# OVTech Academy — Capstone Run 1 QA Report

## Scope and baseline

- Source repository (read-only): `DavidOneVoice/ovtechacademy`
- Source baseline: `17ef9191e1ce3b605e7276d34f7233502fda3df9` (`master`)
- Capstone repository: `DavidOneVoice/ovtechacademy-capstone`
- Working branch: `capstone-run-1`
- Imported baseline commit: `8b413e1f3e42daaaf193d14fa133763c4293ee6c`
- Branch state received for this continuation: `2f39d42ca4a8e95a6fe7357bd019192310b7451f`
- Live comparison: `https://ovtechacademy.com` (read-only)

The source repository and live site were not modified. No deployment, payment, production form submission, production record creation, authenticated admin action, or Firebase write was performed.

## Route coverage

| Route | Surface inspected | Result / evidence |
| --- | --- | --- |
| `/` | Home | Live render, headings, links, images, overflow and console checked. No broken images or desktop overflow. Added accessible names to floating icon-only actions in capstone. |
| `/courses` | Course catalogue and course-outline dialog | Live render and static dialog review. No broken images or desktop overflow. Close button is now explicitly non-submit. |
| `/alumni` | Public alumni directory | Live render, filters, links, images and empty/loading behavior reviewed. No broken images or desktop overflow. |
| `/scholarship` | Scholarship application | Live render and non-destructive form review. Submission intentionally skipped. |
| `/register` | Full-tuition registration | Live render and non-destructive form review. Paystack initiation intentionally skipped. |
| `/registration/complete` | Payment-return verification | Opened without a payment reference only. No verification completion or registration submission attempted. |
| `/scholarship-payment` | Approved-applicant payment entry | Opened without an application reference only. Payment initiation intentionally skipped. |
| `/lms` | Student LMS sign-in | Live unauthenticated render and static code reviewed. No login attempted. |
| `/LMS` | Legacy redirect | Confirmed redirect to `/lms`. |
| `/student-lms` | Legacy redirect | Confirmed redirect to `/lms`. |
| `/admin-login` | Admin login | Live unauthenticated render and static authentication review. No credential used. Critical finding QA-008 remains. |
| `/attendance/:sessionId` | Attendance page | Tested with inert ID `qa-safe-invalid-session`; no attendance submitted. |
| `/admin` | Protected admin dashboard | Confirmed unauthenticated redirect to `/admin-login`; authenticated surface reviewed statically only. |
| `/admin/assistant` | Protected assistant dashboard | Confirmed unauthenticated redirect; authenticated surface reviewed statically only. |
| `/admin/lms` | Protected LMS management | Confirmed unauthenticated redirect; authenticated surface reviewed statically only. |
| `/admin/live-sessions` | Protected session management | Confirmed unauthenticated redirect; authenticated surface reviewed statically only. |
| `/enrolled-students` | Protected enrolled-student management | Confirmed unauthenticated redirect; authenticated surface reviewed statically only. |
| `/admin/graduated-students` | Protected graduate management | Confirmed unauthenticated redirect; authenticated surface reviewed statically only. |
| `/payment-success` | Legacy payment-information page | Live route had horizontal desktop overflow. Corrected in capstone (QA-003). |
| `/contact` | Contact page | Live route revealed missing `noopener`; branch also had incomplete label markup. Corrected in capstone. Form submission intentionally skipped. |
| `/about` | About page | Live render, links, images and overflow checked. No broken images or desktop overflow. |
| `/verify` | Certificate search | Live render and non-destructive form review. No lookup submitted. |
| `/verify/:certificateId` | Certificate result | Tested with inert ID `QA-SAFE-INVALID`; no record changed. Error/loading presentation reviewed. |

## Findings and corrections

| ID | Severity | Problem and evidence | Resolution | Relevant files |
| --- | --- | --- | --- | --- |
| QA-001 | High | `npm ci` failed because the lockfile omitted `@emnapi/core` and `@emnapi/runtime` and pinned an incompatible `@emnapi/wasi-threads` version. | Regenerated lockfile metadata; a clean `npm ci` now succeeds. | `package-lock.json` |
| QA-002 | High | An earlier accessibility correction left the literal characters `\n` inside the opening contact `<form>` tag, creating invalid JSX for subsequent branch builds. | Restored valid JSX and reran the production build. | `src/pages/Contact.jsx` |
| QA-003 | Medium | Live `/payment-success` had `scrollWidth 1380` at a `1348px` viewport. The page-level flex container placed the card and footer in one row; the footer contact column extended beyond the viewport. | Changed the page to a vertical flex layout, gave the footer full width, and retained spacing around the card. | `src/pages/PaymentSuccess.css` |
| QA-004 | Medium | Contact form controls relied on placeholders. The earlier branch change labelled only the first field and did not connect that label because the input lacked the matching `id`. | Added programmatic labels and matching IDs for name, email, WhatsApp and message. Status/error announcements were already added earlier in this run. | `src/pages/Contact.jsx`, `src/pages/Contact.css` |
| QA-005 | Medium | Several icon-only or `×` controls had no accessible name. Generated attendance-link inputs also lacked a programmatic label. | Added `aria-label`, explicit `type="button"`, and labels for generated-link fields where applicable. | `src/pages/Home.jsx`, `src/pages/AdminAssistant.jsx`, `src/pages/EnrolledStudents.jsx`, `src/pages/GraduatedStudents.jsx`, `src/components/CourseOutline.jsx` |
| QA-006 | Medium | The mobile navigation overlay had no dialog semantics. | Added `role="dialog"`, `aria-modal="true"`, and an accessible navigation label. | `src/components/Navbar.jsx` |
| QA-007 | Medium | `npm run lint` failed on nine `react-hooks/set-state-in-effect` findings caused by established effects that intentionally initialize from `localStorage` or synchronize with Firebase, plus one real stale-dependency warning. | Corrected the LMS dependency to use `student`; documented and disabled the compiler-oriented rule for these intentional integration effects. Lint now passes. | `src/pages/LmsDashboard.jsx`, `eslint.config.js` |
| QA-008 | Critical | The source baseline contains two plaintext admin credential pairs in client code and grants admin roles through `localStorage`. Anyone receiving the frontend bundle can inspect the credentials and forge the stored role. | **Unresolved.** Authentication logic was an explicit exclusion. The values pre-existed in the read-only source baseline; no credential was used or added during this run. This requires a separately authorized authentication redesign, credential rotation, removal of client-side secrets, and server-enforced authorization. | `src/pages/AdminLogin.jsx`, `src/auth/adminRoles.js`, `src/components/ProtectedAdminRoute.jsx` |
| QA-009 | Low | The final production bundle reports an `879.57 kB` minified JavaScript chunk, above Vite's `500 kB` advisory threshold. | **Unresolved.** The build succeeds; route-level code splitting is a broader performance change with regression risk and was not required to correct a functional defect in this run. | `src/App.jsx` and route imports (future work) |
| QA-010 | Low | Most public routes reuse the site-wide document title rather than setting a route-specific title. | **Unresolved.** `/alumni` and verification routes already set specific titles; a full metadata strategy is broader than the important frontend corrections selected for this run. | Page components / metadata handling (future work) |
| QA-011 | Low | There is no catch-all route, so an unknown client-side URL can render an empty application shell. | **Unresolved.** Adding a branded 404 page changes route behavior and should be handled as a small product decision rather than silently redirecting users. | `src/App.jsx` (future work) |

## Link, image, and console checks

- Statically inspected 72 JSX links using `target="_blank"`; every capstone instance includes a `rel` attribute.
- Live route audit found the production contact WhatsApp link lacked `noopener`; the capstone version uses `rel="noopener noreferrer"`.
- Static scan found no JSX `<img>` without an `alt` attribute.
- Live route audit found no failed images on the inspected public/unauthenticated surfaces.
- Browser console output contained only cloud-browser extension metadata errors (`chrome-extension://...`), not application-origin errors.
- Existing source behavior intentionally opens internal navigation in new tabs (source commit `17ef919`). It was preserved, and opener protection was verified.

## Build and test results

| Check | Result |
| --- | --- |
| `npm ci` | Pass after QA-001 correction; 419 packages installed. |
| `npm run build` | Pass; Vite 8.0.16, 369 modules transformed. Advisory large-chunk warning remains (QA-009). |
| `npm test` | Pass; 17 tests passed, 0 failed. |
| `npm run lint` | Pass after QA-007 correction. |
| `git diff --check` | Pass. |
| Secret-pattern scan | No newly introduced secret found. It did identify the pre-existing plaintext admin credentials documented as QA-008. |

## Limitations

- Authenticated LMS/admin behavior was not exercised because doing so would require using the exposed credentials or production accounts and could create or alter production data.
- Payment and application flows were inspected without submitting forms, initiating Paystack, completing registration, or invoking production writes.
- The cloud browser provided a desktop viewport for direct live comparison but did not expose safe viewport emulation for a true mobile run. Mobile behavior was therefore assessed through responsive CSS, mobile navigation markup, and existing live layout structure rather than device emulation.
- The local production bundle could not be opened in the cloud browser because loopback URLs are blocked by that browser. The bundle was validated with the build, tests, lint, static scans, and the live route comparison.
- The live website reflects the untouched source deployment, not the un-deployed capstone corrections.
