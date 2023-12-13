This is an example of a Next.js project with Playwright code coverage enabled through the [monocart-reporter](https://github.com/cenfun/monocart-reporter).

## Setup and testing

> When debugging, you can use [`./start.sh`](/start.sh) to make sure you're working with a fresh environment.

### Install dependencies

```bash
npm install
```

### Build and serve app

```bash
npm run build
npm run start
```

### Run Playwright tests

```bash
npm run test
```

> You can open the coverage report at `/playwright/results/index.html` in your browser.

## Instructions for your project

- [Code](/playwright.config.ts#L13-L18) Set up your `playwright.config.ts` with the proper `entryFilter` and `sourceFilter`.
- [Code](/next.config.js#L3-L6) Update your Webpack config to set `config.devtool` to `"source-map"`.
- [Code](/tests/home.spec.ts#L4-L11) Include the `beforeEach` and `afterEach` coverage collection in each of your test files.
