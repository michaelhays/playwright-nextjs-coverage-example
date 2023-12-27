#!/bin/sh
#
# Run this to ensure you're working with a fresh environment.

rm -rf .coverage/ .next/ coverage-reports/ node_modules/ playwright/.cache/ playwright/results/
npm install
npm run build
NODE_V8_COVERAGE=.coverage npm run start
