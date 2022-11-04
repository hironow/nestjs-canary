#!/usr/bin/env bash
set -eu

# mv dir
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_DIR
cd "${SCRIPT_DIR}/.."

# check cli
tbls > /dev/null 2>&1 || (echo "ERROR: 'tbls' must be installed and available on your PATH. please install ref. https://github.com/k1LoW/tbls"; exit 1)

# use tbls as a tool for db doc
# NOTE: need setting env like TBLS_DSN=postgres://user:pass@localhost:5432/postgres?sslmode=disable
tbls doc --force
