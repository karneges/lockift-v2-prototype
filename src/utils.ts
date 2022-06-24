import BigNumber from "bignumber.js";
import { Address, Contract, GetExpectedAddressParams, ProviderRpcClient, Transaction } from "everscale-inpage-provider";
import { Giver } from "./factory/giver";
import { ConstructorParams } from "./types";

export const convertCrystal = (amount: number, dimension: "nano" | "ton"): string => {
  const crystalBN = new BigNumber(amount);

  if (dimension === "nano") {
    return crystalBN.times(10 ** 9).toFixed(0);
  } else if (dimension === "ton") {
    return crystalBN.div(new BigNumber(10).pow(9)).toString();
  }
};

export const getRandomNonce = () => (Math.random() * 64000) | 0;
export const zeroAddress = "0:0000000000000000000000000000000000000000000000000000000000000000";
export const DEPLOY_VALUE = "10000000000000";

export const deployContract = async <Abi extends any, T extends [keyof Contract<Abi>]>(
  ever: ProviderRpcClient,
  giver: Giver,
  abi: Abi,
  deployParams: GetExpectedAddressParams<Abi>,
  contractParams: ConstructorParams<Abi>,
): Promise<Contract<Abi>> => {
  const expectedAddress = await ever.getExpectedAddress(abi, deployParams);
  await errorExtractor(giver.sendTo(expectedAddress, DEPLOY_VALUE));
  const contract = new ever.Contract(abi, expectedAddress);
  const stateInit = await ever.getStateInit(abi, deployParams);
  await errorExtractor(
    contract.methods.constructor(contractParams).sendExternal({
      stateInit: stateInit.stateInit,
      publicKey: deployParams.publicKey,
    }),
  );

  return contract;
};

export const errorExtractor = async <T extends { transaction: Transaction<Address>; output?: {} }>(
  transactionResult: Promise<T>,
): Promise<T> => {
  return transactionResult.then((res) => {
    if (res.transaction.aborted) {
      throw new Error(`Transaction aborted with code ${res.transaction.exitCode}`);
    }
    return res;
  });
};
