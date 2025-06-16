import { UpdateTransactionProps } from "../data/props/update-transaction-props";
import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const updateTransaction = async (
  props: UpdateTransactionProps
): Promise<void> => {
  await transactionRepositoryInstance.update(props);
};
