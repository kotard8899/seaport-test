import styles from "../styles/Home.module.css";
import { useState, useEffect, useCallback } from "react";
import { W3WalletDriver, useW3Wallet } from "../components/w3wallet";
import SDK from "../sdk"

const OfferItem = ({ offer, setOffer, approve, cn }) => {
  const { itemType } = offer
  return (
    <div className="space-x-2">
      {cn ? (
        <select
          id="offertype"
          value={offer.type}
          onChange={(e) => setOffer({ ...offer, itemType: e.target.value})}
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
          value={itemType}
          onChange={(e) => setOffer({ ...offer, itemType: e.target.value})}
          className="border-2 p-1 w-24"
        >
          <option value="721">721</option>
          <option value="NATIVE">NATIVE</option>
          <option value="20">20</option>
          <option value="1155">1155</option>
        </select>
      )}
      {itemType !== 0 && <input
        type="text"
        placeholder="address"
        value={offer.token}
        onChange={(e) => setOffer({ ...offer, token: e.target.value})}
        className="border-2 p-1"
      />}
      {(itemType !== 2 && itemType !== 4) && <input
        type="number"
        placeholder="amount"
        value={offer.amount || ""}
        onChange={(e) => setOffer({ ...offer, amount: e.target.value})}
        className="border-2 p-1"
      />}
      {itemType !== 0 && <input
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
      {!offer.isApproved && itemType!== 0 && <button
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
  const sdk = eProvider && chainId && new SDK(eProvider, signer)

  const [order, setOrder] = useState(null)
  const [offer, setOffer] = useState(null)
  const [consideration, setConsideration] = useState(null)
  const [orderComponents, setOrderComponents] = useState(null)
  const [value, setValue] = useState(null)
  const [offer1, setOffer1] = useState({
    isApproved: false,
    token: "",
    amount: null,
    tokenId: null,
    itemType: 2
  })
  const [offer2, setOffer2] = useState({
    isApproved: false,
    token: "",
    amount: null,
    tokenId: null,
    itemType: 2
  })
  const [offer3, setOffer3] = useState({
    isApproved: false,
    token: "",
    amount: null,
    tokenId: null,
    itemType: 2
  })
  const [offer4, setOffer4] = useState({
    isApproved: false,
    token: "",
    amount: null,
    tokenId: null,
    itemType: 2
  })
  const [offer5, setOffer5] = useState({
    isApproved: false,
    token: "",
    amount: null,
    tokenId: null,
    itemType: 2
  })
  const [cn1, setCn1] = useState({
    isApproved: false,
    itemType: 0,
    token: "",
    amount: null,
    tokenId: null,
    receipt: null,

  })
  const [cn2, setCn2] = useState({
    isApproved: false,
    itemType: 0,
    token: "",
    amount: null,
    tokenId: null,
    receipt: null
  })
  const [cn3, setCn3] = useState({
    isApproved: false,
    itemType: 0,
    token: "",
    amount: null,
    tokenId: null,
    receipt: null
  })
  const [cn4, setCn4] = useState({
    isApproved: false,
    itemType: 0,
    token: "",
    amount: null,
    tokenId: null,
    receipt: null
  })
  const [cn5, setCn5] = useState({
    isApproved: false,
    itemType: 0,
    token: "",
    amount: null,
    tokenId: null,
    receipt: null
  })

  const account = accounts[0];

  const checkIsApproved = useCallback(async (offer, setState) => {
    if ((offer.itemType === 2 || offer.itemType === 4) && !offer.tokenId) return
    const isApproved = await sdk.loadApprovalStatus(offer, account)
    isApproved && setState(prev => ({ ...prev, isApproved }))
  }, [account, sdk])

  useEffect(() => {
    offer1.token && checkIsApproved(offer1, setOffer1)
    offer2.token && checkIsApproved(offer2, setOffer2)
    offer3.token && checkIsApproved(offer3, setOffer3)
    offer4.token && checkIsApproved(offer4, setOffer4)
    offer5.token && checkIsApproved(offer5, setOffer5)
  }, [checkIsApproved, offer1.token, offer1.tokenId, offer2.token, offer2.tokenId, offer3.token, offer3.tokenId, offer4.token, offer4.tokenId, offer5.token, offer5.tokenId])

  useEffect(() => {
    cn1.token && checkIsApproved(cn1, setCn1)
    cn2.token && checkIsApproved(cn2, setCn2)
    cn3.token && checkIsApproved(cn3, setCn3)
    cn4.token && checkIsApproved(cn4, setCn4)
    cn5.token && checkIsApproved(cn5, setCn5)
  }, [checkIsApproved, cn1.token, cn1.type, cn2.token, cn2.type, cn3.token, cn3.type, cn4.token, cn4.type, cn5.token, cn5.type, cn1.isApproved, cn2.isApproved, cn3.isApproved, cn4.isApproved, cn5.isApproved])

  const create = async () => {
    const offer = []
    const consideration = []
    offer1.token && offer.push(sdk.getItem(offer1))
    offer2.token && offer.push(sdk.getItem(offer2))
    offer3.token && offer.push(sdk.getItem(offer3))
    offer4.token && offer.push(sdk.getItem(offer4))
    offer5.token && offer.push(sdk.getItem(offer5))
    cn1.amount && consideration.push(sdk.getItem(cn1))
    cn2.amount && consideration.push(sdk.getItem(cn2))
    cn3.amount && consideration.push(sdk.getItem(cn3))
    cn4.amount && consideration.push(sdk.getItem(cn4))
    cn5.amount && consideration.push(sdk.getItem(cn5))
    const { order, value, orderComponents, orderHash } = await sdk.createOrder(
      offer,
      consideration,
      0, // FULL_OPEN
      // zone,
      // [],
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
    const tx = await sdk.fulfillOrder(order, value)
    await tx.wait();
  }

  const validate = async () => {
    const tx = sdk.validate(orderComponents)
    const receipt = await (await tx).wait();
    console.log(receipt)
  }

  const cancel = async () => {
    const tx = sdk.cancelOrder([orderComponents])
    const receipt = await (await tx).wait();
    console.log(receipt)

  }
  
  const approve = async (offer, setOffer) => {
    const tx = await sdk.approveAsset(offer)
    await tx.wait();
    setOffer({ ...offer, isApproved: true })
  }

  return (
    <div className={styles.container}>
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
        <button onClick={create} className="border-2 py-2 mt-2 px-5">create order</button>
        <button onClick={handleFullfill} className="border-2 py-2 mt-2 px-5">fullfill order</button>
        <button onClick={validate} className="border-2 py-2 mt-2 px-5">validate order</button>
        <button onClick={cancel} className="border-2 py-2 mt-2 px-5">cancel order</button>
      </main>
    </div>
  );
}
