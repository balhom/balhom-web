import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { UpdateTransactionProps } from "../data/props/update-transaction-props";
import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const updateTransaction = async (
  props: UpdateTransactionProps
): Promise<Either<AppError, void>> => {
  return await transactionRepositoryInstance.update(props);
};
