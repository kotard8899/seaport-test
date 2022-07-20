import { useReducer } from "react"
import W3WalletContext from "./W3WalletContext"
import W3WalletReducer from "./W3WalletReducer"
import W3WalletInitialState from "./W3WalletInitialState"

function W3WalletContextProvider ({ children }) {
  const [W3Wallet, W3WalletDispatch] = useReducer(
    W3WalletReducer,
    W3WalletInitialState,
  )

  return (
    <W3WalletContext.Provider value={[W3Wallet, W3WalletDispatch]}>
      {children}
    </W3WalletContext.Provider>
  )
}

export default W3WalletContextProvider
