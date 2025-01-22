import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { mockCurrencyProfiles } from "../../../mocks/mock-currency-profiles";
import { CurrencyProfileEntity } from "../data/entities/currency-profile-entity";

export interface CurrencyProfileRepository {
  list: () => Promise<Either<AppError, CurrencyProfileEntity[]>>;
}

export const currencyProfileRepository = (): CurrencyProfileRepository => ({
  list: async (): Promise<Either<AppError, CurrencyProfileEntity[]>> => {
    // TODO remove and do api call
    return Either.right(mockCurrencyProfiles);
  },
});
