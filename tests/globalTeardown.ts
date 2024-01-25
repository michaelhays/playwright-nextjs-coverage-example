import type { FullConfig, TestInfo } from "@playwright/test";
import fs from "fs";
import { addCoverageReport } from "monocart-reporter";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocket } from "ws";

type WebSocketCommand = {
	id: number;
	method: string;
	params?: Record<string, unknown>;
};

/**
 * Send a command to the WebSocket and wait for the response.
 */
function send(ws: WebSocket, command: WebSocketCommand) {
	return new Promise((resolve) => {
		const callback = (text: string) => {
			const response = JSON.parse(text);
			if (response.id === command.id) {
				ws.removeListener("message", callback);
				resolve(response);
			}
		};

		ws.on("message", callback);
		ws.send(JSON.stringify(command));
	});
}

/**
 * Playwright test global teardown to collect server coverage.
 */
async function globalTeardown(config: FullConfig) {
	const res = await fetch("http://127.0.0.1:9230/json");
	const resData = await res.json();
	const webSocketDebuggerUrl = resData[0].webSocketDebuggerUrl;
	const ws = new WebSocket(webSocketDebuggerUrl);

	await new Promise((resolve) => {
		ws.once("open", resolve);
	});

	await send(ws, {
		id: 1,
		method: "Runtime.enable",
	});

	// biome-ignore lint/suspicious/noExplicitAny: any
	const data: any = await send(ws, {
		id: 2,
		method: "Runtime.evaluate",
		params: {
			expression: `new Promise(resolve=>{
                require("v8").takeCoverage();
                resolve(process.env.NODE_V8_COVERAGE);
            })`,
			includeCommandLineAPI: true,
			returnByValue: true,
			awaitPromise: true,
		},
	});

	const dir = data.result.result.value;

	if (!fs.existsSync(dir)) {
		console.log("Coverage directory not found:", dir);
		return;
	}

	const files = fs.readdirSync(dir);

	for (const filename of files) {
		const content = fs
			.readFileSync(path.resolve(dir, filename))
			.toString("utf-8");
		const json = JSON.parse(content);
		let coverageList: { url: string; source: string }[] = json.result;

		// filter node internal files
		coverageList = coverageList.filter((entry) =>
			entry.url?.startsWith("file:"),
		);

		coverageList = coverageList.filter((entry) =>
			entry.url.includes("next/server/app"),
		);

		coverageList = coverageList.filter(
			(entry) => !entry.url.includes("manifest.js"),
		);

		if (!coverageList.length) {
			continue;
		}

		for (const entry of coverageList) {
			const filePath = fileURLToPath(entry.url);
			if (fs.existsSync(filePath)) {
				entry.source = fs.readFileSync(filePath).toString("utf8");
			} else {
				console.log("File not found:", filePath);
			}
		}

		await addCoverageReport(coverageList, { config } as TestInfo);
	}
}

export default globalTeardown;
