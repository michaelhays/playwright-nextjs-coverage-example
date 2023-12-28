import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	forbidOnly: Boolean(process.env.CI),
	fullyParallel: true,

	webServer: {
		//Debugger listening on ws://127.0.0.1:9229
        command: 'next build && cross-env NODE_OPTIONS="--inspect=9229" next start',
		//command: "npm run start",
        url: 'http://localhost:3000/'
    },
	globalSetup: './global-setup.js',
	globalTeardown: "./global-teardown.js",

	reporter: [
		["list"],
		[
			"monocart-reporter",
			{
				name: "Monocart Report",
				outputFile: "./playwright/results/report.html",
				coverage: {
					// logging: "debug",
					entryFilter: (entry: { url: string }) => {

						// console.log("entry", entry.url);
						const isClient = entry.url.includes("_next/static");
						const isServer = entry.url.includes(".next/server"); // || entry.url.includes("node_modules");

						return isClient || isServer;
					},
					sourceFilter: (sourcePath: string) => sourcePath.includes("src/"),
					lcov: true
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
