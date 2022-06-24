import { Contract, GetExpectedAddressParams, ProviderRpcClient } from "everscale-inpage-provider";
import { Giver } from "./giver";
import { ConstructorParams } from "../types";
import { AccountFactory } from "./account";
import { Deployer } from "./deployer";

export class Factory {
  constructor(private readonly ever: ProviderRpcClient, private readonly giver: Giver) {}
  private readonly deployer = new Deployer(this.ever, this.giver);
  public deployContract = async <Abi extends any, T extends [keyof Contract<Abi>]>(
    abi: Abi,
    deployParams: GetExpectedAddressParams<Abi>,
    contractParams: ConstructorParams<Abi>,
  ): Promise<Contract<Abi>> => this.deployer.deployContract(abi, deployParams, contractParams);

  public accounts = new AccountFactory(this.deployer, this.ever);
}
