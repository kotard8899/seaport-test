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
          <option value="721">721</option>
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
          <option value="721">721</option>
          <option value="20">20</option>
          <option value="1155">1155</option>
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
  const tokenId = 50
  const tokenId2 = 59
  const ERC1155TokenId = 1
  const ERC1155TokenId2 = 2
  const ERC1155TokenId3 = 3
  const [order, setOrder] = useState(null)
  const [offer, setOffer] = useState(null)
  const [consideration, setConsideration] = useState(null)
  const [orderComponents, setOrderComponents] = useState(null)
  const [value, setValue] = useState(null)
  const [offer1, setOffer1] = useState({
    isApproved: false,
    type: "721",
    address: "",
    amount: undefined,
    tokenId: undefined
  })
  const [offer2, setOffer2] = useState({
    isApproved: false,
    type: "721",
    address: "",
    amount: undefined,
    tokenId: undefined
  })
  const [offer3, setOffer3] = useState({
    isApproved: false,
    type: "721",
    address: "",
    amount: undefined,
    tokenId: undefined
  })
  const [offer4, setOffer4] = useState({
    isApproved: false,
    type: "721",
    address: "",
    amount: undefined,
    tokenId: undefined
  })
  const [offer5, setOffer5] = useState({
    isApproved: false,
    type: "721",
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
  }, [checkIsApproved, offer1.address, offer1.type, offer2.address, offer2.type, offer3.address, offer3.type, offer4.address, offer4.type, offer5.address, offer5.type])

  useEffect(() => {
    cn1.address && checkIsApproved(cn1.address, cn1.type, setCn1)
    cn2.address && checkIsApproved(cn2.address, cn2.type, setCn2)
    cn3.address && checkIsApproved(cn3.address, cn3.type, setCn3)
    cn4.address && checkIsApproved(cn4.address, cn4.type, setCn4)
    cn5.address && checkIsApproved(cn5.address, cn5.type, setCn5)
  }, [checkIsApproved, cn1.address, cn1.type, cn2.address, cn2.type, cn3.address, cn3.type, cn4.address, cn4.type, cn5.address, cn5.type])

  // const offer = [
  //   // ERC721
  //   // getItem721(ERC721Token, tokenId),
  //   // getItem721(ERC721Token, tokenId2),

  //   // ERC1155
  //   getItem1155(ERC1155Token, ERC1155TokenId),
  //   // getItem1155(ERC1155Token, ERC1155TokenId2),

  //   // getItem20(LOOT, "50", "50"),
  // ]

  // const consideration = [
  //   // * <=> ERC721
  //   // getItem721(ERC721Token, 57, 1, 1, account),
  //   // getItem721(ERC721Token, 58, 1, 1, account),
  //   // getItem1155(ERC1155Token, ERC1155TokenId3, 1, 1, account),

  //   // * <=> NATIVE
  //   // getItemETH("0.1", "0.1", account),
  //   // getItemETH("0.01", "0.01", owner),

  //   // * <=> ERC20
  //   getItem20(LOOT, "5", "5", account),
  //   getItem20(LOOT, "5", "5", owner),

  //   // * <=> ERC1155
  //   // getItem1155(ERC1155Token, ERC1155TokenId3, 1, 1, account),
  //   // getItem1155(ERC1155Token, ERC1155TokenId2, 1, 1, account),
  // ]

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
    setOffer(offer)
    setConsideration(consideration)
    setOrderComponents(orderComponents)
    setValue(value)
  }

  const handleFullfill = async () => {
    let func = fullfill
    const cnItemType = consideration[0].itemType
    let isBasic

    // fulfillBasicOrder條件
    // offer只能有一個 (20 || 721 || 1155)
    // offer為20時，cn的第一項一定要是721 || 1155，且其他項也只能為20
    // offer為721 || 1155時，cn每項的type都要相等，且只能為NATIVE || 20
    // 其餘皆為 fullfillOrder
    if (offer.length === 1) {
      if (offer[0].itemType === 1) {
        if (cnItemType === 2 || cnItemType === 3) {
          for (let { itemType } of consideration.slice(1)) {
            if (itemType === 0 || itemType === 2 || itemType === 3) {
              isBasic = false
              break
            }
            isBasic = true
          }
        }
      } else {
        if (cnItemType === 0 || cnItemType === 1) {
          for (let { itemType } of consideration.slice(1)) {
            if (itemType !== cnItemType) {
              isBasic = false
              break
            }
            isBasic = true
          }
        }
      }
    }

    if (isBasic) func = fullfillBasic
    func()
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
    const offerItemType = offer[0].itemType
    const cnItemType = consideration[0].itemType
    let basicOrderRouteType
    if (offerItemType === 1) {
      cnItemType === 2 ? basicOrderRouteType = 4 : basicOrderRouteType = 5
    } else if (offerItemType === 2) {
      cnItemType === 0 ? basicOrderRouteType = 0 : basicOrderRouteType = 2
    } else {
      cnItemType === 0 ? basicOrderRouteType = 1 : basicOrderRouteType = 3
    }
    const basicOrderParameters = getBasicOrderParameters(
      basicOrderRouteType,
      // 0, // EthForERC721
      // 1, // EthForERC1155
      // 2, // ERC20ForERC721
      // 3, // ERC20ForERC1155
      // 4, // ERC721forERC20
      // 5, // ERC1155forERC20
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
        <div className="mb-5">
          <p>
            offers若是721 or 1155，就等於上架，若為 20 則等於你對別人make offer
          </p> 
          <p>
            consideration若是NATIVE or 20，基本上等於buy nft（這裏的分潤要自己塞）
          </p>
          <p className="my-2">原則上想怎麼塞都可以。下面舉幾種正常情況下會有的case (nft = 721 or 1155, cn = consideration)</p>
          <p>1. nft持有者上架，路人購買 ={">"} offers塞nft，cn塞NATIVE or 20 (通常選擇同一種)</p>
          <p>2. 路人對特定nft出價，nft持有者選擇賣他 ={">"} offers塞20，cn塞一個nft，其他的塞20</p>
        </div>
        <div className="text-left">
          <div>
            <div className="text-lg font-bold">offers (1155 的 amount 可不填，default為 1 )</div>
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
        <button onClick={create}>create order</button>
        <button onClick={handleFullfill}>fullfill order</button>
        {/* <button onClick={validate}>validate order</button>
        <button onClick={cancel}>cancel order</button>
        <button onClick={fullfillBasic}>fullfill basic order</button> */}
      </main>
    </div>
  );
}
