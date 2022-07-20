import styles from "../styles/Home.module.css";
import { useState } from "react";
import { W3WalletDriver, useW3Wallet } from "../components/w3wallet";
import { constants, Contract } from "ethers";
import { seaportABI } from "../constants"
import { 
  owner, seaport, zone, ERC721Token, ERC1155Token, LOOT,
} from "../constants/contracts"
import {
  parseEther,
  toKey,
  getOfferOrConsiderationItem,
  getItemETH,
  getBasicOrderParameters,
  createOrder,
} from "../test/utils"

// import { getOfferOrConsiderationItem } from "../test/utils/encoding.ts"

export default function Home() {
  const [W3Wallet] = useW3Wallet()
  const { eProvider, signer, accounts, chainId } = W3Wallet

  const marketplaceContract = new Contract(seaport, seaportABI, eProvider)
  const tokenId = 50
  const tokenId2 = 59
  const ERC1155TokenId = 1
  const ERC1155TokenId2 = 2
  const ERC1155TokenId3 = 3
  const offer = [
    // ERC721
    getOfferOrConsiderationItem(2, ERC721Token, tokenId2),
    // getOfferOrConsiderationItem(2, ERC721Token, tokenId2),

    // ERC1155
    // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId, 1, 1),
    // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId2, 1, 1),
  ]
  const [order, setOrder] = useState(null)
  const [orderComponents, setOrderComponents] = useState(null)
  const [value, setValue] = useState(null)

  const account = accounts[0];

  const consideration = [
    // * <=> ERC721
    // getOfferOrConsiderationItem(2, ERC721Token, 57, 1, 1, account),
    // getOfferOrConsiderationItem(2, ERC721Token, 58, 1, 1, account)

    // * <=> NATIVE
    // getItemETH(parseEther("0.1"), parseEther("0.1"), account),
    // getItemETH(parseEther("0.01"), parseEther("0.01"), owner),

    // * <=> ERC20
    getOfferOrConsiderationItem(1, LOOT, 0, 50, 50, account),
    getOfferOrConsiderationItem(1, LOOT, 0, 5, 5, owner),

    // * <=> ERC1155
    // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId3, 1, 1, account),
    // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId2, 1, 1, account),
  ]

  const create = async () => {
    const { order, value, orderComponents } = await createOrder(
      marketplaceContract,
      chainId,
      signer,
      zone,
      offer,
      consideration,
      0, // FULL_OPEN
      // [],
      // null,
      // constants.HashZero,
      // constants.HashZero
      // true // extraCheap
    )
    setOrder(order)
    setOrderComponents(orderComponents)
    setValue(value)
  }

  const fullfill = async () => {
    const tx = marketplaceContract
      .connect(signer)
      .fulfillOrder(order, toKey(0), {
        value,
      });
    const receipt = await (await tx).wait();
    console.log(receipt)
  }

  const fullfillBasic = async () => {
    const basicOrderParameters = getBasicOrderParameters(
      0, // EthForERC721
      // 1, // EthForERC1155
      // 2, // ERC20ForERC721
      // 3, // ERC20ForERC1155
      order
    );
    
    const tx = marketplaceContract
      .connect(signer)
      .fulfillBasicOrder(basicOrderParameters, {
        value,
      });
    const receipt = await (await tx).wait();
    console.log(receipt)
  }

  const validate = async () => {
    const tx = marketplaceContract
      .connect(signer)
      .validate([order]);
    const receipt = await (await tx).wait();
    console.log(receipt)
  }

  const cancel = async () => {
    const tx = marketplaceContract
      .connect(signer)
      .cancel([orderComponents]);
    const receipt = await (await tx).wait();
    console.log(receipt)

  }

  return (
    <div className={styles.container}>
      {console.log()}
      <main className={styles.main}>
        <W3WalletDriver />
        <button onClick={create}>create order</button>
        <button onClick={fullfill}>fullfill order</button>
        <button onClick={validate}>validate order</button>
        <button onClick={cancel}>cancel order</button>
        <button onClick={fullfillBasic}>fullfill basic order</button>
      </main>
    </div>
  );
}
