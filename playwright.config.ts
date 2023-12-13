import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	forbidOnly: Boolean(process.env.CI),
	fullyParallel: true,
	reporter: [
		["list"],
		[
			"monocart-reporter",
			{
				name: "Monocart Report",
				outputFile: "./playwright/results/report.html",
				coverage: {
					lcov: true,
					entryFilter: (entry: { url: string }) =>
						entry.url.includes("_next/static/chunks"),
					sourceFilter: (sourcePath: string) => sourcePath.includes("src/"),
				},
			},
		],
	],
	outputDir: "playwright/results/",
	retries: process.env.CI ? 2 : 0,
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	testDir: "./tests",
	use: { baseURL: "http://127.0.0.1:3000" },
	workers: process.env.CI ? 1 : undefined,
});
