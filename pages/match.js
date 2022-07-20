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
} from "../utils"

export default function Home() {
  const [W3Wallet] = useW3Wallet()
  const { eProvider, signer, accounts } = W3Wallet
  const account = accounts[0];

  const marketplaceContract = new Contract(seaport, seaportABI, eProvider)
  const tokenId = 50
  const ERC1155TokenId = 1
  const ERC1155TokenId2 = 2
  const ERC1155TokenId3 = 3
  const [order, setOrder] = useState(null)
  const [value, setValue] = useState(null)
  const [mirrorOrder, setMirrorOrder] = useState(null)

  const offer = [
    getOfferOrConsiderationItem(2, ERC721Token, tokenId),
    // ERC1155
    // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId, 100, 100),
    // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId2, 1, 1),
  ]

  const consideration = [
    // * <=> NATIVE
    getItemETH(parseEther("0.1"), parseEther("0.1"), account),
    getItemETH(parseEther("0.01"), parseEther("0.01"), zone),
    getItemETH(parseEther("0.01"), parseEther("0.01"), owner),
  ]

  const create = async () => {
    const { order, value } = await createOrder(
      marketplaceContract,
      account,
      zone,
      offer,
      consideration,
      0, // FULL_OPEN
      [],
      null,
      signer
    )

    // order.numerator = 2; // fill two tenths or one fifth
    // order.denominator = 10; // fill two tenths or one fifth

    setOrder(order)
    setValue(value)
  }

  const mirror = async () => {
    const { mirrorOrder } = await createMirrorBuyNowOrder(marketplaceContract, account, signer, zone, order);
    setMirrorOrder(mirrorOrder)
  }

  const match = async () => {
    const fulfillments = defaultBuyNowMirrorFulfillment;

    const tx = marketplaceContract
      .connect(signer)
      .matchOrders(
        [
          order,
          mirrorOrder
        ],
        fulfillments, 
        {
          value,
        });
    const receipt = await (await tx).wait();
    console.log(receipt)
  }

  return (
    <div className={styles.container}>
      {console.log()}
      <main className={styles.main}>
        <W3WalletDriver />
        <button onClick={create}>create order</button>
        <button onClick={mirror}>mirror</button>
        <button onClick={match}>match order</button>
      </main>
    </div>
  );
}
