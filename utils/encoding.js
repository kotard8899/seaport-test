import { randomBytes as nodeRandomBytes } from "crypto";
import { BigNumber, constants, utils } from "ethers";
import { signOrder } from "./marketplace";

const randomBytes = (n) => nodeRandomBytes(n).toString("hex");

const hexRegex = /[A-Fa-fx]/g;

const toHex = (n, numBytes = 0) => {
  const asHexString = BigNumber.isBigNumber(n)
    ? n.toHexString().slice(2)
    : typeof n === "string"
    ? hexRegex.test(n)
      ? n.replace(/0x/, "")
      : Number(n).toString(16)
    : Number(n).toString(16);
  return `0x${asHexString.padStart(numBytes * 2, "0")}`;
};

export const { parseEther } = utils;

export const randomHex = (bytes = 32) => `0x${randomBytes(bytes)}`;

export const toBN = (n) => BigNumber.from(toHex(n));

export const toKey = (n) => toHex(n, 32);

export const convertSignatureToEIP2098 = (signature) => {
  if (signature.length === 130) {
    return signature;
  }

  if (signature.length !== 132) {
    throw Error("invalid signature length (must be 64 or 65 bytes)");
  }

  return utils.splitSignature(signature).compact;
};

export const getBasicOrderParameters = (
  basicOrderRouteType,
  order,
  fulfillerConduitKey = false,
  tips = []
) => ({
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

export const getOfferOrConsiderationItem = (
  itemType = 0,
  token = constants.AddressZero,
  identifierOrCriteria = 0,
  startAmount = 1,
  endAmount = 1,
  recipient
) => {
  const offerItem = {
    itemType,
    token,
    identifierOrCriteria: toBN(identifierOrCriteria),
    startAmount: toBN(startAmount),
    endAmount: toBN(endAmount),
  };
  if (typeof recipient === "string") {
    return {
      ...offerItem,
      recipient,
    };
  }
  return offerItem;
};

export const getItemETH = (
  startAmount,
  endAmount,
  recipient
) =>
  getOfferOrConsiderationItem(
    0,
    constants.AddressZero,
    0,
    parseEther(String(startAmount)),
    parseEther(String(endAmount)),
    recipient
  );

export const getItem20 = (
  token,
  startAmount,
  endAmount,
  recipient,
) =>
  getOfferOrConsiderationItem(
    1,
    token,
    0,
    parseEther(String(startAmount)),
    parseEther(String(endAmount)),
    recipient
  );

export const getItem721 = (
  token,
  identifierOrCriteria,
  startAmount = 1,
  endAmount = 1,
  recipient
) =>
  getOfferOrConsiderationItem(
    2,
    token,
    identifierOrCriteria,
    startAmount,
    endAmount,
    recipient
  );

export const getItem721WithCriteria = (
  token,
  identifierOrCriteria,
  startAmount = 1,
  endAmount = 1,
  recipient
) =>
  getOfferOrConsiderationItem(
    4,
    token,
    identifierOrCriteria,
    startAmount,
    endAmount,
    recipient
  );

export const getItem1155 = (
  token,
  identifierOrCriteria,
  startAmount = 1,
  endAmount = 1,
  recipient
) =>
  getOfferOrConsiderationItem(
    3,
    token,
    identifierOrCriteria,
    startAmount,
    endAmount,
    recipient
  );

export const getItem1155WithCriteria = (
  token,
  identifierOrCriteria,
  startAmount = 1,
  endAmount = 1,
  recipient
) =>
  getOfferOrConsiderationItem(
    5,
    token,
    identifierOrCriteria,
    startAmount,
    endAmount,
    recipient
  );

const toFulfillmentComponents = (
  arr
) =>
  arr.map(([orderIndex, itemIndex]) => ({ orderIndex, itemIndex }));

const toFulfillment = (
  offerArr,
  considerationsArr
) => ({
  offerComponents: toFulfillmentComponents(offerArr),
  considerationComponents: toFulfillmentComponents(considerationsArr),
});

export const buildResolver = (
  orderIndex,
  side, // 0 | 1
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

export const defaultBuyNowMirrorFulfillment = [
  [[[0, 0]], [[1, 0]]],
  [[[1, 0]], [[0, 0]]],
  [[[1, 0]], [[0, 1]]],
  [[[1, 0]], [[0, 2]]],
].map(([offerArr, considerationArr]) =>
  toFulfillment(offerArr, considerationArr)
);

// export const defaultAcceptOfferMirrorFulfillment = [
//   [[[1, 0]], [[0, 0]]],
//   [[[0, 0]], [[1, 0]]],
//   [[[0, 0]], [[0, 1]]],
//   [[[0, 0]], [[0, 2]]],
// ].map(([offerArr, considerationArr]) =>
//   toFulfillment(offerArr, considerationArr)
// );

export const createMirrorBuyNowOrder = async (
  marketplaceContract,
  offerer,
  zone,
  order,
  chainId,
  conduitKey = constants.HashZero
) => {
  const counter = await marketplaceContract.getCounter(offerer.address);
  const salt = randomHex();
  const startTime = order.parameters.startTime;
  const endTime = order.parameters.endTime;

  const compressedOfferItems = [];
  for (const {
    itemType,
    token,
    identifierOrCriteria,
    startAmount,
    endAmount,
  } of order.parameters.offer) {
    if (
      !compressedOfferItems
        .map((x) => `${x.itemType}+${x.token}+${x.identifierOrCriteria}`)
        .includes(`${itemType}+${token}+${identifierOrCriteria}`)
    ) {
      compressedOfferItems.push({
        itemType,
        token,
        identifierOrCriteria,
        startAmount: startAmount.eq(endAmount)
          ? startAmount
          : startAmount.sub(1),
        endAmount: startAmount.eq(endAmount) ? endAmount : endAmount.sub(1),
      });
    } else {
      const index = compressedOfferItems
        .map((x) => `${x.itemType}+${x.token}+${x.identifierOrCriteria}`)
        .indexOf(`${itemType}+${token}+${identifierOrCriteria}`);

      compressedOfferItems[index].startAmount = compressedOfferItems[
        index
      ].startAmount.add(
        startAmount.eq(endAmount) ? startAmount : startAmount.sub(1)
      );
      compressedOfferItems[index].endAmount = compressedOfferItems[
        index
      ].endAmount.add(
        startAmount.eq(endAmount) ? endAmount : endAmount.sub(1)
      );
    }
  }

  const compressedConsiderationItems = [];
  for (const {
    itemType,
    token,
    identifierOrCriteria,
    startAmount,
    endAmount,
    recipient,
  } of order.parameters.consideration) {
    if (
      !compressedConsiderationItems
        .map((x) => `${x.itemType}+${x.token}+${x.identifierOrCriteria}`)
        .includes(`${itemType}+${token}+${identifierOrCriteria}`)
    ) {
      compressedConsiderationItems.push({
        itemType,
        token,
        identifierOrCriteria,
        startAmount: startAmount.eq(endAmount)
          ? startAmount
          : startAmount.add(1),
        endAmount: startAmount.eq(endAmount) ? endAmount : endAmount.add(1),
        recipient,
      });
    } else {
      const index = compressedConsiderationItems
        .map((x) => `${x.itemType}+${x.token}+${x.identifierOrCriteria}`)
        .indexOf(`${itemType}+${token}+${identifierOrCriteria}`);

      compressedConsiderationItems[index].startAmount =
        compressedConsiderationItems[index].startAmount.add(
          startAmount.eq(endAmount) ? startAmount : startAmount.add(1)
        );
      compressedConsiderationItems[index].endAmount =
        compressedConsiderationItems[index].endAmount.add(
          startAmount.eq(endAmount) ? endAmount : endAmount.add(1)
        );
    }
  }

  const orderParameters = {
    offerer: offerer.address,
    zone,
    offer: compressedConsiderationItems.map((x) => ({ ...x })),
    consideration: compressedOfferItems.map((x) => ({
      ...x,
      recipient: offerer.address,
    })),
    totalOriginalConsiderationItems: compressedOfferItems.length,
    orderType: order.parameters.orderType, // FULL_OPEN
    zoneHash: "0x".padEnd(66, "0"),
    salt,
    conduitKey,
    startTime,
    endTime,
  };

  const orderComponents = {
    ...orderParameters,
    counter,
  };

  const flatSig = await signOrder(marketplaceContract, chainId, orderComponents, offerer);

  const mirrorOrder = {
    parameters: orderParameters,
    signature: flatSig,
    numerator: order.numerator, // only used for advanced orders
    denominator: order.denominator, // only used for advanced orders
    extraData: "0x", // only used for advanced orders
  };

  // How much ether (at most) needs to be supplied when fulfilling the order
  const mirrorValue = orderParameters.consideration
    .map((x) =>
      x.itemType === 0
        ? x.endAmount.gt(x.startAmount)
          ? x.endAmount
          : x.startAmount
        : toBN(0)
    )
    .reduce((a, b) => a.add(b), toBN(0));

  return {
    mirrorOrder,
  };
};