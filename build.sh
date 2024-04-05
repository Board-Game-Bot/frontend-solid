#!/bin/sh

pnpm i

pnpm --filter @soku-solid/utils build
pnpm --filter @soku-solid/ui build
pnpm --filter web build
