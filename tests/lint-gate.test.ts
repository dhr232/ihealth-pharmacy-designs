import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

// Regression guard: CI fails on any ESLint error (warnings are allowed).
// Running it under `npm test` catches no-explicit-any and
// react-hooks/set-state-in-effect errors locally, before a push.
describe("lint gate", () => {
  it("has zero ESLint errors", () => {
    const result = spawnSync("npx", ["eslint", "--quiet"], {
      encoding: "utf8",
      shell: true,
    });
    expect(result.status, result.stdout + result.stderr).toBe(0);
  }, 120_000);
});
