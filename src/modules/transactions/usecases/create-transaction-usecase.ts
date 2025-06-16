import { TransactionEntity } from "../data/entities/transaction-entity";
import { CreateTransactionProps } from "../data/props/create-transaction-props";
import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const createTransaction = async (
  props: CreateTransactionProps
): Promise<TransactionEntity> => {
  return await transactionRepositoryInstance.create(props);
};
