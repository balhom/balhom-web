import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { TransactionUpdateProps } from "../data/props/transaction-update-props";
import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const updateTransaction = async (
  props: TransactionUpdateProps
): Promise<Either<AppError, void>> => {
  return await transactionRepositoryInstance.update(props);
};
