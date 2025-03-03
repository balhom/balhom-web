import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { mockCurrencyProfiles } from "../../../mocks/mock-currency-profiles";
import { CurrencyProfileChangeEventEntity } from "../data/entities/currency-profile-change-event-entity";
import { CurrencyProfileEntity } from "../data/entities/currency-profile-entity";

export interface CurrencyProfileRepository {
  get: (id: string) => Promise<Either<AppError, CurrencyProfileEntity>>;

  list: () => Promise<Either<AppError, CurrencyProfileEntity[]>>;

  listen: (
    onChange: (event: CurrencyProfileChangeEventEntity) => void
  ) => Promise<Either<AppError, void>>;
}

export const currencyProfileRepository = (): CurrencyProfileRepository => ({
  get: async (id: string): Promise<Either<AppError, CurrencyProfileEntity>> => {
    // TODO remove and do api call
    console.log(id);
    const currencyProfile = mockCurrencyProfiles.find(
      (profile) => profile.id === id
    );

    if (!currencyProfile) {
      return Either.left(new AppError(""));
    }

    return Either.right(currencyProfile);
  },

  list: async (): Promise<Either<AppError, CurrencyProfileEntity[]>> => {
    // TODO remove and do api call
    return Either.right(mockCurrencyProfiles);
  },

  listen: async (
    onChange: (event: CurrencyProfileChangeEventEntity) => void
  ): Promise<Either<AppError, void>> => {
    // TODO remove and do api call
    console.log(onChange);

    // TODO Only one stream available, close old one if new is created

    // TODO if stream is closed from sever then retry connection

    return Either.right(undefined);
  },
});
