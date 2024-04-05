#!/bin/sh

pnpm i --no-frozen-lockfile

pnpm --filter @soku-solid/utils build
pnpm --filter @soku-solid/ui build
pnpm --filter web build
