import { useContext } from "react"
import W3WalletContext from "./W3WalletContext"

function useW3Wallet () {
  return useContext(W3WalletContext)
}

export default useW3Wallet
