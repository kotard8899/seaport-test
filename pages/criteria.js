import styles from "../styles/Home.module.css";
import { useState } from "react";
import { W3WalletDriver, useW3Wallet } from "../components/w3wallet";
import { constants, Contract, BigNumber } from "ethers";
import { seaportABI } from "../constants"

import { 
  owner, seaport, zone, ERC721Token, ERC1155Token, LOOT, wrapToken,
} from "../constants/contracts"
import {
  merkleTree,
  buildResolver,
  toBN,
} from "../utils"

export default function Criteria() {
  const [W3Wallet] = useW3Wallet()
  const { eProvider, signer, accounts } = W3Wallet
  const account = accounts[0];

  const marketplaceContract = new Contract(seaport, seaportABI, eProvider)
  const tokenId = toBN(50)
  const tokenId2 = toBN(59)
  const tokenId3 = toBN(1)
  const tokenIds = [tokenId, tokenId2, tokenId3];
  const ERC1155TokenId = toBN(1)
  const ERC1155TokenId2 = toBN(2)
  const ERC1155TokenId3 = toBN(3)
  const ERC1155TokenIds = [ERC1155TokenId, ERC1155TokenId2, ERC1155TokenId3];

  const [order, setOrder] = useState(null)
  const [value, setValue] = useState(null)

  const { root, proofs } = merkleTree(ERC1155TokenIds);

  // const offer = [
  //   // ERC721
  //   // getOfferOrConsiderationItem(4, ERC721Token, root, toBN(1), toBN(1))

  //   // ERC1155
  //   // getOfferOrConsiderationItem(5, ERC1155Token, root, toBN(10), toBN(10))

  //   // collection-level
  //   // getOfferOrConsiderationItem(4, ERC721Token, constants.HashZero, toBN(1), toBN(1))

  //   // ERC20
  //   getOfferOrConsiderationItem(1, wrapToken, 0, toBN("110000000000000000"), toBN("110000000000000000"))
  // ];

  // const consideration = [
  //   // * <=> ERC721
  //   // getOfferOrConsiderationItem(2, ERC721Token, 57, 1, 1, account),
  //   // getOfferOrConsiderationItem(2, ERC721Token, 58, 1, 1, account)

  //   // * <=> NATIVE
  //   // getItemETH(parseEther("0.1"), parseEther("0.1"), account),
  //   // getItemETH(parseEther("0.01"), parseEther("0.01"), owner),

  //   getOfferOrConsiderationItem(4, ERC721Token, constants.HashZero, toBN(1), toBN(1), account),

  //   // * <=> ERC20
  //   getOfferOrConsiderationItem(1, wrapToken, 0, toBN("10000000000000000"), toBN("10000000000000000"), zone),
  //   getOfferOrConsiderationItem(1, wrapToken, 0, toBN("10000000000000000"), toBN("10000000000000000"), owner),

  //   // * <=> ERC1155
  //   // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId3, 1, 1, account),
  //   // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId2, 1, 1, account),
  // ]

  const criteriaResolvers = [
    // buildResolver(0, 0, 0, tokenId, proofs[tokenId.toString()]),
    // buildResolver(0, 0, 0, ERC1155TokenId, proofs[ERC1155TokenId.toString()]),

    // collection-level
    buildResolver(0, 1, 0, tokenId3, []),
  ];

  const create = async () => {
    const { order, value } = await createOrder(
      marketplaceContract,
      account,
      zone,
      offer,
      consideration,
      0, // FULL_OPEN
      criteriaResolvers,
      null,
      signer
    )

    setOrder(order)
    setValue(value)

  }

  const fullfill = async () => {
    criteriaResolvers[0].identifier = tokenId2

    const tx = marketplaceContract
      .connect(signer)
      .fulfillAdvancedOrder(
        order,
        criteriaResolvers,
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
