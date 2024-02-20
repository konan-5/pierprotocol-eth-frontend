const networkConfig = {
    Ethereum:
    {
        "chainId": "0x1",
        "chainName": "Ethereum Mainnet",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18
        },
        "rpcUrls": ["https://eth-mainnet.g.alchemy.com/v2/xRpnmvup4LCr2mL9lNqqpKnHQJepfeSc"],
        "blockExplorerUrls": ["https://etherscan.io"]
    },

    Base: {
        "chainId": "0xA",
        "chainName": "Base",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18
        },
        "rpcUrls": ["https://rpc.base.org"],
        "blockExplorerUrls": ["https://explorer.base.org"]
    },

    zkSync: {
        "chainId": "0x1D",
        "chainName": "zkSync",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18
        },
        "rpcUrls": ["https://rpc.zksync.io"],
        "blockExplorerUrls": ["https://zkscan.io"]
    },

    Arbitrum: {
        "chainId": "0xA4B1",
        "chainName": "Arbitrum One",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18
        },
        "rpcUrls": ["https://arb1.arbitrum.io/rpc"],
        "blockExplorerUrls": ["https://arbiscan.io"]
    },

    Optimism: {
        "chainId": "0xA",
        "chainName": "Optimism",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18
        },
        "rpcUrls": ["https://mainnet.optimism.io"],
        "blockExplorerUrls": ["https://optimistic.etherscan.io"]
    },

    BSC: {
        "chainId": "0x38",
        "chainName": "Binance Smart Chain",
        "nativeCurrency": {
            "name": "Binance Coin",
            "symbol": "BNB",
            "decimals": 18
        },
        "rpcUrls": ["https://bsc-dataseed.binance.org/"],
        "blockExplorerUrls": ["https://bscscan.com"]
    },

    Scroll: {
        "chainId": "0x1C",
        "chainName": "Scroll",
        "nativeCurrency": {
            "name": "Ether",
            "symbol": "ETH",
            "decimals": 18
        },
        "rpcUrls": ["https://rpc.scroll.io"],
        "blockExplorerUrls": ["https://explorer.scroll.io"]
    }

}

export { networkConfig };
