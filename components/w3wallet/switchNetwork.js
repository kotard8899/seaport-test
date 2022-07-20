import chainList from "./chainList"

const supportChains = process.env.REACT_APP_SUPPORT_NETWORKS.split(",").map(chain => parseInt(chain, 10))
const defaultChain = supportChains[0]

async function switchNetwork (ethereum, prevChain, chain = defaultChain) {
  // 如果用戶拒絕換鏈，則回傳原本的鏈
  let _chain = prevChain
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainList[chain].chainId }],
    })
    _chain = chain
  } catch (switchNetworkError) {
    // https://eips.ethereum.org/EIPS/eip-1474#error-codes
    // -32603 Internal error
    // -32002 Resource unavailable
    // https://eips.ethereum.org/EIPS/eip-1193#provider-errors
    // 4001 User Rejected Request
    // 4902 Unrecognized chain ID
    if (4902 === switchNetworkError.code) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [chainList[chain]],
        })
        _chain = chain
      } catch (addNetworkError) {
        // -32002 Resource unavailable
        // 4001 User Rejected Request
      }
    }
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return _chain
  }
}

export default switchNetwork
