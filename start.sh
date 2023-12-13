#!/bin/sh
#
# Run this to ensure you're working with a fresh environment.

rm -rf .next/ node_modules/ playwright/.cache/ playwright/results/
npm install
npm run build
npm run start
