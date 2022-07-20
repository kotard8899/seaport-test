async function requestAccounts (ethereum, walletName) {
  let accounts = []

  try {
    if (walletName === "metamask") {
      accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })
    }
  } catch (requestAccountsError) {
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return accounts
  }
}

export default requestAccounts
