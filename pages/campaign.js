import { useState, useEffect } from "react";
import { W3WalletDriver, useW3Wallet } from "../components/w3wallet";
import { camABI } from "../constants";
import { Contract, utils, constants, Wallet } from "ethers";
import { randomBytes } from "crypto";

const Campaign = () => {
  const [W3Wallet] = useW3Wallet();
  const { eProvider, accounts, signer } = W3Wallet;
  const account = accounts[0];
  const contract =
    eProvider &&
    new Contract("0x98F30E87eBda3fa6577F52B113DC8aD4E199236c", camABI, signer);

  const signatureSigner = eProvider && new Wallet("dced2ee6587d34b8653a75decb7caa3e5ccd1013fcfae910ba223791d2dfb5df", eProvider)

  const generateNonce = () => randomBytes(24).toString("hex");

  const tokenUri = "ipfs://tokenUri/"
  const tokenUriNew = "ipfs://tokenUri_new/"
  const level = 5
  const [referrer, setReferrer] = useState(constants.AddressZero) 

  const sign = async () => {
    const hash = utils.solidityKeccak256(
      ["address", "string", "address"],
      [account, tokenUri, referrer]
    );
    const hashBytes = utils.arrayify(hash);
    const flatSig = await signatureSigner.signMessage(hashBytes);
    return flatSig
  };

  const mint = async () => {
    const sig = await sign()
    await contract.mint(sig, tokenUri, referrer);
  };

  const signEndGame = async () => {
    const hash = utils.solidityKeccak256(
      ["address", "uint256", "string"],
      [account, level, tokenUriNew]
    );
    const hashBytes = utils.arrayify(hash);
    const flatSig = await signatureSigner.signMessage(hashBytes);
    return flatSig
  };

  const endGame  = async () => {
    const sig = await signEndGame()
    await contract.endGame(level, sig, tokenUriNew);
  };

  return (
    <div>
      <W3WalletDriver />
      <div className="flex flex-col space-y-4 items-center">
        <div className="flex w-[550px] border border-[#E5E5EA] bg-[#f3f2f7] rounded-md px-4 py-2">
          <input
            type="text"
            id="referrer"
            className="bg-transparent w-full"
            placeholder=""
            value={referrer}
            onChange={(e) => setReferrer(e.target.value)}
          />
          <button
            className="text-blue-400 font-bold text-sm hover:text-blue-600 transition-colors"
            onClick={() => setReferrer(constants.AddressZero)}
          >
            No Referrer
          </button>
        </div>
        <button onClick={mint}>mint</button>
        <button onClick={endGame}>endGame</button>
      </div>
    </div>
  );
};

export default Campaign;
