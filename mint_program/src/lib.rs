use {
    near_contract_standards::non_fungible_token::{
        metadata::{
            NFTContractMetadata,
            NFT_METADATA_SPEC, 
            NonFungibleTokenMetadataProvider, 
            TokenMetadata, 
        },
        Token, 
        TokenId,
        NonFungibleToken,
    },
    near_sdk::{
        AccountId, 
        borsh::{self, BorshDeserialize, BorshSerialize},
        BorshStorageKey, 
        collections::LazyOption,
        env, 
        json_types::ValidAccountId,
        near_bindgen, 
        PanicOnDefault, 
        Promise, 
        PromiseOrValue,
    },
};


near_sdk::setup_alloc!();


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    tokens: NonFungibleToken,
    metadata: LazyOption<NFTContractMetadata>,
}


const DATA_IMAGE_SVG_NEAR_ICON: &str = "https://demo.storj-ipfs.com/ipfs/QmP1es2nZTWwYCnqZnXcXjp6ztMYNyPdieYSPsFNmqvgcC";


#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKey {
    NonFungibleToken,
    Metadata,
    TokenMetadata,
    Enumeration,
    Approval,
}


#[near_bindgen]
impl Contract {
    
    #[init]
    pub fn new_default_meta(owner_id: ValidAccountId) -> Self {
        Self::new(
            owner_id,
            NFTContractMetadata {
                spec: NFT_METADATA_SPEC.to_string(),
                name: "Reputation Social Network NFT".to_string(),
                symbol: "REPUSOCIAL".to_string(),
                icon: Some(DATA_IMAGE_SVG_NEAR_ICON.to_string()),
                base_uri: None,
                reference: None,
                reference_hash: None,
            },
        )
    }

    #[init]
    pub fn new(owner_id: ValidAccountId, metadata: NFTContractMetadata) -> Self {
        assert!(!env::state_exists(), "Already initialized");
        metadata.assert_valid();
        Self {
            tokens: NonFungibleToken::new(
                StorageKey::NonFungibleToken,
                owner_id,
                Some(StorageKey::TokenMetadata),
                Some(StorageKey::Enumeration),
                Some(StorageKey::Approval),
            ),
            metadata: LazyOption::new(StorageKey::Metadata, Some(&metadata)),
        }
    }

    #[payable]
    pub fn nft_mint(
        &mut self,
        token_id: TokenId,
        receiver_id: ValidAccountId,
        token_metadata: TokenMetadata,
    ) -> Token {
        self.tokens.mint(token_id, receiver_id, Some(token_metadata))
    }
}


near_contract_standards::impl_non_fungible_token_core!(Contract, tokens);
near_contract_standards::impl_non_fungible_token_approval!(Contract, tokens);
near_contract_standards::impl_non_fungible_token_enumeration!(Contract, tokens);


#[near_bindgen]
impl NonFungibleTokenMetadataProvider for Contract {
    fn nft_metadata(&self) -> NFTContractMetadata {
        self.metadata.get().unwrap()
    }
}