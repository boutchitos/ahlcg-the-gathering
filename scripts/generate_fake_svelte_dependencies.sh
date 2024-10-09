#!/bin/bash

function generateFakeSvelteDependencies() {
    grep import "$1" | sed s/svelte/svelte.ts/ > "$1".ts
}
export -f generateFakeSvelteDependencies

find ./src -name "*.svelte" -exec bash -c "generateFakeSvelteDependencies \"{}\"" \;
