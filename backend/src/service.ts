import { mintNearNft } from './near';


export async function evaluateProgress(progress: number) {
    switch (progress) {
        case 3: mintNft(1);
        case 6: mintNft(2);
        case 9: mintNft(3);
    };
}


export async function mintNft(rank: number) {
    // return mintNearNft(rank);
    const { execSync } = require('child_process');
    execSync(`bash ../../mint_program/mint.sh ${rank}`);
}


mintNft(3).then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);