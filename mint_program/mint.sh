#! /bin/bash

export NEAR_ID="blu3hackteam-demo.testnet"

export METADATA_RANK_0="https://demo.storj-ipfs.com/ipfs/QmP1es2nZTWwYCnqZnXcXjp6ztMYNyPdieYSPsFNmqvgcC"
export METADATA_RANK_1="https://demo.storj-ipfs.com/ipfs/QmbjW9Jto1udVeMi2K7u8KM5xfcR36WCCPBrvuUNEXaLyP"
export METADATA_RANK_2="https://demo.storj-ipfs.com/ipfs/QmTCMiPkzAGzGxthM1sCm66HBQyKrbPGrVEi2ieafAsQMM"
export METADATA_RANK_3="https://demo.storj-ipfs.com/ipfs/QmaFLYR6fwW6N2KHDgBzwQWSQqgTA6xVXD5BckRRYDHz3i"

case $1 in
    "0")
        RANK="0"
        METADATA_RANK=$METADATA_RANK_0
        ;;
    "1")
        RANK="1"
        METADATA_RANK=$METADATA_RANK_1
        ;;
    "2")
        RANK="2"
        METADATA_RANK=$METADATA_RANK_2
        ;;
    "3")
        RANK="3"
        METADATA_RANK=$METADATA_RANK_3
        ;;
    "")
        exit
esac

export TOKEN_ID=$RANDOM
near call $NEAR_ID nft_mint '{"token_id": "'$TOKEN_ID'", "receiver_id": "'$NEAR_ID'", "token_metadata": { "title": "Notoriety NFT Rank #'$RANK'", "description": "Notoriety NFT Rank #'$RANK'", "media": "'$METADATA_RANK'", "copies": 1}}' --accountId $NEAR_ID --deposit 0.1

echo -e '\nNEAR NFT mint successful for Rank #'$RANK'!'