import { balhomApiServiceInstance } from "../../../common/services/intances";
import { currencyProfileRepository } from "./currency-profile-repository";
import { currencyProfileSharedUserRepository } from "./currency-profile-shared-user-repository";

export const currencyProfileRepositoryInstance = currencyProfileRepository(
  balhomApiServiceInstance
);

export const currencyProfileSharedUserRepositoryInstance =
  currencyProfileSharedUserRepository(balhomApiServiceInstance);
