import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { TransactionCreateProps } from "../data/props/transaction-create-props";
import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const createTransaction = async (
  props: TransactionCreateProps
): Promise<Either<AppError, void>> => {
  return await transactionRepositoryInstance.create(props);
};
