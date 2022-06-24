import { Giver } from "../src/factory/giver";
import { Factory } from "../src/factory";
import { EverscaleStandaloneClient, SimpleKeystore } from "everscale-standalone-client/nodejs";
import { Address, Contract, ProviderRpcClient } from "everscale-inpage-provider";
import { expect } from "chai";
import { range } from "rxjs";
import { concatMap, toArray } from "rxjs/operators";
import { Account } from "../src/factory/account";
import { contracts } from "../src/constance/contracts";
import { convertCrystal, getRandomNonce, zeroAddress } from "../src/utils";
import { TokenWallet } from "../src/tokenWallet";

const keyPairGiver = {
  publicKey: "2ada2e65ab8eeab09490e3521415f45b6e42df9c760a639bcf53957550b25a16",
  secretKey: "172af540e43a524763dd53b26a066d472a97c4de37d5498170564510608250c3",
};
const keyPair = {
  publicKey: "e85f61aaef0ea43afc14e08e6bd46c3b996974c495a881baccc58760f6349300",
  secretKey: "bb2903d025a330681e78f3bcb248d7d89b861f3e8a480eb74438ec0299319f7a",
};
const keystore = new SimpleKeystore({
  0: keyPairGiver,
  1: keyPair,
});
const ever = new ProviderRpcClient({
  fallback: () =>
    EverscaleStandaloneClient.create({
      connection: {
        group: "localnet",
        // @ts-ignore
        type: "graphql",
        data: {
          // @ts-ignore
          endpoints: ["http://localhost:5000/graphql"],
          latencyDetectionInterval: 1000,
          local: true,
        },
      },
      keystore,
    }),
});
describe("Flow test", function () {
  this.timeout(60 * 1000);
  let factory: Factory;
  let adminAccount: Account;
  let userAccount1: Account;
  let userAccount2: Account;
  let tokenRoot: Contract<typeof contracts.tokenRoot.abi>;
  let bankContract: Contract<typeof contracts.simpleBank.abi>;
  before(async () => {
    await ever.ensureInitialized();

    const giver = new Giver(ever, keyPairGiver.publicKey);
    factory = new Factory(ever, giver);
  });
  it("users should deployed", async () => {
    [adminAccount, userAccount1, userAccount2] = await range(3)
      .pipe(
        concatMap(() => factory.accounts.deployNewAccount(keyPair.publicKey)),
        toArray(),
      )
      .toPromise();
    await Promise.all(
      [adminAccount, userAccount1, userAccount2].map((account) =>
        ever.getFullContractState({ address: account.address }),
      ),
    ).then((res) => res.forEach(({ state }) => expect(Number(state.balance)).to.be.above(0)));
  });

  it("token root should deployed", async function () {
    const TOKEN_ROOT_NAME = "TOKEN_ROOT";
    tokenRoot = await factory.deployContract(
      contracts.tokenRoot.abi,
      {
        tvc: contracts.tokenRoot.base64,
        initParams: {
          name_: TOKEN_ROOT_NAME,
          symbol_: "NAME",
          decimals_: 9,
          rootOwner_: adminAccount.address,
          walletCode_: (await ever.splitTvc(contracts.tokenWallet.base64)).code,
          randomNonce_: getRandomNonce(),
          deployer_: new Address(zeroAddress),
        },
        publicKey: keyPair.publicKey,
      },
      {
        initialSupplyTo: new Address(zeroAddress),
        initialSupply: 0,
        deployWalletValue: 0,
        mintDisabled: false,
        burnByRootDisabled: false,
        burnPaused: false,
        remainingGasTo: adminAccount.address,
      },
    );
    const tokenName = await tokenRoot.methods.name({ answerId: 10 }).call();
    expect(tokenName.value0).to.be.eq(TOKEN_ROOT_NAME);
  });

  it("Admin should mint tokens for user1", async function () {
    const SEND_AMOUNT = 100;
    await adminAccount.sendTo({ contract: tokenRoot, value: convertCrystal(3, "nano") }, (contract) =>
      contract.methods.mint({
        amount: SEND_AMOUNT,
        recipient: userAccount1.address,
        payload: "",
        deployWalletValue: convertCrystal(1, "nano"),
        notify: false,
        remainingGasTo: adminAccount.address,
      }),
    );
    const userTokenWallet = await TokenWallet.getWallet(ever, userAccount1.address, tokenRoot);
    expect(await userTokenWallet.getBalance().then(Number)).to.be.eq(SEND_AMOUNT);
  });

  it("bank should deployed", async function () {
    bankContract = await factory.deployContract(
      contracts.simpleBank.abi,
      {
        tvc: contracts.simpleBank.base64,
        initParams: {
          nonce: getRandomNonce(),
        },
        publicKey: keyPair.publicKey,
      },
      {
        _owner: adminAccount.address,
        _tokenRoot: tokenRoot.address,
        _userDataCode: (await ever.splitTvc(contracts.userData.base64)).code,
      },
    );
    ever
      .getFullContractState({ address: bankContract.address })
      .then(({ state }) => expect(Number(state.balance)).to.be.above(0));
  });

  it("user should registered", async function () {
    await userAccount1.sendTo(
      {
        contract: bankContract,
      },
      (contract) => contract.methods.registerUser({ send_gas_to: userAccount1.address }),
    );
    const userDataAddress = (
      await bankContract.methods
        .getUserDataAddress({
          user: userAccount1.address,
          answerId: 0,
        })
        .call()
    ).value0;
    const userData = new ever.Contract(contracts.userData.abi, userDataAddress);
    const userDataOwner = await userData.methods.getDetails({ answerId: 1 }).call();
    expect(userDataOwner.value0.user.equals(userAccount1.address)).to.be.true;
  });
  it("user should successfully deposited", async function () {
    const DEPOSIT_AMOUNT = 50;
    const userTokenWallet = await TokenWallet.getWallet(ever, userAccount1.address, tokenRoot);
    await userAccount1.sendTo(
      {
        contract: userTokenWallet.walletContract,
        value: convertCrystal(5, "nano"),
      },
      (contract) =>
        contract.methods.transfer({
          amount: DEPOSIT_AMOUNT,
          payload: "",
          notify: true,
          remainingGasTo: userAccount1.address,
          recipient: bankContract.address,
          deployWalletValue: 0,
        }),
    );
    const event = await bankContract.waitForEvent({ filter: (event) => event.event === "Deposit" });
    if (event.event === "Deposit") {
      expect(Number(event.data.amount)).to.be.eq(DEPOSIT_AMOUNT);
    }
  });
});
