import { constants } from "ethers";
import {
  convertSignatureToEIP2098,
  randomHex,
  toBN,
} from "./encoding";

const orderType = {
  OrderComponents: [
    { name: "offerer", type: "address" },
    { name: "zone", type: "address" },
    { name: "offer", type: "OfferItem[]" },
    { name: "consideration", type: "ConsiderationItem[]" },
    { name: "orderType", type: "uint8" },
    { name: "startTime", type: "uint256" },
    { name: "endTime", type: "uint256" },
    { name: "zoneHash", type: "bytes32" },
    { name: "salt", type: "uint256" },
    { name: "conduitKey", type: "bytes32" },
    { name: "counter", type: "uint256" },
  ],
  OfferItem: [
    { name: "itemType", type: "uint8" },
    { name: "token", type: "address" },
    { name: "identifierOrCriteria", type: "uint256" },
    { name: "startAmount", type: "uint256" },
    { name: "endAmount", type: "uint256" },
  ],
  ConsiderationItem: [
    { name: "itemType", type: "uint8" },
    { name: "token", type: "address" },
    { name: "identifierOrCriteria", type: "uint256" },
    { name: "startAmount", type: "uint256" },
    { name: "endAmount", type: "uint256" },
    { name: "recipient", type: "address" },
  ],
};

const getOrderHash = async (
  marketplaceContract,
  orderComponents
) => {
  const orderHash = await marketplaceContract.getOrderHash(orderComponents);
  return orderHash;
};

// Returns signature
export const signOrder = async (
  marketplaceContract,
  chainId,
  orderComponents,
  signer,
) => {
  // Required for EIP712 signing
  const domainData = {
    name: "Seaport",
    version: "1.1",
    chainId,
    verifyingContract: marketplaceContract.address,
  };

  const signature = await signer._signTypedData(
    domainData,
    orderType,
    orderComponents
  );

  // const orderHash = await getOrderHash(marketplaceContract, orderComponents);

  // const { domainSeparator } = await marketplaceContract.information();
  // const digest = keccak256(
  //   `0x1901${domainSeparator.slice(2)}${orderHash.slice(2)}`
  // );
  // const recoveredAddress = recoverAddress(digest, signature);

  // expect(recoveredAddress).to.equal(signer.address);

  return signature;
};

export const createOrder = async (
  marketplaceContract,
  chainId,
  offerer,
  zone = undefined,
  offer,
  consideration,
  orderType,
  criteriaResolvers,
  timeFlag,
  zoneHash = constants.HashZero,
  conduitKey = constants.HashZero,
  extraCheap = false
) => {
  const offerAddress = await offerer.getAddress()
  const counter = await marketplaceContract.getCounter(offerAddress);

  const salt = !extraCheap ? randomHex() : constants.HashZero;
  const startTime =
    timeFlag !== "NOT_STARTED" ? 0 : toBN("0xee00000000000000000000000000");
  const endTime =
    timeFlag !== "EXPIRED" ? toBN("0xff00000000000000000000000000") : 1;

  const orderParameters = {
    offerer: offerAddress,
    zone: !extraCheap
      ? zone.address ?? zone
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

  const orderHash = await getOrderHash(marketplaceContract, orderComponents);

  const { isValidated, isCancelled, totalFilled, totalSize } =
    await marketplaceContract.getOrderStatus(orderHash);

  // expect(isCancelled).to.equal(false);

  const orderStatus = {
    isValidated,
    isCancelled,
    totalFilled,
    totalSize,
  };

  const flatSig = await signOrder(marketplaceContract, chainId, orderComponents, offerer);

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
