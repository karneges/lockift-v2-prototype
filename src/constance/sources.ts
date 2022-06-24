import * as fs from "fs";
import path from "path";

export const GiverAddress = "0:ece57bcc6c530283becbbd8a3b24d3c5987cdddc3c8b7b33be6e4a6312490415";
export const GiverAbi = {
  "ABI version": 2,
  header: ["time", "expire"],
  functions: [
    {
      name: "upgrade",
      inputs: [{ name: "newcode", type: "cell" }],
      outputs: [],
    },
    {
      name: "sendTransaction",
      inputs: [
        { name: "dest", type: "address" },
        { name: "value", type: "uint128" },
        { name: "bounce", type: "bool" },
      ],
      outputs: [],
    },
    {
      name: "getMessages",
      inputs: [],
      outputs: [
        {
          components: [
            { name: "hash", type: "uint256" },
            { name: "expireAt", type: "uint64" },
          ],
          name: "messages",
          type: "tuple[]",
        },
      ],
    },
    {
      name: "constructor",
      inputs: [],
      outputs: [],
    },
  ],
  events: [],
} as const;

export const UserDataAbi = {
  "ABI version": 2,
  version: "2.2",
  header: ["time", "expire"],
  functions: [
    {
      name: "constructor",
      inputs: [],
      outputs: [],
    },
    {
      name: "getDetails",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [
        {
          components: [
            { name: "amount", type: "uint128" },
            { name: "user", type: "address" },
          ],
          name: "value0",
          type: "tuple",
        },
      ],
    },
    {
      name: "processDeposit",
      inputs: [
        { name: "_amount", type: "uint128" },
        { name: "_nonce", type: "uint64" },
      ],
      outputs: [],
    },
    {
      name: "burn",
      inputs: [{ name: "_amount", type: "uint128" }],
      outputs: [],
    },
    {
      name: "processWithdraw",
      inputs: [
        { name: "_amount", type: "uint128" },
        { name: "_nonce", type: "uint64" },
      ],
      outputs: [],
    },
    {
      name: "sendToUser",
      inputs: [
        { name: "_targetUser", type: "address" },
        { name: "_amount", type: "uint128" },
        { name: "send_gas_to", type: "address" },
      ],
      outputs: [],
    },
    {
      name: "receiveFromUser",
      inputs: [
        { name: "_user", type: "address" },
        { name: "_amount", type: "uint128" },
        { name: "send_gas_to", type: "address" },
      ],
      outputs: [],
    },
    {
      name: "receiveFromBank",
      inputs: [{ name: "_amount", type: "uint128" }],
      outputs: [],
    },
    {
      name: "amount",
      inputs: [],
      outputs: [{ name: "amount", type: "uint128" }],
    },
    {
      name: "userDataCode",
      inputs: [],
      outputs: [{ name: "userDataCode", type: "cell" }],
    },
  ],
  data: [
    { key: 1, name: "user", type: "address" },
    { key: 2, name: "userDataCode", type: "cell" },
    { key: 3, name: "simpleBank", type: "address" },
  ],
  events: [
    {
      name: "Receive",
      inputs: [
        { name: "fromUser", type: "address" },
        { name: "amount", type: "uint128" },
      ],
      outputs: [],
    },
    {
      name: "Send",
      inputs: [
        { name: "toUser", type: "address" },
        { name: "amount", type: "uint128" },
      ],
      outputs: [],
    },
  ],
  fields: [
    { name: "_pubkey", type: "uint256" },
    { name: "_timestamp", type: "uint64" },
    { name: "_constructorFlag", type: "bool" },
    { name: "amount", type: "uint128" },
    { name: "user", type: "address" },
    { name: "userDataCode", type: "cell" },
    { name: "simpleBank", type: "address" },
  ],
} as const;
export const UserDataBase64 = fs
  .readFileSync(path.join(__dirname, "../../build/UserData.base64"), "utf8")
  .split("\n")
  .join("");
