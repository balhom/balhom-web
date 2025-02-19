import { TransactionTypeEnum } from "../data/enums/transaction-type-enum";
import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const deleteTransaction = async (
  id: String,
  type: TransactionTypeEnum
): Promise<void> => {
  await transactionRepositoryInstance.delete(id, type);
};
