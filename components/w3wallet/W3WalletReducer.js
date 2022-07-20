function W3WalletReducer (state, action) {
  switch (action.type) {
    case "detectIsMetaMaskInstalled":
      return {
        ...state,
        isMetaMaskInstalled: !!action.payload.provider?.isMetaMask,
        provider: action.payload.provider,
        eProvider: action.payload.eProvider,
        signer: action.payload.signer
      }
    case "detectAccounts":
      return {
        ...state,
        accounts: action.payload.accounts.length > 0 ? action.payload.accounts : state.accounts,
        isMetaMaskConnected: action.payload.accounts.length > 0,
      }
    case "disconnectAccounts":
      return {
        ...state,
        accounts: [],
        isMetaMaskConnected: false,
      }
    case "detectNetwork":
      return {
        ...state,
        chainId: action.payload,
      }
    case "updateProvider":
      return {
        ...state,
        provider: action.payload,
      }
    case "updateChainId":
      return {
        ...state,
        chainId: action.payload,
      }
    case "updateAccounts":
      return {
        ...state,
        accounts: action.payload.accounts.length > 0 ? action.payload.accounts : state.accounts,
        isMetaMaskConnected: action.payload.accounts.length > 0,
      }
    default:
      throw new Error()
  }
}

export default W3WalletReducer
