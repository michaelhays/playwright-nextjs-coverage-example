import WebSocket from 'ws';
import axios from "axios";
import EC from "eight-colors";

import send from "./send.js";

const globalSetup = async (config) => {
    // after webServer is debugging on ws://127.0.0.1:9229
    // connect to the server with Chrome Devtools Protocol
    const res = await axios.get("http://127.0.0.1:9229/json");
    // using first one debugger process
    const webSocketDebuggerUrl = res.data[0].webSocketDebuggerUrl;
    const ws = new WebSocket(webSocketDebuggerUrl);

    await new Promise(resolve => ws.once('open', resolve));
    console.log(EC.magenta("globalSetup webSocketDebuggerUrl"), EC.cyan(webSocketDebuggerUrl), EC.green('connected!'));

    // keep ws and session id for global teardown
    config.ws = ws;

    // enable and start v8 coverage
    await send(ws, {
        id: 1,
        method: 'Profiler.enable'
    });

    await send(ws, {
        id: 2,
        method: 'Profiler.startPreciseCoverage',
        params: {
            callCount: true,
            detailed: true
        },
    });

};

export default globalSetup;
