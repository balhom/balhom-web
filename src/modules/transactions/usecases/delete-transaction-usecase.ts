import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const deleteTransaction = async (id: String): Promise<void> => {
  await transactionRepositoryInstance.delete(id);
};
