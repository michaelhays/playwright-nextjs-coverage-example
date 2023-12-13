import { expect, test } from "@playwright/test";
import { addCoverageReport } from "monocart-reporter";

test.beforeEach(async ({ page }) => {
	await page.coverage.startJSCoverage({ resetOnNavigation: false });
});

test.afterEach(async ({ page }) => {
	const coverage = await page.coverage.stopJSCoverage();
	await addCoverageReport(coverage, test.info());
});

test("page has title", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("heading")).toContainText("Page Title");
});

test("first button increments", async ({ page }) => {
	await page.goto("/");
	const button = page.getByRole("button").first();
	await expect(button).toContainText("Click me 0");
	await button.click();
	await expect(button).toContainText("Click me 1");
	await button.click();
	await expect(button).toContainText("Click me 2");
});

test("second button increments", async ({ page }) => {
	await page.goto("/");
	const button = page.getByRole("button").last();
	await expect(button).toContainText("Click me 0");
	await button.click();
	await expect(button).toContainText("Click me 1");
	await button.click();
	await expect(button).toContainText("Click me 2");
});