export const SimpleBankAbi = {
  "ABI version": 2,
  version: "2.2",
  header: ["time", "expire"],
  functions: [
    {
      name: "constructor",
      inputs: [
        { name: "_tokenRoot", type: "address" },
        { name: "_userDataCode", type: "cell" },
        { name: "_owner", type: "address" },
      ],
      outputs: [],
    },
    {
      name: "receiveTokenWalletAddress",
      inputs: [{ name: "wallet", type: "address" }],
      outputs: [],
    },
    {
      name: "getDetails",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [
        {
          components: [
            { name: "tokenRoot", type: "address" },
            { name: "tokenWallet", type: "address" },
            { name: "tokenBalance", type: "uint128" },
            { name: "owner", type: "address" },
          ],
          name: "value0",
          type: "tuple",
        },
      ],
    },
    {
      name: "registerUser",
      inputs: [{ name: "send_gas_to", type: "address" }],
      outputs: [],
    },
    {
      name: "getUserDataAddress",
      inputs: [
        { name: "answerId", type: "uint32" },
        { name: "user", type: "address" },
      ],
      outputs: [{ name: "value0", type: "address" }],
    },
    {
      name: "finishDeposit",
      inputs: [
        { name: "_amount", type: "uint128" },
        { name: "_nonce", type: "uint64" },
      ],
      outputs: [],
    },
    {
      name: "withdraw",
      inputs: [
        { name: "_amount", type: "uint128" },
        { name: "_nonce", type: "uint64" },
      ],
      outputs: [],
    },
    {
      name: "finishWithdraw",
      inputs: [
        { name: "user", type: "address" },
        { name: "_amount", type: "uint128" },
        { name: "_nonce", type: "uint64" },
      ],
      outputs: [],
    },
    {
      name: "startBurn",
      inputs: [
        { name: "_targetUser", type: "address" },
        { name: "_amount", type: "uint128" },
      ],
      outputs: [],
    },
    {
      name: "finishBurn",
      inputs: [
        { name: "_burnedAmount", type: "uint128" },
        { name: "user", type: "address" },
      ],
      outputs: [],
    },
    {
      name: "sendToUser",
      inputs: [
        { name: "_targetUser", type: "address" },
        { name: "_amount", type: "uint128" },
      ],
      outputs: [],
    },
    {
      name: "finishSendToUser",
      inputs: [{ name: "_user", type: "address" }],
      outputs: [],
    },
    {
      name: "onAcceptTokensTransfer",
      inputs: [
        { name: "_tokenRoot", type: "address" },
        { name: "_amount", type: "uint128" },
        { name: "_sender", type: "address" },
        { name: "_senderWallet", type: "address" },
        { name: "_remainingGasTo", type: "address" },
        { name: "_payload", type: "cell" },
      ],
      outputs: [],
    },
    {
      name: "nonce",
      inputs: [],
      outputs: [{ name: "nonce", type: "uint128" }],
    },
    {
      name: "tokenWallet",
      inputs: [],
      outputs: [{ name: "tokenWallet", type: "address" }],
    },
    {
      name: "userDataCode",
      inputs: [],
      outputs: [{ name: "userDataCode", type: "cell" }],
    },
  ],
  data: [{ key: 1, name: "nonce", type: "uint128" }],
  events: [
    {
      name: "Deposit",
      inputs: [
        { name: "user", type: "address" },
        { name: "amount", type: "uint128" },
      ],
      outputs: [],
    },
    {
      name: "Withdraw",
      inputs: [
        { name: "user", type: "address" },
        { name: "amount", type: "uint128" },
      ],
      outputs: [],
    },
    {
      name: "Burn",
      inputs: [
        { name: "user", type: "address" },
        { name: "amount", type: "uint128" },
      ],
      outputs: [],
    },
    {
      name: "Registered",
      inputs: [
        { name: "pubkey", type: "uint256" },
        { name: "user", type: "address" },
      ],
      outputs: [],
    },
  ],
  fields: [
    { name: "_pubkey", type: "uint256" },
    { name: "_timestamp", type: "uint64" },
    { name: "_constructorFlag", type: "bool" },
    { name: "nonce", type: "uint128" },
    { name: "tokenRoot", type: "address" },
    { name: "tokenWallet", type: "address" },
    { name: "owner", type: "address" },
    { name: "tokenBalance", type: "uint128" },
    { name: "freeTokenBalance", type: "uint128" },
    { name: "userDataCode", type: "cell" },
    {
      components: [
        { name: "value", type: "uint128" },
        { name: "user", type: "address" },
      ],
      name: "pendingDeposit",
      type: "map(address,tuple)",
    },
  ],
} as const;

export const SimpleBankBase64 = fs
  .readFileSync(path.join(__dirname, "../../build/SimpleBank.base64"), "utf8")
  .split("\n")
  .join("");

