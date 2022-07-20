import { BigNumber, constants, utils } from "ethers";
import { randomBytes as nodeRandomBytes } from "crypto";
import { orderType } from "../constants"

export const { parseEther, keccak256 } = utils;

const randomBytes = (n) => nodeRandomBytes(n).toString("hex")

const randomHex = (bytes = 32) => `0x${randomBytes(bytes)}`;

const hexRegex = /[A-Fa-fx]/g;

const convertSignatureToEIP2098 = (signature) => {
  if (signature.length === 130) {
    return signature;
  }

  if (signature.length !== 132) {
    throw Error("invalid signature length (must be 64 or 65 bytes)");
  }

  return utils.splitSignature(signature).compact;
};

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

export const toBN = (n) => BigNumber.from(toHex(n));

const getAndVerifyOrderHash = async (orderComponents, marketplaceContract) => {
  const orderHash = await marketplaceContract.getOrderHash(orderComponents);
  return orderHash;
};

const signOrder = async (
  orderComponents,
  signer,
  marketplaceContract
) => {
  const domainData = {
    name: "Seaport",
    version: "1.1",
    chainId: 4,
    verifyingContract: marketplaceContract.address,
  };
  const signature = await signer._signTypedData(
    domainData,
    orderType,
    orderComponents
  );

  return signature;
}

export const toKey = (n) => toHex(n, 32);

export const getBasicOrderParameters = (
  basicOrderRouteType,
  order,
  fulfillerConduitKey= false,
  tips = [],
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

export const getItemETH = (startAmount = 1, endAmount = 1, recipient) =>
  getOfferOrConsiderationItem(
    0,
    constants.AddressZero,
    0,
    toBN(startAmount),
    toBN(endAmount),
    recipient
  );

export const createOrder = async (
  marketplaceContract,
  offerer,
  zone = undefined,
  offer,
  consideration,
  orderType,
  criteriaResolvers,
  timeFlag,
  signer,
  zoneHash = constants.HashZero,
  conduitKey = constants.HashZero,
  extraCheap = false
) => {
  const counter = await marketplaceContract.getCounter(offerer);

  const salt = !extraCheap ? randomHex() : constants.HashZero;
  const startTime =
    timeFlag !== "NOT_STARTED" ? 0 : toBN("0xee00000000000000000000000000");
  const endTime =
    timeFlag !== "EXPIRED" ? toBN("0xff00000000000000000000000000") : 1;

  const orderParameters = {
    offerer,
    zone: !extraCheap
      ? zone ?? zone
      : constants.AddressZero,
    offer,
    consideration,
    totalOriginalConsiderationItems: consideration.length,
    orderType,
    zoneHash,
    salt,
    conduitKey,
    startTime,
    endTime,
  };

  const orderComponents = {
    ...orderParameters,
    counter,
  };
  const orderHash = await getAndVerifyOrderHash(orderComponents, marketplaceContract);

  const { isValidated, isCancelled, totalFilled, totalSize } =
    await marketplaceContract.getOrderStatus(orderHash);

  const orderStatus = {
    isValidated,
    isCancelled,
    totalFilled,
    totalSize,
  };

  const flatSig = await signOrder(orderComponents, signer ?? offerer, marketplaceContract);

  const order = {
    parameters: orderParameters,
    signature: !extraCheap ? flatSig : convertSignatureToEIP2098(flatSig),
    numerator: 1, // only used for advanced orders
    denominator: 1, // only used for advanced orders
    extraData: "0x", // only used for advanced orders
  };

  // How much ether (at most) needs to be supplied when fulfilling the order
  const value = offer
    .map((x) =>
      x.itemType === 0
        ? x.endAmount.gt(x.startAmount)
          ? x.endAmount
          : x.startAmount
        : toBN(0)
    )
    .reduce((a, b) => a.add(b), toBN(0))
    .add(
      consideration
        .map((x) =>
          x.itemType === 0
            ? x.endAmount.gt(x.startAmount)
              ? x.endAmount
              : x.startAmount
            : toBN(0)
        )
        .reduce((a, b) => a.add(b), toBN(0))
    );

  return {
    order,
    orderHash,
    value,
    orderStatus,
    orderComponents,
  };
};
