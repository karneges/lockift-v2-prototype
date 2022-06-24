import {
  GiverAbi,
  SimpleBankAbi,
  SimpleBankBase64,
  TokenRootAbi,
  TokenRootBase64,
  TokenWalletAbi,
  TokenWalletBase64,
  UserDataAbi,
  UserDataBase64,
  WalletAbi,
  WalletBase64,
} from "./sources";

export const contracts = {
  giver: {
    abi: GiverAbi,
  },
  simpleBank: {
    abi: SimpleBankAbi,
    base64: SimpleBankBase64,
  },
  userData: {
    abi: UserDataAbi,
    base64: UserDataBase64,
  },
  wallet: {
    abi: WalletAbi,
    base64: WalletBase64,
  },
  tokenRoot: {
    abi: TokenRootAbi,
    base64: TokenRootBase64,
  },
  tokenWallet: {
    abi: TokenWalletAbi,
    base64: TokenWalletBase64,
  },
} as const;
