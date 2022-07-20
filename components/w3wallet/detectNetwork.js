async function detectNetwork (ethereum) {
  let network

  try {
    network = await ethereum.request({
      method: "net_version",
    })
  } catch (detectNetworkError) {
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return network
  }
}

export default detectNetwork
