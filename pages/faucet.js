import styles from "../styles/Home.module.css";
import { W3WalletDriver, useW3Wallet } from "../components/w3wallet";
import { Contract } from "ethers";
import { useState, useEffect, useCallback } from "react";
import {
  parseEther,
} from "../utils"

const Faucet = () => {
  const [W3Wallet] = useW3Wallet()
  const { eProvider, signer, accounts, chainId } = W3Wallet
  const [amount721, setAmount721] = useState(10)
  const [arr721, setArr721] = useState(null)
  const account = accounts[0]

  const address721 = chainId === 4002 ? "0xa297d6397c3aa061a747282012e76671a599905f" : "0x3A5C80D9D27475c045d9f54623c5655E24aFCE46"
  const address1155 = chainId === 4002 ? "0x56bC3d76bE6Cb0Ba9064f6252F30644Cd1181C87" : "0x50dc07236EbcFd4BEf7B2599A110F9d155197A06"
  const address20 = chainId === 4002 ? "0xBaFdc1e513F79715C36cb57b79b2D4Ae781CA824" : "0xF7a5f45682Fdc9De5F5Ee63083F79124B5b31001"
  const mint721 = async () => {
    const abi = [
      {
      inputs: [{ internalType: "uint256", name: "num", type: "uint256" }],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "index", type: "uint256" },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      }
    ]
    const contract = (new Contract(address721, abi, eProvider)).connect(signer)
    const tx = contract
      .mint(amount721);
    await (await tx).wait();
    const balance = await contract.balanceOf(account)
    const mintedBefore = balance - amount721
    const arr = []
    for (let i = mintedBefore; i < balance; ++i) {
      const tokenId = await contract.tokenOfOwnerByIndex(account, i)
      arr.push(Number(tokenId))
    }
    setArr721(arr)
  }
  const mint1155 = async () => {
    const abi = [
      {
        "inputs": [
          { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" },
          { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }
        ],
        "name": "mintBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    const contract = (new Contract(address1155, abi, eProvider)).connect(signer)
    const tx = contract
      .mintBatch([1,2,3,4,5], [100,100,100,100,100]);
    await (await tx).wait();
  }
  const mint20 = async () => {
    const abi = [
      {
        inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      }
    ]
    const contract = (new Contract(address20, abi, eProvider)).connect(signer)
    const tx = contract
      .mint(parseEther("100000"));
    await (await tx).wait();
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>{console.log(chainId)}
        <W3WalletDriver />
        <div>
          <div className="space-x-1">
            <span>ERC721:</span>
            <input type="number" value={amount721} onChange={e => setAmount721(e.target.value)} className="border-2 p-1" />
            <button onClick={mint721} className="border-2 p-1">mint721</button>
          </div>
          <div className="space-x-1">
            <div>address: {address721}</div>
            minted721tokenId:{" "}
            {arr721 && arr721.map(i => <span key={i}>{i}, </span>)}
          </div>
        </div>
        <div className="mt-4">
          <div className="space-x-1">
            <span>ERC1155:</span>
            <button onClick={mint1155} className="border-2 p-1">mint1155</button>
          </div>
          <div>
            <div>address: {address1155}</div>
            1155統一給tokenId 1, 2, 3, 4, 5，每個都給100個
          </div>
        </div>
        <div className="mt-4">
          <div className="space-x-1">
            <span>ERC20:</span>
            <button onClick={mint20} className="border-2 p-1">mint20</button>
          </div>
          <div>
            <div>address: {address20}</div>
            ERC20 都給 100000
          </div>
        </div>
      </main>
    </div>

  )
}

export default Faucet