import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { CreateTransactionProps } from "../data/props/create-transaction-props";
import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const createTransaction = async (
  props: CreateTransactionProps
): Promise<Either<AppError, void>> => {
  return await transactionRepositoryInstance.create(props);
};
