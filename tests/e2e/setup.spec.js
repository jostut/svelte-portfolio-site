import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/SvelteKit Landing Page/);
  await expect(page.locator("h1")).toContainText("Welcome to SvelteKit");
});
