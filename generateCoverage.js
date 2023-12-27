import fs from "fs";
import { CoverageReport } from "monocart-coverage-reports";
import path from "path";
import { fileURLToPath } from "url";

const coverageDir = ".coverage";
const coverageFilenames = fs.readdirSync(coverageDir);

const coverageReport = new CoverageReport({
	reports: "v8",
	name: "V8 Node.js Coverage Report",
	lcov: true,
	entryFilter: (entry) =>
		entry.url.includes(".next/server") && !entry.url.includes("node_modules"),
	sourceFilter: (sourcePath) => sourcePath.includes("src/app/"),
	outputFile: "./server/report.html",
});

for (const filename of coverageFilenames) {
	const content = fs
		.readFileSync(path.resolve(coverageDir, filename))
		.toString("utf-8");
	const json = JSON.parse(content);
	let coverageList = json.result;

	// filter node internal files
	coverageList = coverageList.filter(
		(entry) => entry.url && entry.url.startsWith("file:"),
	);

	// attached source content
	coverageList.forEach((entry) => {
		const filePath = fileURLToPath(entry.url);
		if (fs.existsSync(filePath)) {
			entry.source = fs.readFileSync(filePath).toString("utf8");
		} else {
			console.log("not found file", filePath);
		}
	});

	await coverageReport.add(coverageList);
}

await coverageReport.generate();
