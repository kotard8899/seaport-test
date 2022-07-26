import { useState } from "react";
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import Web3 from "web3";
import { providers, utils } from "ethers"

const Magiclink = () => {
  const [account, setAccount] = useState(null);
  const [magic, setMagic] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  const sendTransaction = async () => {
    const txnParams = {
      to: account,
      value: utils.parseEther("0.01"),
      // gasPrice: utils.parseUnits("30.0", "gwei")
    };
    const tx = await signer.sendTransaction(txnParams)
    console.log(tx)
  };

  const login = async () => {
    const magic = new Magic("pk_live_9D82FFCAC3B9925C", {
      network: "rinkeby",
      locale: "en_US",
      extensions: [new ConnectExtension()]
    });
    const provider = new providers.Web3Provider(magic.rpcProvider);
    const signer = provider.getSigner()
    const account = await signer.getAddress()
    setMagic(magic)
    setProvider(provider)
    setAccount(account)
    setSigner(signer)
  };

  const signMessage = async () => {
    const signedMessage = await signer
      .signMessage("My Message")
      .catch((e) => console.log(e));
    console.log(signedMessage);
  };

  const showWallet = () => {
    magic.connect.showWallet().catch((e) => {
      console.log(e);
    });
  };

  const disconnect = async () => {
    await magic.connect.disconnect().catch((e) => {
      console.log(e);
    });
    setAccount(null);
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen space-y-2">
      <h2 className="font-bold text-2xl">Magic Connect</h2>
      {!account && (
        <button onClick={login} className="button-row">
          Sign In
        </button>
      )}

      {account && (
        <>
          <button onClick={showWallet} className="block">
            Show Wallet
          </button>
          <button onClick={sendTransaction} className="block">
            Send Transaction (試送0.01ETH給自己, 錢包裡的錢不夠會失敗)
          </button>
          <button onClick={signMessage} className="block">
            Sign Message
          </button>
          <button onClick={disconnect} className="block">
            Disconnect
          </button>
        </>
      )}
    </div>
  );
}

export default Magiclink
