const chainList = {
  1: {
    chainId: "0x1",
  },
  4: {
    chainId: "0x4",
  },
  56: {
    chainId: "0x38",
    blockExplorerUrls: ["https://bscscan.com"],
    chainName: "Binance Smart Chain",
    // iconUrls: [],
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
  },
  137: {
    chainId: "0x89",
    blockExplorerUrls: ["https://polygonscan.com/"],
    chainName: "Polygon Mainnet",
    // iconUrls: [],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
  },
}

export default chainList
