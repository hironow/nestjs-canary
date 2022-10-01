#!/usr/bin/env bash
set -eu

# mv dir
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly SCRIPT_DIR
cd "${SCRIPT_DIR}/.."

# check cli
runn > /dev/null 2>&1 || (echo "ERROR: 'runn' must be installed and available on your PATH. please install ref. https://github.com/k1LoW/runn"; exit 1)

# use runn as a tool for scenario based testing
runn run scenario/app.scenario-spec.yml --capture scenario/capture/
