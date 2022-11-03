#!/usr/bin/env bash
set -eu

# mv dir
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_DIR
cd "${SCRIPT_DIR}/.."

# check cli
k6 > /dev/null 2>&1 || (echo "ERROR: 'k6' must be installed and available on your PATH. please install ref. https://github.com/grafana/k6"; exit 1)

# use k6 as a tool for loadtesting
k6 run loadtest/*.js
