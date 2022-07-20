async function detectAccounts (ethereum) {
  let accounts = []

  try {
    accounts = await ethereum.request({
      method: "eth_accounts",
    })
  } catch (detectAccountsError) {
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return accounts
  }
}

export default detectAccounts
