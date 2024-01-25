This is an example of a Next.js project with Playwright code coverage enabled through the [monocart-reporter](https://github.com/cenfun/monocart-reporter).

## Instructions for your project

- ([Code](/playwright.config.ts#L10-L35)) Set up your `playwright.config.ts` for the `monocart-reporter`.
- ([Code](/next.config.js#L4-L9)) Update your Webpack config to set `config.devtool` to `"source-map"`.
- ([Code](/tests/home.spec.ts#L4-L11)) Include the `beforeEach` and `afterEach` coverage collection in each of your test files, for client coverage.
- ([Code](/globalTeardown.js)) Include `globalTeardown.js` to collect server coverage.

## Setup and testing

> When debugging, you can use [`./start.sh`](/start.sh) to make sure you're working with a fresh environment.

### Install dependencies

```bash
bun install
```

### Serve app

```bash
bun dev
```

### Run Playwright tests

```bash
bun test:e2e
```

## Results

After `bun test:e2e` has finished, open `/playwright/results/coverage/index.html` in your browser to view the client-side coverage report.
