This is an example of a Next.js project with Playwright code coverage enabled through the [monocart-reporter](https://github.com/cenfun/monocart-reporter).

## Instructions for your project

- ([Code](/playwright.config.ts#L13-L18)) Set up your `playwright.config.ts` with the proper `entryFilter` and `sourceFilter`.
- ([Code](/next.config.js#L3-L6)) Update your Webpack config to set `config.devtool` to `"source-map"`.
- ([Code](/tests/home.spec.ts#L4-L11)) Include the `beforeEach` and `afterEach` coverage collection in each of your test files.

## Setup and testing

> When debugging, you can use [`./start.sh`](/start.sh) to make sure you're working with a fresh environment.

### Install dependencies

```bash
npm install
```

### Build and serve app

```bash
npm run build
NODE_V8_COVERAGE=.coverage npm run start
```

### Run Playwright tests

```bash
npm run test
```

## Results

### Client-side coverage

After `npm run test` has finished, open `/playwright/results/coverage/index.html` in your browser to view the client-side coverage report.

### Server-side coverage

After `npm run test` has finished, exit the `NODE_V8_COVERAGE=.coverage npm run start` command, and then run

```bash
node generateCoverage.js
```

to generate [server-side coverage](https://github.com/cenfun/monocart-coverage-reports#nodejs-v8-coverage-report-for-server-side).

Open `/coverage-reports/server/report.html` in your browser to view the server-side coverage report.
