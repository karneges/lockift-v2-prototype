import { Address, Contract, ProviderRpcClient } from "everscale-inpage-provider";
import { AbiFunctionInputs, AbiFunctionName, DecodedAbiFunctionOutputs } from "everscale-inpage-provider/dist/models";
import { ContractMethod } from "everscale-inpage-provider/dist/contract";
import { contracts } from "../constance/contracts";
import { convertCrystal, errorExtractor, getRandomNonce } from "../utils";
import { Deployer } from "./deployer";

export class Account {
  constructor(
    private readonly accountContract: Contract<typeof contracts.wallet.abi>,
    private readonly publicKey: string,
  ) {}

  static getAccount(accountAddress: Address, ever: ProviderRpcClient, publicKey: string): Account {
    return new Account(new ever.Contract(contracts.wallet.abi, accountAddress), publicKey);
  }

  static deployNewAccount = async (deployer: Deployer, publicKey: string): Promise<Account> => {
    const deployedAccount = await deployer.deployContract(
      contracts.wallet.abi,
      {
        tvc: contracts.wallet.base64,
        initParams: {
          _randomNonce: getRandomNonce(),
        },
        publicKey,
      },
      {},
    );
    return new Account(deployedAccount, publicKey);
  };

  get address(): Address {
    return this.accountContract.address;
  }

  sendTo = async <Abi>(
    config: {
      contract: Contract<Abi>;
      value?: string;
      bounce?: boolean;
      flags?: number;
    },
    producer: (
      targetContract: Contract<Abi>,
    ) => ContractMethod<
      AbiFunctionInputs<Abi, AbiFunctionName<Abi>>,
      DecodedAbiFunctionOutputs<Abi, AbiFunctionName<Abi>>
    >,
  ) => {
    return errorExtractor(
      this.accountContract.methods
        .sendTransaction({
          value: config.value || convertCrystal(2, "nano"),
          bounce: !!config.bounce,
          dest: config.contract.address,
          payload: await producer(config.contract).encodeInternal(),
          flags: config.flags || 0,
        })
        .sendExternal({ publicKey: this.publicKey }),
    );
  };
}

export class AccountFactory {
  constructor(private readonly deployer: Deployer, private readonly ever: ProviderRpcClient) {}
  getAccount = (accountAddress: Address, publicKey: string): Account =>
    Account.getAccount(accountAddress, this.ever, publicKey);
  deployNewAccount = async (publicKey: string): Promise<Account> => Account.deployNewAccount(this.deployer, publicKey);
}
