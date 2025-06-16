import { TransactionEntity } from "../data/entities/transaction-entity";
import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const getTransaction = async (
  id: string
): Promise<TransactionEntity> => {
  return await transactionRepositoryInstance.get(id);
};
