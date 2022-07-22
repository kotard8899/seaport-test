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
          <option value="NATIVE">NATIVE</option>
          <option value="20">20</option>
          <option value="1155">1155</option>
        </select>
      ) : (
        <select
          id="offertype"
          value={type}
          onChange={(e) => setOffer({ ...offer, type: e.target.value})}
          className="border-2 p-1 w-24"
        >
          <option value="1155">1155</option>
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
        type="number"
        placeholder="amount"
        value={offer.amount || ""}
        onChange={(e) => setOffer({ ...offer, amount: e.target.value})}
        className="border-2 p-1"
      />}
      {(type === "721" || type === "1155") && <input
        type="number"
        placeholder="tokenId"
        value={offer.tokenId || ""}
        onChange={(e) => setOffer({ ...offer, tokenId: e.target.value})}
        className="border-2 p-1"
      />}
      {cn && <input
        type="text"
        placeholder="recipient"
        value={offer.recipient || ""}
        onChange={(e) => setOffer({ ...offer, recipient: e.target.value})}
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

  const marketplaceContract = new Contract(seaport, seaportABI, eProvider)
  const [order, setOrder] = useState(null)
  const [value, setValue] = useState(null)
  const [numerator, setNumerator] = useState(1)
  const [denominator, setDenominator] = useState(2)
  const [offer1, setOffer1] = useState({
    isApproved: false,
    type: "1155",
    address: "",
    amount: undefined,
    tokenId: undefined
  })
  const [offer2, setOffer2] = useState({
    isApproved: false,
    type: "1155",
    address: "",
    amount: undefined,
    tokenId: undefined
  })
  const [offer3, setOffer3] = useState({
    isApproved: false,
    type: "1155",
    address: "",
    amount: undefined,
    tokenId: undefined
  })
  const [offer4, setOffer4] = useState({
    isApproved: false,
    type: "1155",
    address: "",
    amount: undefined,
    tokenId: undefined
  })
  const [offer5, setOffer5] = useState({
    isApproved: false,
    type: "1155",
    address: "",
    amount: undefined,
    tokenId: undefined
  })
  const [cn1, setCn1] = useState({
    isApproved: false,
    type: "NATIVE",
    address: "",
    amount: undefined,
    tokenId: undefined,
    receipt: undefined
  })
  const [cn2, setCn2] = useState({
    isApproved: false,
    type: "NATIVE",
    address: "",
    amount: undefined,
    tokenId: undefined,
    receipt: undefined
  })
  const [cn3, setCn3] = useState({
    isApproved: false,
    type: "NATIVE",
    address: "",
    amount: undefined,
    tokenId: undefined,
    receipt: undefined
  })
  const [cn4, setCn4] = useState({
    isApproved: false,
    type: "NATIVE",
    address: "",
    amount: undefined,
    tokenId: undefined,
    receipt: undefined
  })
  const [cn5, setCn5] = useState({
    isApproved: false,
    type: "NATIVE",
    address: "",
    amount: undefined,
    tokenId: undefined,
    receipt: undefined
  })

  const account = accounts[0];

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
    offer2.address && checkIsApproved(offer2.address, offer2.type, setOffer2)
    offer3.address && checkIsApproved(offer3.address, offer3.type, setOffer3)
    offer4.address && checkIsApproved(offer4.address, offer4.type, setOffer4)
    offer5.address && checkIsApproved(offer5.address, offer5.type, setOffer5)
  }, [checkIsApproved, offer1.address, offer1.type, offer2.address, offer2.type, offer3.address, offer3.type, offer4.address, offer4.type, offer5.address, offer5.type, offer1.isApproved, offer2.isApproved, offer3.isApproved, offer4.isApproved, offer5.isApproved])

  useEffect(() => {
    cn1.address && checkIsApproved(cn1.address, cn1.type, setCn1)
    cn2.address && checkIsApproved(cn2.address, cn2.type, setCn2)
    cn3.address && checkIsApproved(cn3.address, cn3.type, setCn3)
    cn4.address && checkIsApproved(cn4.address, cn4.type, setCn4)
    cn5.address && checkIsApproved(cn5.address, cn5.type, setCn5)
  }, [checkIsApproved, cn1.address, cn1.type, cn2.address, cn2.type, cn3.address, cn3.type, cn4.address, cn4.type, cn5.address, cn5.type, cn1.isApproved, cn2.isApproved, cn3.isApproved, cn4.isApproved, cn5.isApproved])

  const getItem = ({ type, address, amount, tokenId, recipient }) => {
    if (type === "NATIVE") {
      return getItemETH(amount, amount, recipient)
    } else if (type === "20") {
      return getItem20(address, amount, amount, recipient)
    } else if (type === "721") {
      return getItem721(address, tokenId, 1, 1, recipient)
    } else {
      return getItem1155(address, tokenId, amount, amount, recipient)
    }
  }

  const create = async () => {
    const offer = []
    const consideration = []
    offer1.address && offer.push(getItem(offer1))
    offer2.address && offer.push(getItem(offer2))
    offer3.address && offer.push(getItem(offer3))
    offer4.address && offer.push(getItem(offer4))
    offer5.address && offer.push(getItem(offer5))
    cn1.amount && consideration.push(getItem(cn1))
    cn2.amount && consideration.push(getItem(cn2))
    cn3.amount && consideration.push(getItem(cn3))
    cn4.amount && consideration.push(getItem(cn4))
    cn5.amount && consideration.push(getItem(cn5))
    const { order, value } = await createOrder(
      marketplaceContract,
      chainId,
      signer,
      zone,
      offer,
      consideration,
      1, // PARTIAL_OPEN
      // [],
      // null,
    )
    setOrder(order)
    setValue(value)
  }

  const fullfill = async () => {
    order.numerator = numerator; // fill two tenths or one fifth
    order.denominator = denominator; // fill two tenths or one fifth
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
      {console.log(typeof numerator)}
      <main className={styles.main}>
        <W3WalletDriver />
        <div className="mb-5">
          <p className="text-xl font-bold mb-2">
            部分填單
          </p> 
          <p>
            部分填單是照比例去算，一定要除的盡，比如掛單10個，那比例就只能為 1/10 2/10 3/10 ... 1/5 2/5 ... 1/2 1/1
          </p>
          <p className="my-1">呈上，假如有人買走了1/2，再有人買走了1/5，那就剩下3/10，這時候假如有人再買1/2，那剩下的就會被全買走。</p>
          <p>offers跟consideration基本上都可以亂塞，只要除的盡</p>
        </div>
        <div className="text-left">
          <div>
            <div className="text-lg font-bold">offers</div>
            <OfferItem offer={offer1} setOffer={setOffer1} approve={approve} />
            <OfferItem offer={offer2} setOffer={setOffer2} approve={approve} />
            <OfferItem offer={offer3} setOffer={setOffer3} approve={approve} />
            <OfferItem offer={offer4} setOffer={setOffer4} approve={approve} />
            <OfferItem offer={offer5} setOffer={setOffer5} approve={approve} />
          </div>
          <div>
            <div className="text-lg font-bold mt-2">considerations (這裡的approve要換完帳號 (換成fullfiller) 再按）</div>
            <OfferItem offer={cn1} setOffer={setCn1} approve={approve} cn={true} />
            <OfferItem offer={cn2} setOffer={setCn2} approve={approve} cn={true} />
            <OfferItem offer={cn3} setOffer={setCn3} approve={approve} cn={true} />
            <OfferItem offer={cn4} setOffer={setCn4} approve={approve} cn={true} />
            <OfferItem offer={cn5} setOffer={setCn5} approve={approve} cn={true} />
          </div>
        </div>
        <button onClick={create} className="border-2 py-2 mt-2 px-5">create order</button>
        <div className="my-2">
          填單比例：
          <input
            type="number"
            onChange={e => setNumerator(Number(e.target.value))}
            value={numerator || ""}
            className="text-center w-10 border-2"
          />
          {" "}/{" "}
          <input
            type="number"
            onChange={e => setDenominator(Number(e.target.value))}
            value={denominator || ""}
            className="text-center w-10 border-2"
          />
        </div>
        <button onClick={fullfill} className="border-2 py-2 mt-2 px-5">fullfill order</button>
      </main>
    </div>
  );
}
