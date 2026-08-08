#!/usr/bin/env bash

set -euo pipefail

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 22 or later is required."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required. Install it with Node.js 22 or later."
  exit 1
fi

node_major="$(node --version | sed -E 's/^v([0-9]+).*/\1/')"
if [ "$node_major" -lt 22 ]; then
  echo "Node.js 22 or later is required; found $(node --version)."
  exit 1
fi

npm ci

echo "Development validation tools are ready. Run: npm run validate"
