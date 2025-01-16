import { createContext, useContext } from "react";
import { AccountEntity } from "../../data/entities/account-entity";

export interface AccountContextState {
  account: AccountEntity | null;
  setAccount: React.Dispatch<React.SetStateAction<AccountEntity | null>>;
}

export const AccountContext = createContext<AccountContextState>({
  account: null,
  setAccount: () => null,
});

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}
