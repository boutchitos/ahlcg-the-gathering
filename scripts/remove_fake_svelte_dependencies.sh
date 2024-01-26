#!/bin/bash

function removeFakeSvelteDependencyFile() {
    rm "$1"
}
export -f removeFakeSvelteDependencyFile

find ./src -name "*.svelte.ts" -exec bash -c "removeFakeSvelteDependencyFile \"{}\"" \;
