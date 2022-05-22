#! /bin/bash

if [[ $1 == "clean" ]]; then cargo clean; fi

cargo build --target wasm32-unknown-unknown --release

echo -e "\nNEAR NFT contract build successful!"