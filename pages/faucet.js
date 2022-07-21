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
    const contract = (new Contract("0xFb6C49E19049C98Cc637A0B800b5FD2C6696F0D9", abi, eProvider)).connect(signer)
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
    const contract = (new Contract("0x8e459a3a03dDF3AcbaFc0dF52cbd800bA1F1B69A", abi, eProvider)).connect(signer)
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
    const contract = (new Contract("0x34387ed89DFF4f519C2072c7c2DB0ac2e02e0e77", abi, eProvider)).connect(signer)
    const tx = contract
      .mint(parseEther("100000"));
    await (await tx).wait();
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <W3WalletDriver />
        <div>
          <div className="space-x-1">
            <span>ERC721:</span>
            <input type="number" value={amount721} onChange={e => setAmount721(e.target.value)} className="border-2 p-1" />
            <button onClick={mint721} className="border-2 p-1">mint721</button>
          </div>
          <div className="space-x-1">
            <div>address: 0xFb6C49E19049C98Cc637A0B800b5FD2C6696F0D9</div>
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
            <div>address: 0x8e459a3a03dDF3AcbaFc0dF52cbd800bA1F1B69A</div>
            1155統一給tokenId 1, 2, 3, 4, 5，每個都給100個
          </div>
        </div>
        <div className="mt-4">
          <div className="space-x-1">
            <span>ERC20:</span>
            <button onClick={mint20} className="border-2 p-1">mint20</button>
          </div>
          <div>
            <div>address: 0x34387ed89DFF4f519C2072c7c2DB0ac2e02e0e77</div>
            ERC20 都給 100000
          </div>
        </div>
      </main>
    </div>

  )
}

export default Faucet