export const WalletAbi = {
  "ABI version": 2,
  version: "2.2",
  header: ["pubkey", "time", "expire"],
  functions: [
    {
      name: "sendTransaction",
      inputs: [
        { name: "dest", type: "address" },
        { name: "value", type: "uint128" },
        { name: "bounce", type: "bool" },
        { name: "flags", type: "uint8" },
        { name: "payload", type: "cell" },
      ],
      outputs: [],
    },
    {
      name: "transferOwnership",
      inputs: [{ name: "newOwner", type: "uint256" }],
      outputs: [],
    },
    {
      name: "constructor",
      inputs: [],
      outputs: [],
    },
    {
      name: "owner",
      inputs: [],
      outputs: [{ name: "owner", type: "uint256" }],
    },
    {
      name: "_randomNonce",
      inputs: [],
      outputs: [{ name: "_randomNonce", type: "uint256" }],
    },
  ],
  data: [{ key: 1, name: "_randomNonce", type: "uint256" }],
  events: [
    {
      name: "OwnershipTransferred",
      inputs: [
        { name: "previousOwner", type: "uint256" },
        { name: "newOwner", type: "uint256" },
      ],
      outputs: [],
    },
  ],
  fields: [
    { name: "_pubkey", type: "uint256" },
    { name: "_timestamp", type: "uint64" },
    { name: "_constructorFlag", type: "bool" },
    { name: "owner", type: "uint256" },
    { name: "_randomNonce", type: "uint256" },
  ],
} as const;
export const WalletBase64 = fs
  .readFileSync(path.join(__dirname, "../../build/Wallet.base64"), "utf8")
  .split("\n")
  .join("");

export const TokenRootAbi = {
  "ABI version": 2,
  version: "2.2",
  header: ["pubkey", "time", "expire"],
  functions: [
    {
      name: "constructor",
      inputs: [
        { name: "initialSupplyTo", type: "address" },
        { name: "initialSupply", type: "uint128" },
        { name: "deployWalletValue", type: "uint128" },
        { name: "mintDisabled", type: "bool" },
        { name: "burnByRootDisabled", type: "bool" },
        { name: "burnPaused", type: "bool" },
        { name: "remainingGasTo", type: "address" },
      ],
      outputs: [],
    },
    {
      name: "supportsInterface",
      inputs: [
        { name: "answerId", type: "uint32" },
        { name: "interfaceID", type: "uint32" },
      ],
      outputs: [{ name: "value0", type: "bool" }],
    },
    {
      name: "disableMint",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "bool" }],
    },
    {
      name: "mintDisabled",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "bool" }],
    },
    {
      name: "burnTokens",
      inputs: [
        { name: "amount", type: "uint128" },
        { name: "walletOwner", type: "address" },
        { name: "remainingGasTo", type: "address" },
        { name: "callbackTo", type: "address" },
        { name: "payload", type: "cell" },
      ],
      outputs: [],
    },
    {
      name: "disableBurnByRoot",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "bool" }],
    },
    {
      name: "burnByRootDisabled",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "bool" }],
    },
    {
      name: "burnPaused",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "bool" }],
    },
    {
      name: "setBurnPaused",
      inputs: [
        { name: "answerId", type: "uint32" },
        { name: "paused", type: "bool" },
      ],
      outputs: [{ name: "value0", type: "bool" }],
    },
    {
      name: "transferOwnership",
      inputs: [
        { name: "newOwner", type: "address" },
        { name: "remainingGasTo", type: "address" },
        {
          components: [
            { name: "value", type: "uint128" },
            { name: "payload", type: "cell" },
          ],
          name: "callbacks",
          type: "map(address,tuple)",
        },
      ],
      outputs: [],
    },
    {
      name: "name",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "string" }],
    },
    {
      name: "symbol",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "string" }],
    },
    {
      name: "decimals",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "uint8" }],
    },
    {
      name: "totalSupply",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "uint128" }],
    },
    {
      name: "walletCode",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "cell" }],
    },
    {
      name: "rootOwner",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "address" }],
    },
    {
      name: "walletOf",
      inputs: [
        { name: "answerId", type: "uint32" },
        { name: "walletOwner", type: "address" },
      ],
      outputs: [{ name: "value0", type: "address" }],
    },
    {
      name: "deployWallet",
      inputs: [
        { name: "answerId", type: "uint32" },
        { name: "walletOwner", type: "address" },
        { name: "deployWalletValue", type: "uint128" },
      ],
      outputs: [{ name: "tokenWallet", type: "address" }],
    },
    {
      name: "mint",
      inputs: [
        { name: "amount", type: "uint128" },
        { name: "recipient", type: "address" },
        { name: "deployWalletValue", type: "uint128" },
        { name: "remainingGasTo", type: "address" },
        { name: "notify", type: "bool" },
        { name: "payload", type: "cell" },
      ],
      outputs: [],
    },
    {
      name: "acceptBurn",
      id: "0x192B51B1",
      inputs: [
        { name: "amount", type: "uint128" },
        { name: "walletOwner", type: "address" },
        { name: "remainingGasTo", type: "address" },
        { name: "callbackTo", type: "address" },
        { name: "payload", type: "cell" },
      ],
      outputs: [],
    },
    {
      name: "sendSurplusGas",
      inputs: [{ name: "to", type: "address" }],
      outputs: [],
    },
  ],
  data: [
    { key: 1, name: "name_", type: "string" },
    { key: 2, name: "symbol_", type: "string" },
    { key: 3, name: "decimals_", type: "uint8" },
    { key: 4, name: "rootOwner_", type: "address" },
    { key: 5, name: "walletCode_", type: "cell" },
    { key: 6, name: "randomNonce_", type: "uint256" },
    { key: 7, name: "deployer_", type: "address" },
  ],
  events: [],
  fields: [
    { name: "_pubkey", type: "uint256" },
    { name: "_timestamp", type: "uint64" },
    { name: "_constructorFlag", type: "bool" },
    { name: "name_", type: "string" },
    { name: "symbol_", type: "string" },
    { name: "decimals_", type: "uint8" },
    { name: "rootOwner_", type: "address" },
    { name: "walletCode_", type: "cell" },
    { name: "totalSupply_", type: "uint128" },
    { name: "burnPaused_", type: "bool" },
    { name: "burnByRootDisabled_", type: "bool" },
    { name: "mintDisabled_", type: "bool" },
    { name: "randomNonce_", type: "uint256" },
    { name: "deployer_", type: "address" },
  ],
} as const;
export const TokenRootBase64 = fs
  .readFileSync(path.join(__dirname, "../../build/TokenRoot.base64"), "utf8")
  .split("\n")
  .join("");

