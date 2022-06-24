import { Contract, GetExpectedAddressParams, ProviderRpcClient } from "everscale-inpage-provider";
import { Giver } from "./giver";
import { ConstructorParams } from "../types";
import { DEPLOY_VALUE, errorExtractor } from "../utils";

export class Deployer {
  constructor(private readonly ever: ProviderRpcClient, private readonly giver: Giver) {}
  deployContract = async <Abi extends any, T extends [keyof Contract<Abi>]>(
    abi: Abi,
    deployParams: GetExpectedAddressParams<Abi>,
    contractParams: ConstructorParams<Abi>,
  ): Promise<Contract<Abi>> => {
    const expectedAddress = await this.ever.getExpectedAddress(abi, deployParams);
    await errorExtractor(this.giver.sendTo(expectedAddress, DEPLOY_VALUE));
    const contract = new this.ever.Contract(abi, expectedAddress);
    const stateInit = await this.ever.getStateInit(abi, deployParams);
    await errorExtractor(
      contract.methods.constructor(contractParams).sendExternal({
        stateInit: stateInit.stateInit,
        publicKey: deployParams.publicKey,
      }),
    );

    return contract;
  };
}
