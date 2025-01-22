import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { AccountEntity } from "../data/entities/account-entity";
import { AccountUpdateProps } from "../data/props/account-update-props";

export interface AccountRepository {
  get: () => Promise<Either<AppError, AccountEntity>>;

  update: (
    accountUpdate: AccountUpdateProps
  ) => Promise<Either<AppError, void>>;
}

export const accountRepository = (): AccountRepository => ({
  get: async (): Promise<Either<AppError, AccountEntity>> => {
    // TODO remove and do api call
    return Either.right({
      id: "",
      email: "",
      locale: "",
      dateJoined: new Date(),
    });
  },

  update: async (
    accountUpdate: AccountUpdateProps
  ): Promise<Either<AppError, void>> => {
    // TODO remove and do api call
    console.log(accountUpdate);

    return Either.right(undefined);
  },
});
