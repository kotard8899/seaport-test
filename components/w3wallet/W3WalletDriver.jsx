import { useCallback, useEffect, useState } from "react"
import detectEthereumProvider from "@metamask/detect-provider"
import SVG from "react-inlinesvg"
import useW3Wallet from "./useW3Wallet"
import switchNetwork from "./switchNetwork"
import detectAccounts from "./detectAccounts"
import detectNetwork from "./detectNetwork"
import requestAccounts from "./requestAccounts"
import styles from "./Wallet.module.scss"
import { providers } from "ethers"

const btnClassNames = [
  "cursor-pointer",
  "rounded-xl border border-secondary",
  "p-2",
  "transition duration-200",
  "hover:bg-lightBack",
]

const WalletListItem = ({ walletName, onClick }) => {
  let walletText
  if (walletName === "metamask") walletText = "MetaMask"

  return (
    <div
      className={`${btnClassNames.join(" ")} flex justify-between items-center space-x-2`}
      onClick={onClick}
    >
      <span className="w-44 ml-2">{walletText}</span>
      {/* <SVG className="inline-block" src={`images/${walletName}.svg`} width={32} height={32} /> */}
    </div>
  )
}


const WalletList = ({ setIsModal, connectBtnClick, isMetaMaskInstalled }) => {
  return (
    <div className="flex fixed inset-0 backdrop-blur z-50">
      <div className="m-auto rounded-2xl p-6 w-80 space-y-6 bg-back border border-secondary">
        <header>
          <h1>Select wallet</h1>
        </header>
        <div className="space-y-4">
          {!isMetaMaskInstalled
            ? (
              <a
                className={`${btnClassNames.join(" ")} hidden sm:flex justify-between items-center space-x-2`}
                target="_blank"
                rel="noreferrer"
                href="https://metamask.io/download.html"
              >
                <span className="ml-2">Install MetaMask</span>
                {/* <SVG className="inline-block" src="images/metamask.svg" width={32} height={32} /> */}
              </a>)
            : <WalletListItem walletName="metamask" onClick={() => connectBtnClick("metamask")} />
          }
        </div>
        <footer>
          <div
            className={`${btnClassNames.join(" ")} text-center`}
            onClick={() => setIsModal(false)}
          >
            Close
          </div>
        </footer>
      </div>
    </div>
  )
}

function W3WalletDriver () {
  const [W3Wallet, W3WalletDispatch] = useW3Wallet()
  const [isModal, setIsModal] = useState(false)
  const [onWallet, setOnWallet] = useState("")

  const connectBtnClick = useCallback(async (walletName) => {
    setOnWallet(walletName)
    const accounts = await requestAccounts(W3Wallet.provider, walletName)
    setIsModal(false)
    W3WalletDispatch({
      type: "updateAccounts",
      payload: {
        accounts
      },
    })
    if (walletName === "metamask") {
      const chainId = parseInt(await detectNetwork(W3Wallet.provider))
      if (chainId !== 1 && chainId !== 56) {
        W3WalletDispatch({
          type: "updateChainId",
          payload: await switchNetwork(W3Wallet.provider, chainId),
        })
      } else {
        W3WalletDispatch({
          type: "detectNetwork",
          payload: chainId,
        })
      }
    }
  }, [W3Wallet.provider, W3WalletDispatch])

  // 偵測是否有安裝Ethereum相容錢包，如MetaMask
  // W3WalletDispatch永遠不會改變，固只會跑一次
  useEffect(() => {
    (async () => {
      const provider = await detectEthereumProvider()
      const eProvider = new providers.Web3Provider(provider)
      await eProvider.send("eth_requestAccounts", [])
      const signer = eProvider.getSigner()
      W3WalletDispatch({
        type: "detectIsMetaMaskInstalled",
        payload: {
          provider,
          eProvider,
          signer
        },
      })
    })()
  }, [W3WalletDispatch])

  // 如果有安裝MetaMask，則切換到指定預設的Network
  // 如MetaMask無法切換到此Network，則新增指定Network
  // 偵測帳號，如果有帳號則表示有登入
  useEffect(() => {
    (async () => {
      if (W3Wallet.isMetaMaskInstalled) {
        W3Wallet.provider.on("error", (error) => {
          console.log(error)
        })
        if (onWallet === "walletConnect") {
          return
        }
        const accounts = await detectAccounts(W3Wallet.provider)
        W3WalletDispatch({
          type: "detectAccounts",
          payload: {
            accounts,
          },
        })
        const chainId = parseInt(await detectNetwork(W3Wallet.provider))
        if (accounts.length > 0) {
          if (chainId !== 1 && chainId !== 56) {
            W3WalletDispatch({
              type: "updateChainId",
              payload: await switchNetwork(W3Wallet.provider),
            })
          } else {
            W3WalletDispatch({
              type: "detectNetwork",
              payload: chainId,
            })
          }
        }
      }
    })()
  }, [W3Wallet.isMetaMaskInstalled, W3Wallet.provider, W3WalletDispatch])

  useEffect(() => {
    if (W3Wallet.provider) {
      W3Wallet.provider.on("chainChanged", (chainId) => {
        W3WalletDispatch({
          type: "detectNetwork",
          payload: parseInt(chainId),
        })
      })
      W3Wallet.provider.on("accountsChanged", (accounts) => {
        W3WalletDispatch({
          type: "updateAccounts",
          payload: {
            accounts,
          },
        })
      })
    }
  }, [W3WalletDispatch, W3Wallet.provider])
  const accountShorten = W3Wallet.accounts[0] && W3Wallet.accounts[0].slice(0, 6) + "..." + W3Wallet.accounts[0].slice(38, 42)

  const handleDisconnect = () => W3WalletDispatch({ type: "disconnectAccounts" })

  return (
    <>
      {!W3Wallet.isMetaMaskConnected && (
        <button
          className={`inline-block py-4 px-8 text-mon font-bold ${styles.blurBtn}`}
          onClick={() => setIsModal(true)}
        >
          Connect Wallet
        </button>
      )}
      {W3Wallet.isMetaMaskConnected && (
        <button className={`inline-block py-4 px-8 text-mon font-bold ${styles.blurBtn}`}
          onClick={handleDisconnect}
        >
          {accountShorten}
        </button>
      )}
      {isModal &&
        <WalletList
          setIsModal={setIsModal}
          connectBtnClick={connectBtnClick}
          isMetaMaskInstalled={W3Wallet.isMetaMaskInstalled}
        />
      }
    </>
  )
}

export default W3WalletDriver
