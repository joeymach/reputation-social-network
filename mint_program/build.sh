#! /bin/bash

if [[ $0 == "clean" ]]; then cargo clean; fi

cargo build --target wasm32-unknown-unknown --release