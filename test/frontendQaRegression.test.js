import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const readProjectFile = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("payment success card remains inside the requested viewport widths", () => {
  const css = readProjectFile("src/pages/PaymentSuccess.css");

  assert.match(css, /width:\s*min\(700px,\s*calc\(100% - 40px\)\)/);
  assert.match(css, /margin:\s*0 0 40px/);

  for (const viewportWidth of [320, 360, 390, 768, 1348]) {
    const cardBorderBoxWidth = Math.min(700, viewportWidth - 40);
    assert.ok(
      cardBorderBoxWidth <= viewportWidth,
      `card width must fit a ${viewportWidth}px viewport`,
    );
  }
});

test("mobile menu uses a non-modal disclosure with state and focus restoration", () => {
  const navbar = readProjectFile("src/components/Navbar.jsx");

  assert.match(navbar, /aria-expanded=\{mobileMenuOpen\}/);
  assert.match(navbar, /aria-controls="ov-mobile-navigation"/);
  assert.match(navbar, /id="ov-mobile-navigation"/);
  assert.match(navbar, /event\.key === "Escape"/);
  assert.match(navbar, /menuButtonRef\.current\?\.focus\(\)/);
  assert.doesNotMatch(navbar, /role="dialog"|aria-modal=/);
});

test("Capstone Run 2 workflow is read-only and never self-modifies", () => {
  const workflow = readProjectFile(".github/workflows/capstone-run-2-qa.yml");
  const oldWorkflow = new URL(
    "../.github/workflows/capstone-run-1-qa.yml",
    import.meta.url,
  );

  assert.match(workflow, /permissions:\s*\n\s*contents:\s*read/);
  assert.doesNotMatch(workflow, /contents:\s*write|git\s+(push|commit)|Restore baseline binary assets/);
  assert.equal(existsSync(oldWorkflow), false);
});

test("recommended hook rules remain global with only documented local exceptions", () => {
  const eslintConfig = readProjectFile("eslint.config.js");
  assert.match(eslintConfig, /files:\s*\['src\/components\/ProtectedAdminRoute\.jsx'\]/);
  assert.match(eslintConfig, /files:\s*\['src\/pages\/LmsDashboard\.jsx'\]/);
  assert.equal(
    (eslintConfig.match(/react-hooks\/set-state-in-effect['"]?\s*:\s*['"]off/g) || []).length,
    2,
  );

  const exceptionFiles = [
    "src/pages/AdminLiveSessions.jsx",
    "src/pages/AdminLms.jsx",
    "src/pages/Alumni.jsx",
    "src/pages/GraduatedStudents.jsx",
    "src/pages/VerifyCertificate.jsx",
  ];
  const exceptions = exceptionFiles.flatMap((path) =>
    [...readProjectFile(path).matchAll(/eslint-disable-next-line react-hooks\/set-state-in-effect/g)],
  );

  assert.equal(exceptions.length, 5);
});
