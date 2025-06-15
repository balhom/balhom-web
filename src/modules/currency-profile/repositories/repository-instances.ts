import {
  balhomApiHttpServiceInstance,
  balhomApiSseServiceInstance,
} from "../../../common/services/intances";
import { currencyProfileRepository } from "./currency-profile-repository";
import { currencyProfileSharedUserRepository } from "./currency-profile-shared-user-repository";

export const currencyProfileRepositoryInstance = currencyProfileRepository(
  balhomApiHttpServiceInstance,
  balhomApiSseServiceInstance
);

export const currencyProfileSharedUserRepositoryInstance =
  currencyProfileSharedUserRepository(balhomApiHttpServiceInstance);
