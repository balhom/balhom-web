import { TransactionCategoryStatisticsEntity } from "../data/entities/transaction-category-statistics-entity";
import { TransactionTypeEnum } from "../data/enums/transaction-type-enum";
import { transactionCategoryStatisticsRepositoryInstance } from "../repositories/repository-instances";

export const getTransactionCategoryStatistics = async (
  type: TransactionTypeEnum,
  month: number,
  year: number
): Promise<TransactionCategoryStatisticsEntity> => {
  return (
    await transactionCategoryStatisticsRepositoryInstance.get(type, month, year)
  ).fold(
    () =>
      <TransactionCategoryStatisticsEntity>{
        points: [],
      },
    (transactionCategoryStatistics: TransactionCategoryStatisticsEntity) => {
      return transactionCategoryStatistics;
    }
  );
};
