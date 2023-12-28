import fs from 'fs';
import { fileURLToPath } from 'url';
import EC from "eight-colors";
import { addCoverageReport } from "monocart-reporter";
import send from "./send.js";

const globalTeardown = async (config) => {

    const data = await send(config.ws, {
        id: 3,
        method: 'Profiler.takePreciseCoverage'
    });

    // first result for ws, second result for v8
    let coverageList = data.result.result;

    // filter (before entryFilter)
    coverageList = coverageList.filter(entry => entry.url && entry.url.startsWith("file:"));

    // excludes node_modules
    coverageList = coverageList.filter(entry => !entry.url.includes("node_modules"));

    console.log(coverageList.map(entry => [entry.url, JSON.stringify(entry.functions)]));

    // attach source file
    coverageList.forEach((entry) => {
        const filePath = fileURLToPath(entry.url);
        if (fs.existsSync(filePath)) {
            entry.source = fs.readFileSync(filePath).toString('utf8');
        } else {
            EC.logRed('not found file', filePath);
        }
    });
    

    // there is no test info on teardown, just mock one with required config
    const mockTestInfo = {
        config
    };
    await addCoverageReport(coverageList, mockTestInfo);

};

export default globalTeardown;
