import { useState, useEffect } from "react"
import { Seaport } from "@opensea/seaport-js";
import { ethers } from "ethers";
import { W3WalletDriver, useW3Wallet } from "../components/w3wallet";
import {seaportABI} from "../constants"

const SeaportJs = () => {
  const [W3Wallet] = useW3Wallet()
  const { eProvider, accounts } = W3Wallet
  const account = accounts[0]
  const [seaport, setSeaport] = useState(null)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    eProvider && setSeaport(new Seaport(eProvider, {overrides:{contractAddress:"0x92E394C53c4f3F6eCb910312a31242b71cC4c9B1"}}))
  }, [eProvider])

  const create = async () => {
    const { actions, executeAllActions } = await seaport.createOrder(
      {
        offer: [
          {
            itemType: 2,
            token: "0xa297d6397c3aa061a747282012e76671a599905f",
            identifier: "1",
          },
        ],
        consideration: [
          // {
          //   amount: ethers.utils.parseEther("10").toString(),
          //   recipient: account,
          // },
          {
            // itemType: 1,
            token: "0xBaFdc1e513F79715C36cb57b79b2D4Ae781CA824",
            amount: ethers.utils.parseEther("10").toString(),
            recipient: account,
          },
          {
            // itemType: 1,
            token: "0xBaFdc1e513F79715C36cb57b79b2D4Ae781CA824",
            amount: ethers.utils.parseEther("1").toString(),
            recipient: "0x70E79AE118cabe8992C4069cF706ca79451B51e6",
          },
        ],
      },
      account
    );
    setOrder(await executeAllActions());
  }

  const cancel = async () => {
    const {transact} =
      await seaport.cancelOrders(
        [{...order.parameters, counter:0}],
        account,
      );
    const transaction = transact();
    console.log(transaction)
  }

  const validate = async () => {
    const {transact} =
      await seaport.validate(
        [{...order.parameters}],
        account,
      );
    const transaction = transact();
    console.log(transaction)
  }

  const fulfill = async () => {
    const { executeAllActions: executeAllFulfillActions } =
      await seaport.fulfillOrder({
        order,
        accountAddress: account,
      });

    const transaction = executeAllFulfillActions();
    console.log(transaction)
  }

  return (
    <div>
      <W3WalletDriver />
      <div className="flex flex-col space-y-3">
        <button onClick={create}>create</button>
        <button onClick={cancel}>cancel</button>
        <button onClick={validate}>validate</button>
        <button onClick={fulfill}>fulfill</button>
      </div>
    </div>
  )
}

export default SeaportJs