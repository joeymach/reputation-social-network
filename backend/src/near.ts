import { 
    connect,
    Contract,
    keyStores,
} from "near-api-js";


const NEAR_ID = "blu3hackteam-demo.testnet";


function getMetaData(rank: number) {
    switch (rank) {
        case 0: return "https://demo.storj-ipfs.com/ipfs/QmP1es2nZTWwYCnqZnXcXjp6ztMYNyPdieYSPsFNmqvgcC";
        case 1: return "https://demo.storj-ipfs.com/ipfs/QmbjW9Jto1udVeMi2K7u8KM5xfcR36WCCPBrvuUNEXaLyP";
        case 2: return "https://demo.storj-ipfs.com/ipfs/QmTCMiPkzAGzGxthM1sCm66HBQyKrbPGrVEi2ieafAsQMM";
        case 3: return "https://demo.storj-ipfs.com/ipfs/QmaFLYR6fwW6N2KHDgBzwQWSQqgTA6xVXD5BckRRYDHz3i";
    };
}


async function nearLogin() {

    // Sign-in to NEAR
    const credentialsPath = require("path").join(
        require("os").homedir(), 
        ".near-credentials"
    );
    const near = await connect({
        headers: {},
        networkId: "testnet",
        keyStore: new keyStores.UnencryptedFileSystemKeyStore(credentialsPath), 
        nodeUrl: "https://rpc.testnet.near.org",
    });
    const account = await near.account(NEAR_ID);
    
    return account;
}


async function getAccountDetails() {
    let account = await nearLogin();
    let details = await account.getAccountBalance();
    console.log(details);
}


// export async function mintNearNft(rank: number) {

//     console.log(`Minting NEAR NFT for Rank #${rank}...`);

//     const metaData = getMetaData(rank);

    

//     // Call NFT mint contract
//     const contract = new Contract(
//         account,
//         NEAR_ID,
//         {
//           viewMethods: ["getMessages"],
//           changeMethods: ["addMessage"],
//         }
//     );
//     await contract.addMessage(
//         {
//             token_id: Math.floor(Math.random() * 1000), 
//             receiver_id: NEAR_ID,
//             token_metadata: {
//                 title: `Notoriety NFT Rank #${rank}`,
//                 description: `Notoriety NFT Rank #${rank}`,
//                 media: metaData,
//                 copies: 1
//             },
//             accountId: NEAR_ID,
//             deposit: 0.1,
//         }
//     );

//     console.log("Success.");
// }
