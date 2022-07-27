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
  getItem20,
  getItem721,
  getItem1155,
  getBasicOrderParameters,
  createOrder,
  buildResolver,
  getItem1155WithCriteria,
  getItem721WithCriteria,
  defaultBuyNowMirrorFulfillment,
  createMirrorBuyNowOrder
} from "../utils"


export default function Home() {
  const [W3Wallet] = useW3Wallet()
  const { eProvider, signer, accounts, chainId } = W3Wallet
  const account = accounts[0];

  const marketplaceContract = new Contract(seaport, seaportABI, eProvider)
  const tokenId = 50
  const ERC1155TokenId = 1
  const ERC1155TokenId2 = 2
  const ERC1155TokenId3 = 3
  const [order, setOrder] = useState(null)
  const [order2, setOrder2] = useState(null)
  const [value, setValue] = useState(null)
  const [mirrorOrder, setMirrorOrder] = useState(null)

  const offer = [
    getItem721(ERC721Token, tokenId),
  ]

  const consideration = [
    getItem20(LOOT, 50, 50, account),
    getItem20(LOOT, 5, 5, zone),
    getItem20(LOOT, 5, 5, owner),
  ]
  const offer2 = [
    getItem20(LOOT, 70, 70),
  ]

  const consideration2 = [
    getItem721(ERC721Token, tokenId, 1, 1, account),
  ]

  const create = async () => {
    const { order, value } = await createOrder(
      marketplaceContract,
      chainId,
      signer,
      zone,
      offer,
      consideration,
      0, // FULL_OPEN
    )

    setOrder(order)
    setValue(value)
  }
  const create2 = async () => {
    const { order } = await createOrder(
      marketplaceContract,
      chainId,
      signer,
      zone,
      offer2,
      consideration2,
      0, // FULL_OPEN
    )

    setOrder2(order)
  }

  const mirror = async () => {
    const _signer = signer
    _signer.address = account
    const { mirrorOrder } = await createMirrorBuyNowOrder(marketplaceContract, _signer, zone, order, chainId);
    setMirrorOrder(mirrorOrder)
    console.log(mirrorOrder)
  }

  const match = async () => {
    const fulfillments = defaultBuyNowMirrorFulfillment;

    const tx = marketplaceContract
      .connect(signer)
      .matchOrders(
        [
          order,
          order2
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
        <button onClick={create2}>create order2</button>
        <button onClick={mirror}>mirror</button>
        <button onClick={match}>match order</button>
      </main>
    </div>
  );
}
