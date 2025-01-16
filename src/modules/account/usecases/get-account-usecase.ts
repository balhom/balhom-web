import { AccountEntity } from "../data/entities/account-entity";
import { AppError } from "../../../common/data/errors/app-error";
import { Either } from "../../../common/data/either";
import { accountRepositoryInstance } from "../repositories/repository-instances";

export const getAccount = async (): Promise<
  Either<AppError, AccountEntity>
> => {
  return await accountRepositoryInstance.getAccount();
};
