import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

describe("Project Configuration", () => {
  it("should have package.json with correct dependencies", () => {
    const packageJsonPath = join(process.cwd(), "package.json");
    expect(existsSync(packageJsonPath)).toBe(true);

    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

    // Check for SvelteKit dependencies
    expect(packageJson.devDependencies).toHaveProperty("@sveltejs/kit");
    expect(packageJson.devDependencies).toHaveProperty(
      "@sveltejs/vite-plugin-svelte",
    );
    expect(packageJson.devDependencies).toHaveProperty("svelte");

    // Check for testing dependencies
    expect(packageJson.devDependencies).toHaveProperty("vitest");
    expect(packageJson.devDependencies).toHaveProperty("@playwright/test");
    expect(packageJson.devDependencies).toHaveProperty(
      "@testing-library/svelte",
    );

    // Check for TypeScript
    expect(packageJson.devDependencies).toHaveProperty("typescript");
    expect(packageJson.devDependencies).toHaveProperty("svelte-check");
  });

  it("should have vitest.config.js with proper configuration", () => {
    const vitestConfigPath = join(process.cwd(), "vitest.config.js");
    expect(existsSync(vitestConfigPath)).toBe(true);

    const vitestConfig = readFileSync(vitestConfigPath, "utf-8");
    expect(vitestConfig).toContain("defineConfig");
    expect(vitestConfig).toContain("svelte");
    expect(vitestConfig).toContain("jsdom");
    expect(vitestConfig).toContain("coverage");
  });

  it("should have playwright.config.js with proper configuration", () => {
    const playwrightConfigPath = join(process.cwd(), "playwright.config.js");
    expect(existsSync(playwrightConfigPath)).toBe(true);

    const playwrightConfig = readFileSync(playwrightConfigPath, "utf-8");
    expect(playwrightConfig).toContain("defineConfig");
    expect(playwrightConfig).toContain("testDir");
    expect(playwrightConfig).toContain("./tests/e2e");
    expect(playwrightConfig).toContain("chromium");
    expect(playwrightConfig).toContain("firefox");
    expect(playwrightConfig).toContain("webkit");
  });

  it("should have TypeScript configuration properly set up", () => {
    const tsconfigPath = join(process.cwd(), "tsconfig.json");
    expect(existsSync(tsconfigPath)).toBe(true);

    const tsconfigContent = readFileSync(tsconfigPath, "utf-8");
    // Remove comments for JSON parsing
    const cleanedContent = tsconfigContent
      .replace(/\/\/.*$/gm, "") // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, ""); // Remove multi-line comments

    const tsconfig = JSON.parse(cleanedContent);
    expect(tsconfig.extends).toBe("./.svelte-kit/tsconfig.json");
  });

  it("should have correct npm scripts configured", () => {
    const packageJsonPath = join(process.cwd(), "package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

    // Check for development scripts
    expect(packageJson.scripts).toHaveProperty("dev");
    expect(packageJson.scripts).toHaveProperty("build");
    expect(packageJson.scripts).toHaveProperty("preview");

    // Check for testing scripts
    expect(packageJson.scripts).toHaveProperty("test");
    expect(packageJson.scripts).toHaveProperty("test:e2e");
    expect(packageJson.scripts.test).toBe("vitest --run");
    expect(packageJson.scripts["test:e2e"]).toBe("playwright test");
  });
});
