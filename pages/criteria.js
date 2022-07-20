import styles from "../styles/Home.module.css";
import { useState } from "react";
import { W3WalletDriver, useW3Wallet } from "../components/w3wallet";
import { constants, Contract, BigNumber } from "ethers";
import { seaportABI } from "../constants"

import { 
  owner, seaport, zone, ERC721Token, ERC1155Token, LOOT, wrapToken,
} from "../constants/contracts"
import {
  parseEther,
  keccak256,
  toKey,
  toBN,
  getOfferOrConsiderationItem,
  getItemETH,
  getBasicOrderParameters,
  createOrder,
} from "../utils"

const combinedHash = (first, second) => {
  if (!first) {
    return second;
  }
  if (!second) {
    return first;
  }

  return Buffer.from(
    keccak256(Buffer.concat([first, second].sort(Buffer.compare))).slice(2),
    "hex"
  );
};

const getNextLayer = (elements) => {
  return elements.reduce((layer, el, idx, arr) => {
    if (idx % 2 === 0) {
      // Hash the current element with its pair element
      layer.push(combinedHash(el, arr[idx + 1]));
    }

    return layer;
  }, []);
};

const getLayers = (elements) => {
  if (elements.length === 0) {
    throw new Error("empty tree");
  }

  const layers = [];
  layers.push(elements.map((el) => Buffer.from(keccak256(el).slice(2), "hex")));

  // Get next layer until we reach the root
  while (layers[layers.length - 1].length > 1) {
    layers.push(getNextLayer(layers[layers.length - 1]));
  }

  return layers;
};

const getHexProof = (
  el,
  bufferElementPositionIndex,
  layers
) => {
  let idx = bufferElementPositionIndex["0x" + el.toString("hex")];

  if (typeof idx !== "number") {
    throw new Error("Element does not exist in Merkle tree");
  }

  const proofBuffer = layers.reduce((proof, layer) => {
    const pairIdx = idx % 2 === 0 ? idx + 1 : idx - 1;
    const pairElement = pairIdx < layer.length ? layer[pairIdx] : null;

    if (pairElement) {
      proof.push(pairElement);
    }

    idx = Math.floor(idx / 2);

    return proof;
  }, []);

  return proofBuffer.map((el) => "0x" + el.toString("hex"));
};

export const merkleTree = (tokenIds) => {
  const elements = tokenIds
    .map((tokenId) =>
      Buffer.from(tokenId.toHexString().slice(2).padStart(64, "0"), "hex")
    )
    .sort(Buffer.compare)
    .filter((el, idx, arr) => {
      return idx === 0 || !arr[idx - 1].equals(el);
    });

  const bufferElementPositionIndex = elements.reduce(
    (memo, el, index) => {
      memo["0x" + el.toString("hex")] = index;
      return memo;
    },
    {}
  );

  // Create layers
  const layers = getLayers(elements);

  const root = "0x" + layers[layers.length - 1][0].toString("hex");

  const proofs = Object.fromEntries(
    elements.map((el) => [
      BigNumber.from(el).toString(),
      getHexProof(el, bufferElementPositionIndex, layers),
    ])
  );

  const maxProofLength = Math.max(
    ...Object.values(proofs).map((i) => i.length)
  );

  return {
    root,
    proofs,
    maxProofLength,
  };
};

export const buildResolver = (
  orderIndex,
  side,
  index,
  identifier,
  criteriaProof
) => ({
  orderIndex,
  side,
  index,
  identifier,
  criteriaProof,
});

export default function Home() {
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

  const offer = [
    // ERC721
    // getOfferOrConsiderationItem(4, ERC721Token, root, toBN(1), toBN(1))

    // ERC1155
    // getOfferOrConsiderationItem(5, ERC1155Token, root, toBN(10), toBN(10))

    // collection-level
    // getOfferOrConsiderationItem(4, ERC721Token, constants.HashZero, toBN(1), toBN(1))

    // ERC20
    getOfferOrConsiderationItem(1, wrapToken, 0, toBN("110000000000000000"), toBN("110000000000000000"))
  ];

  const consideration = [
    // * <=> ERC721
    // getOfferOrConsiderationItem(2, ERC721Token, 57, 1, 1, account),
    // getOfferOrConsiderationItem(2, ERC721Token, 58, 1, 1, account)

    // * <=> NATIVE
    // getItemETH(parseEther("0.1"), parseEther("0.1"), account),
    // getItemETH(parseEther("0.01"), parseEther("0.01"), owner),

    getOfferOrConsiderationItem(4, ERC721Token, constants.HashZero, toBN(1), toBN(1), account),

    // * <=> ERC20
    getOfferOrConsiderationItem(1, wrapToken, 0, toBN("10000000000000000"), toBN("10000000000000000"), zone),
    getOfferOrConsiderationItem(1, wrapToken, 0, toBN("10000000000000000"), toBN("10000000000000000"), owner),

    // * <=> ERC1155
    // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId3, 1, 1, account),
    // getOfferOrConsiderationItem(3, ERC1155Token, ERC1155TokenId2, 1, 1, account),
  ]

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
