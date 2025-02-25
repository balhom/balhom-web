import { CurrencyProfileEntity } from "../../currency-profile/data/entities/currency-profile-entity";
import { TransactionTypeEnum } from "../data/enums/transaction-type-enum";
import { transactionRepositoryInstance } from "../repositories/repository-instances";

export const deleteTransaction = async (
  id: string,
  type: TransactionTypeEnum,
  currencyProfile: CurrencyProfileEntity
): Promise<void> => {
  await transactionRepositoryInstance.delete(id, type, currencyProfile);
};
