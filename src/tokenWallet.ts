import { Address, Contract, ProviderRpcClient } from "everscale-inpage-provider";
import { contracts } from "./constance/contracts";

export class TokenWallet {
  constructor(public readonly walletContract: Contract<typeof contracts.tokenWallet.abi>) {}
  static getWallet = async (
    ever: ProviderRpcClient,
    accountAddress: Address,
    tokenRootContract: Contract<typeof contracts.tokenRoot.abi>,
  ): Promise<TokenWallet> => {
    const userTokenWallet = await tokenRootContract.methods
      .walletOf({ answerId: 1, walletOwner: accountAddress })
      .call()
      .then((res) => res.value0 as Address);

    return new TokenWallet(new ever.Contract(contracts.tokenWallet.abi, userTokenWallet));
  };

  getBalance = async (): Promise<string> => {
    return this.walletContract.methods
      .balance({
        answerId: 3,
      })
      .call()
      .then((res) => res.value0);
  };
}
