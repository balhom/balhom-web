import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { CurrencyProfileEntity } from "../../currency-profile/data/entities/currency-profile-entity";
import { TransactionEntity } from "../data/entities/transaction-entity";
import { TransactionTypeEnum } from "../data/enums/transaction-type-enum";
import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const getTransaction = async (
  id: String,
  type: TransactionTypeEnum,
  currencyProfile: CurrencyProfileEntity
): Promise<Either<AppError, TransactionEntity>> => {
  return await transactionRepositoryInstance.get(id, type, currencyProfile);
};
