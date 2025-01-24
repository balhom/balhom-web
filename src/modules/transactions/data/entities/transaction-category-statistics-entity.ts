import { TransactionCategoryEntity } from "./transaction-category-entity";

export interface TransactionCategoryStatisticsEntity {
  points: TransactionCategoryPointEntity[];
}

export interface TransactionCategoryPointEntity {
  category: TransactionCategoryEntity;
  value: number;
}
