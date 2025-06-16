import { TransactionCategoryStatisticsEntity } from "../data/entities/transaction-category-statistics-entity";
import { TransactionTypeEnum } from "../data/enums/transaction-type-enum";
import { transactionCategoryStatisticsRepositoryInstance } from "../repositories/repository-instances";

export const getTransactionCategoryStatistics = async (
  currencyProfileId: string,
  type: TransactionTypeEnum,
  month: number,
  year: number
): Promise<TransactionCategoryStatisticsEntity> => {
  try {
    return await transactionCategoryStatisticsRepositoryInstance.get(
      currencyProfileId,
      type,
      month,
      year
    );
  } catch {
    return {
      points: [],
    };
  }
};
