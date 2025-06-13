import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import HttpService from "../../../common/services/http-service";
import { CurrencyProfileSharedUserEntity } from "../data/entities/currency-profile-shared-user-entity";
import { CreateCurrencyProfileSharedUserProps } from "../data/props/create-currency-profile-shared-user-props";

export interface CurrencyProfileSharedUserRepository {
  list: (
    currencyProfileId: string
  ) => Promise<Either<AppError, CurrencyProfileSharedUserEntity[]>>;

  create: (
    props: CreateCurrencyProfileSharedUserProps
  ) => Promise<Either<AppError, CurrencyProfileSharedUserEntity>>;

  delete: (
    currencyProfileId: string,
    id: string
  ) => Promise<Either<AppError, void>>;
}

export const currencyProfileSharedUserRepository = (
  httpService: HttpService
): CurrencyProfileSharedUserRepository => ({
  list: async (
    currencyProfileId: string
  ): Promise<Either<AppError, CurrencyProfileSharedUserEntity[]>> => {
    // TODO remove and do api call
    console.log(currencyProfileId);

    return Either.right([
      {
        id: "12345678",
        email: "test@email.com",
      },
    ]);
  },

  create: async (
    props: CreateCurrencyProfileSharedUserProps
  ): Promise<Either<AppError, CurrencyProfileSharedUserEntity>> => {
    // TODO remove and do api call
    console.log(props);

    return Either.right({
      id: "12345678",
      email: props.email,
    });
  },

  delete: async (
    currencyProfileId: string,
    id: string
  ): Promise<Either<AppError, void>> => {
    // TODO remove and do api call
    console.log(currencyProfileId, id);

    return Either.right(undefined);
  },
});
