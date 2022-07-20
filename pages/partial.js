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

  const marketplaceContract = new Contract(seaport, seaportABI, eProvider)
  const ERC1155TokenId = 1
  const ERC1155TokenId2 = 2
  const ERC1155TokenId3 = 3
  const offer = [
    // ERC1155
    getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId, 100, 100),
    // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId2, 1, 1),
  ]
  const [order, setOrder] = useState(null)
  const [value, setValue] = useState(null)

  const account = accounts[0];

  const consideration = [
    // * <=> ERC721
    // getOfferOrConsiderationItem(2, ERC721Token, 57, 1, 1, account),
    // getOfferOrConsiderationItem(2, ERC721Token, 58, 1, 1, account)

    // * <=> NATIVE
    getItemETH(parseEther("0.1"), parseEther("0.1"), account),
    getItemETH(parseEther("0.01"), parseEther("0.01"), owner),

    // * <=> ERC20
    // getOfferOrConsiderationItem(1, LOOT, 0, 50, 50, account),
    // getOfferOrConsiderationItem(1, LOOT, 0, 5, 5, owner),

    // * <=> ERC1155
    // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId3, 1, 1, account),
    // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId2, 1, 1, account),
  ]

  const create = async () => {
    const { order, value } = await createOrder(
      marketplaceContract,
      account,
      zone,
      offer,
      consideration,
      1, // PARTIAL_OPEN
      [],
      null,
      signer
    )

    order.numerator = 2; // fill two tenths or one fifth
    order.denominator = 10; // fill two tenths or one fifth

    setOrder(order)
    setValue(value)

  }

  const fullfill = async () => {
    order.numerator = 1; // fill two tenths or one fifth
    order.denominator = 2; // fill two tenths or one fifth
    const tx = marketplaceContract
      .connect(signer)
      .fulfillAdvancedOrder(
        order,
        [],
        toKey(0),
        constants.AddressZero,
        {
          value,
        }
      );
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
      </main>
    </div>
  );
}
