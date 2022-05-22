#! /bin/bash

export NEAR_ID="blu3hackteam-demo.testnet"

near deploy --wasmFile target/wasm32-unknown-unknown/release/mint_program.wasm --accountId $NEAR_ID
near call $NEAR_ID new_default_meta '{"owner_id": "'$NEAR_ID'"}' --accountId $NEAR_ID
near view $NEAR_ID nft_metadata

echo -e "\nNEAR NFT contract deployment successful!"