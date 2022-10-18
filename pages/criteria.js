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
          value={offer.itemType}
          onChange={(e) => setOffer({ ...offer, itemType: Number(e.target.value)})}
          className="border-2 p-1 w-24"
        >
          <option value="4">721</option>
          <option value="5">1155</option>
        </select>
      ) : (
        <select
          id="offertype"
          value={itemType}
          onChange={(e) => setOffer({ ...offer, itemType: Number(e.target.value)})}
          className="border-2 p-1 w-24"
        >
          <option value="1">20</option>
        </select>
      )}
      {itemType !== 0 && <input
        type="text"
        placeholder="address"
        value={offer.token}
        onChange={(e) => setOffer({ ...offer, token: e.target.value})}
        className="border-2 p-1"
      />}
      {itemType !== 4 && <input
        type="text"
        placeholder="amount"
        value={offer.startAmount || ""}
        onChange={(e) => setOffer({ ...offer, startAmount: e.target.value})}
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
  const account = accounts[0];

  const [order, setOrder] = useState(null)
  const [criteriaResolvers, setCriteriaResolvers] = useState(null)
  const [tokenId, setTokenId] = useState(null)
  const [value, setValue] = useState(null)
  const [offer1, setOffer1] = useState({
    isApproved: false,
    itemType: 1,
    token: "",
    startAmount: undefined,
    tokenId: undefined
  })
  const [cn1, setCn1] = useState({
    isApproved: false,
    itemType: 4,
    token: "",
    startAmount: 1,
    tokenId: undefined,
    recipient: undefined
  })

  const checkIsApproved = useCallback(async (offer, setState) => {
    if ((offer.itemType === 2 || offer.itemType === 4) && !offer.tokenId) return
    const isApproved = await sdk.loadApprovalStatus(offer, account)
    isApproved && setState(prev => ({ ...prev, isApproved }))
  }, [account, sdk])

  useEffect(() => {
    offer1.token && checkIsApproved(offer1, setOffer1)
  }, [checkIsApproved, offer1.token, offer1.tokenId, offer1.isApproved])

  useEffect(() => {
    cn1.token && checkIsApproved(cn1, setCn1)
  }, [checkIsApproved, cn1.token, cn1.tokenId, cn1.isApproved])

  const create = async () => {
    const offer = []
    const consideration = []
    offer.push(sdk.getItem(offer1))
    cn1.recipient = account
    consideration.push(sdk.getItem(cn1))

    const criteriaResolvers = [
      // buildResolver(0, 0, 0, tokenId, proofs[tokenId.toString()]),
      // buildResolver(0, 0, 0, ERC1155TokenId, proofs[ERC1155TokenId.toString()]),
  
      // collection-level
      sdk.buildResolver(0, 1, 0, tokenId, []),
    ];
    const { order, value } = await sdk.createOrder(
      offer,
      consideration,
      0, // FULL_OPEN
    )
    setOrder(order)
    setValue(value)
    setCriteriaResolvers(criteriaResolvers)
  }

  const handleFullfill = async () => {
    criteriaResolvers[0].identifier = tokenId

    const tx = await sdk.fulfillOrder(order, value, criteriaResolvers)
    await tx.wait();
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
