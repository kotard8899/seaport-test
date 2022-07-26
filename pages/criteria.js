import styles from "../styles/Home.module.css";
import { useState, useEffect, useCallback } from "react";
import { W3WalletDriver, useW3Wallet } from "../components/w3wallet";
import { constants, Contract } from "ethers";
import { approveABI, seaportABI, erc20ABI } from "../constants"
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
  getItem721WithCriteria
} from "../utils"

const OfferItem = ({ offer, setOffer, approve, cn }) => {
  const { type } = offer
  return (
    <div className="space-x-2">
      {cn ? (
        <select
          id="offertype"
          value={offer.type}
          onChange={(e) => setOffer({ ...offer, type: e.target.value})}
          className="border-2 p-1 w-24"
        >
          <option value="721">721</option>
          <option value="1155">1155</option>
        </select>
      ) : (
        <select
          id="offertype"
          value={type}
          onChange={(e) => setOffer({ ...offer, type: e.target.value})}
          className="border-2 p-1 w-24"
        >
          <option value="20">20</option>
        </select>
      )}
      {type !== "NATIVE" && <input
        type="text"
        placeholder="address"
        value={offer.address}
        onChange={(e) => setOffer({ ...offer, address: e.target.value})}
        className="border-2 p-1"
      />}
      {type !== "721" && <input
        type="text"
        placeholder="amount"
        value={offer.amount || ""}
        onChange={(e) => setOffer({ ...offer, amount: e.target.value})}
        className="border-2 p-1"
      />}
      {!offer.isApproved && type!== "NATIVE" && <button
        className="border px-2 p-1"
        onClick={() => approve(offer, setOffer)}
      >
        approve
      </button>}
    </div>
  )
}

export default function Home() {
  const [W3Wallet] = useW3Wallet()
  const { eProvider, signer, accounts, chainId } = W3Wallet
  const account = accounts[0];

  const marketplaceContract = new Contract(seaport, seaportABI, eProvider)
  const tokenId2 = 59
  const ERC1155TokenId = 1
  const ERC1155TokenId2 = 2
  const ERC1155TokenId3 = 3
  const [order, setOrder] = useState(null)
  const [offer, setOffer] = useState(null)
  const [consideration, setConsideration] = useState(null)
  const [criteriaResolvers, setCriteriaResolvers] = useState(null)
  const [tokenId, setTokenId] = useState(null)
  const [value, setValue] = useState(null)
  const [offer1, setOffer1] = useState({
    isApproved: false,
    type: "20",
    address: "",
    amount: undefined,
    tokenId: undefined
  })
  const [cn1, setCn1] = useState({
    isApproved: false,
    type: "721",
    address: "",
    amount: undefined,
    tokenId: undefined,
    recipient: undefined
  })

  const checkIsApproved = useCallback(async (address, type, set) => {
    let contract
    let isApproved
    if (type === "20") {
      contract = new Contract(address, erc20ABI, eProvider)
      const allowance = await contract.connect(signer).allowance(account, seaport)
      if (allowance / Math.pow(10, 18) >= 10000000) {
        isApproved = true
      }
    } else {
      contract = new Contract(address, approveABI, eProvider)
      isApproved = await contract.connect(signer).isApprovedForAll(account, seaport)
    }
    isApproved && set(prev => ({ ...prev, isApproved }))
  }, [account, eProvider, signer])

  useEffect(() => {
    offer1.address && checkIsApproved(offer1.address, offer1.type, setOffer1)
  }, [checkIsApproved, offer1.address, offer1.type, offer1.isApproved])

  useEffect(() => {
    cn1.address && checkIsApproved(cn1.address, cn1.type, setCn1)
  }, [checkIsApproved, cn1.address, cn1.type, cn1.isApproved])

  const getItem = ({ type, address, amount, tokenId, recipient }) => {
    if (type === "20") {
      return getItem20(address, amount, amount, recipient)
    } else if (type === "721") {
      return getItem721WithCriteria(address, constants.HashZero, 1, 1, recipient)
    } else {
      return getItem1155WithCriteria(address, constants.HashZero, amount, amount, recipient)
    }
  }

  const create = async () => {
    const offer = []
    const consideration = []
    offer.push(getItem(offer1))
    cn1.recipient = account
    console.log(offer1.address)
    consideration.push(getItem(cn1))
    consideration.push(getItem20(offer1.address, offer1.amount*0.025, offer1.amount*0.025, zone))
    consideration.push(getItem20(offer1.address, offer1.amount*0.05, offer1.amount*0.05, "0x64568ACE195D79423a4836e84BabE4470c2C2067"))
    const criteriaResolvers = [
      // buildResolver(0, 0, 0, tokenId, proofs[tokenId.toString()]),
      // buildResolver(0, 0, 0, ERC1155TokenId, proofs[ERC1155TokenId.toString()]),
  
      // collection-level
      buildResolver(0, 1, 0, tokenId2, []),
    ];
    const { order, value } = await createOrder(
      marketplaceContract,
      chainId,
      signer,
      zone,
      offer,
      consideration,
      0, // FULL_OPEN
      criteriaResolvers,
    )
    setOrder(order)
    setOffer(offer)
    setConsideration(consideration)
    setValue(value)
    setCriteriaResolvers(criteriaResolvers)
  }

  const handleFullfill = async () => {
    criteriaResolvers[0].identifier = tokenId

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

  const approve = async (offer, setOffer) => {
    const { type, address } = offer
    let contract
    let tx
    if (type === "20") {
      contract = new Contract(address, erc20ABI, eProvider)
      tx = contract.connect(signer).approve(seaport, parseEther("10000000000"))
    } else {
      contract = new Contract(address, approveABI, eProvider)
      tx = contract.connect(signer).setApprovalForAll(seaport, true)
    }
    await (await tx).wait();
    setOffer({ ...offer, isApproved: true })
  }

  return (
    <div className={styles.container}>
      {console.log()}
      <main className={styles.main}>
        <W3WalletDriver />
        <div className="mb-5 mt-5">
          <p>
            情境: make collection offer，offerer對該collection下offer，不指定tokenId
          </p> 
        </div>
        <div className="text-left">
          <div>
            <div className="text-lg font-bold">offers</div>
            <OfferItem offer={offer1} setOffer={setOffer1} approve={approve} />
          </div>
          <div>
            <div className="text-lg font-bold mt-2">considerations (這裡的approve要換完帳號 (換成nft持有者) 再按）</div>
            <OfferItem offer={cn1} setOffer={setCn1} approve={approve} cn={true} />
          </div>
        </div>
        <button onClick={create} className="border-2 py-2 mt-2 px-5">create order</button>
        <div className="flex flex-col items-center">
          <p className="mt-5">
            make offer完之後換成該collection的nft持有者去接受去接受出價並賣給他
          </p>
          <div className="text-lg font-bold mt-2">tokenId</div>
          <input
            type="number"
            value={tokenId || ""}
            onChange={e => setTokenId(Number(e.target.value))}
            className="border-2 p-1 w-24"
          />
        </div>
        <button onClick={handleFullfill} className="border-2 py-2 mt-2 px-5">fullfill order</button>
      </main>
    </div>
  );
}
