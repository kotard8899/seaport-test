import { randomBytes as nodeRandomBytes } from "crypto";
import { BigNumber, constants, utils } from "ethers";

import type {
  BasicOrderParameters,
  ConsiderationItem,
  CriteriaResolver,
  Fulfillment,
  FulfillmentComponent,
  OfferItem,
  Order,
  OrderComponents,
} from "./types";
import type { BigNumberish } from "ethers";


export const { parseEther } = utils;

const randomBytes = (n: number) => nodeRandomBytes(n).toString("hex");

export const randomHex = (bytes = 32) => `0x${randomBytes(bytes)}`;

const hexRegex = /[A-Fa-fx]/g;

const toHex = (n: BigNumberish, numBytes: number = 0) => {
  const asHexString = BigNumber.isBigNumber(n)
    ? n.toHexString().slice(2)
    : typeof n === "string"
    ? hexRegex.test(n)
      ? n.replace(/0x/, "")
      : Number(n).toString(16)
    : Number(n).toString(16);
  return `0x${asHexString.padStart(numBytes * 2, "0")}`;
};


export const toBN = (n: BigNumberish) => BigNumber.from(toHex(n));

export const toKey = (n: BigNumberish) => toHex(n, 32);

export const convertSignatureToEIP2098 = (signature: string) => {
  if (signature.length === 130) {
    return signature;
  }

  if (signature.length !== 132) {
    throw Error("invalid signature length (must be 64 or 65 bytes)");
  }

  return utils.splitSignature(signature).compact;
};

export const getBasicOrderParameters = (
  basicOrderRouteType: number,
  order: Order,
  fulfillerConduitKey: string | boolean = false,
  tips: { amount: BigNumber; recipient: string }[] = []
): BasicOrderParameters => ({
  offerer: order.parameters.offerer,
  zone: order.parameters.zone,
  basicOrderType: order.parameters.orderType + 4 * basicOrderRouteType,
  offerToken: order.parameters.offer[0].token,
  offerIdentifier: order.parameters.offer[0].identifierOrCriteria,
  offerAmount: order.parameters.offer[0].endAmount,
  considerationToken: order.parameters.consideration[0].token,
  considerationIdentifier:
    order.parameters.consideration[0].identifierOrCriteria,
  considerationAmount: order.parameters.consideration[0].endAmount,
  startTime: order.parameters.startTime,
  endTime: order.parameters.endTime,
  zoneHash: order.parameters.zoneHash,
  salt: order.parameters.salt,
  totalOriginalAdditionalRecipients: BigNumber.from(
    order.parameters.consideration.length - 1
  ),
  signature: order.signature,
  offererConduitKey: order.parameters.conduitKey,
  fulfillerConduitKey: toKey(
    typeof fulfillerConduitKey === "string" ? fulfillerConduitKey : 0
  ),
  additionalRecipients: [
    ...order.parameters.consideration
      .slice(1)
      .map(({ endAmount, recipient }) => ({ amount: endAmount, recipient })),
    ...tips,
  ],
});

export const getOfferOrConsiderationItem = <
  RecipientType extends string | undefined = undefined
>(
  itemType: number = 0,
  token: string = constants.AddressZero,
  identifierOrCriteria: BigNumberish = 0,
  startAmount: BigNumberish = 1,
  endAmount: BigNumberish = 1,
  recipient?: RecipientType
): RecipientType extends string ? ConsiderationItem : OfferItem => {
  const offerItem: OfferItem = {
    itemType,
    token,
    identifierOrCriteria: toBN(identifierOrCriteria),
    startAmount: toBN(startAmount),
    endAmount: toBN(endAmount),
  };
  if (typeof recipient === "string") {
    return {
      ...offerItem,
      recipient: recipient as string,
    } as ConsiderationItem;
  }
  return offerItem as any;
};

export const getItemETH = (
  startAmount: BigNumberish = 1,
  endAmount: BigNumberish = 1,
  recipient?: string
) =>
  getOfferOrConsiderationItem(
    0,
    constants.AddressZero,
    0,
    toBN(startAmount),
    toBN(endAmount),
    recipient
  );

export const getItem20 = (
  token: string,
  startAmount: BigNumberish,
  endAmount: BigNumberish,
  recipient?: string,
) =>
  getOfferOrConsiderationItem(
    1,
    token,
    0,
    startAmount,
    endAmount,
    recipient
  );

export const getItem721 = (
  token: string,
  identifierOrCriteria: BigNumberish,
  startAmount: number = 1,
  endAmount: number = 1,
  recipient?: string
) =>
  getOfferOrConsiderationItem(
    2,
    token,
    identifierOrCriteria,
    startAmount,
    endAmount,
    recipient
  );

export const getItem1155 = (
  token: string,
  identifierOrCriteria: BigNumberish,
  startAmount: number = 1,
  endAmount: number = 1,
  recipient?: string
) =>
  getOfferOrConsiderationItem(
    3,
    token,
    identifierOrCriteria,
    startAmount,
    endAmount,
    recipient
  );

export const toFulfillmentComponents = (
  arr: number[][]
): FulfillmentComponent[] =>
  arr.map(([orderIndex, itemIndex]) => ({ orderIndex, itemIndex }));

export const toFulfillment = (
  offerArr: number[][],
  considerationsArr: number[][]
): Fulfillment => ({
  offerComponents: toFulfillmentComponents(offerArr),
  considerationComponents: toFulfillmentComponents(considerationsArr),
});

export const buildResolver = (
  orderIndex: number,
  side: 0 | 1,
  index: number,
  identifier: BigNumber,
  criteriaProof: string[]
): CriteriaResolver => ({
  orderIndex,
  side,
  index,
  identifier,
  criteriaProof,
});

// export const defaultBuyNowMirrorFulfillment = [
//   [[[0, 0]], [[1, 0]]],
//   [[[1, 0]], [[0, 0]]],
//   [[[1, 0]], [[0, 1]]],
//   [[[1, 0]], [[0, 2]]],
// ].map(([offerArr, considerationArr]) =>
//   toFulfillment(offerArr, considerationArr)
// );

// export const defaultAcceptOfferMirrorFulfillment = [
//   [[[1, 0]], [[0, 0]]],
//   [[[0, 0]], [[1, 0]]],
//   [[[0, 0]], [[0, 1]]],
//   [[[0, 0]], [[0, 2]]],
// ].map(([offerArr, considerationArr]) =>
//   toFulfillment(offerArr, considerationArr)
// );