export const TokenWalletAbi = {
  "ABI version": 2,
  version: "2.2",
  header: ["pubkey", "time", "expire"],
  functions: [
    {
      name: "constructor",
      inputs: [],
      outputs: [],
    },
    {
      name: "supportsInterface",
      inputs: [
        { name: "answerId", type: "uint32" },
        { name: "interfaceID", type: "uint32" },
      ],
      outputs: [{ name: "value0", type: "bool" }],
    },
    {
      name: "destroy",
      inputs: [{ name: "remainingGasTo", type: "address" }],
      outputs: [],
    },
    {
      name: "burnByRoot",
      inputs: [
        { name: "amount", type: "uint128" },
        { name: "remainingGasTo", type: "address" },
        { name: "callbackTo", type: "address" },
        { name: "payload", type: "cell" },
      ],
      outputs: [],
    },
    {
      name: "burn",
      inputs: [
        { name: "amount", type: "uint128" },
        { name: "remainingGasTo", type: "address" },
        { name: "callbackTo", type: "address" },
        { name: "payload", type: "cell" },
      ],
      outputs: [],
    },
    {
      name: "balance",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "uint128" }],
    },
    {
      name: "owner",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "address" }],
    },
    {
      name: "root",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "address" }],
    },
    {
      name: "walletCode",
      inputs: [{ name: "answerId", type: "uint32" }],
      outputs: [{ name: "value0", type: "cell" }],
    },
    {
      name: "transfer",
      inputs: [
        { name: "amount", type: "uint128" },
        { name: "recipient", type: "address" },
        { name: "deployWalletValue", type: "uint128" },
        { name: "remainingGasTo", type: "address" },
        { name: "notify", type: "bool" },
        { name: "payload", type: "cell" },
      ],
      outputs: [],
    },
    {
      name: "transferToWallet",
      inputs: [
        { name: "amount", type: "uint128" },
        { name: "recipientTokenWallet", type: "address" },
        { name: "remainingGasTo", type: "address" },
        { name: "notify", type: "bool" },
        { name: "payload", type: "cell" },
      ],
      outputs: [],
    },
    {
      name: "acceptTransfer",
      id: "0x67A0B95F",
      inputs: [
        { name: "amount", type: "uint128" },
        { name: "sender", type: "address" },
        { name: "remainingGasTo", type: "address" },
        { name: "notify", type: "bool" },
        { name: "payload", type: "cell" },
      ],
      outputs: [],
    },
    {
      name: "acceptMint",
      id: "0x4384F298",
      inputs: [
        { name: "amount", type: "uint128" },
        { name: "remainingGasTo", type: "address" },
        { name: "notify", type: "bool" },
        { name: "payload", type: "cell" },
      ],
      outputs: [],
    },
    {
      name: "sendSurplusGas",
      inputs: [{ name: "to", type: "address" }],
      outputs: [],
    },
  ],
  data: [
    { key: 1, name: "root_", type: "address" },
    { key: 2, name: "owner_", type: "address" },
  ],
  events: [],
  fields: [
    { name: "_pubkey", type: "uint256" },
    { name: "_timestamp", type: "uint64" },
    { name: "_constructorFlag", type: "bool" },
    { name: "root_", type: "address" },
    { name: "owner_", type: "address" },
    { name: "balance_", type: "uint128" },
  ],
} as const;
export const TokenWalletBase64 = fs
  .readFileSync(path.join(__dirname, "../../build/TokenWallet.base64"), "utf8")
  .split("\n")
  .join("");
