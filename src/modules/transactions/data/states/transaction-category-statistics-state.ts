import { TransactionCategoryStatisticsEntity } from "../entities/transaction-category-statistics-entity";

export interface TransactionCategoryStatisticsState {
  categoryStatistics: TransactionCategoryStatisticsEntity;
  isStatisticsLoading: boolean;
}
