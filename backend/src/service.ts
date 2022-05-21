
export async function evaluateProgress(progress: number) {
    switch (progress) {
        case 3: mintNft(1);
        case 6: mintNft(2);
        case 9: mintNft(3);
    };
}


export async function mintNft(type: number) {
    return "TODO"; // NEAR contract call
}