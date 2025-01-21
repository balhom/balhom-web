import { createContext, useContext } from "react";
import { CurrencyProfileEntity } from "../../data/entities/currency-profile-entity";

export interface CurrencyProfilesContextState {
  selectedCurrencyProfile: CurrencyProfileEntity | null;
  currencyProfiles: CurrencyProfileEntity[];
  setSelectedCurrencyProfile: React.Dispatch<
    React.SetStateAction<CurrencyProfileEntity | null>
  >;
  setCurrencyProfiles: React.Dispatch<
    React.SetStateAction<CurrencyProfileEntity[]>
  >;
}

export const CurrencyProfilesContext =
  createContext<CurrencyProfilesContextState>({
    selectedCurrencyProfile: null,
    currencyProfiles: [],
    setSelectedCurrencyProfile: () => null,
    setCurrencyProfiles: () => null,
  });

export function useCurrencyProfiles() {
  const context = useContext(CurrencyProfilesContext);
  if (!context) {
    throw new Error(
      "useCurrencyProfiles must be used within an CurrencyProfilesProvider"
    );
  }
  return context;
}
