import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { AccountEntity } from "../data/entities/account-entity";
import { AccountUpdateProps } from "../data/props/account-update-props";

export interface AccountRepository {
  getAccount: () => Promise<Either<AppError, AccountEntity>>;

  updateAccount: (
    accountUpdate: AccountUpdateProps
  ) => Promise<Either<AppError, void>>;
}

export const accountRepository = (): AccountRepository => ({
  getAccount: async (): Promise<Either<AppError, AccountEntity>> => {
    // TODO remove and do api call
    return Either.right({
      id: "",
      email: "",
      locale: "",
      dateJoined: new Date(),
    });
  },

  updateAccount: async (
    accountUpdate: AccountUpdateProps
  ): Promise<Either<AppError, void>> => {
    // TODO remove and do api call
    console.log(accountUpdate);

    return Either.right(undefined);
  },
});
