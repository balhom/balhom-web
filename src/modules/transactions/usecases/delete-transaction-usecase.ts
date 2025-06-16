import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const deleteTransaction = async (id: string): Promise<void> => {
  await transactionRepositoryInstance.delete(id);
};
