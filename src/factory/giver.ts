import { Address, Contract, ContractMethods, ProviderRpcClient, Transaction } from "everscale-inpage-provider";
import { contracts } from "../constance/contracts";
import { GiverAddress } from "../constance/sources";

export class Giver {
  private giver: Contract<typeof contracts.giver.abi>;
  constructor(ever: ProviderRpcClient, private giverPubKey: string) {
    const giverAddress = new Address(GiverAddress);
    this.giver = new ever.Contract(contracts.giver.abi, giverAddress);
  }

  public async sendTo(sendTo: Address, value: string): Promise<{ transaction: Transaction; output?: {} }> {
    return this.giver.methods
      .sendTransaction({
        value: value,
        dest: sendTo,
        bounce: false,
      })
      .sendExternal({ publicKey: this.giverPubKey });
  }
}
