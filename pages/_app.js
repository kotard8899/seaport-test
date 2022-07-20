import '../styles/globals.css'
import { W3WalletContextProvider } from "../components/w3wallet"

function MyApp({ Component, pageProps }) {
  return (
    <W3WalletContextProvider>
      <Component {...pageProps} />
    </W3WalletContextProvider>
  )
}

export default MyApp
