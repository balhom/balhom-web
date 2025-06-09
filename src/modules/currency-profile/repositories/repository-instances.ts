import { currencyProfileRepository } from "./currency-profile-repository";
import { currencyProfileSharedUserRepository } from "./currency-profile-shared-user-repository";

export const currencyProfileRepositoryInstance = currencyProfileRepository();

export const currencyProfileSharedUserRepositoryInstance =
  currencyProfileSharedUserRepository();
