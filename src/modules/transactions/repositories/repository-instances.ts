import { transactionCategoryStatisticsRepository } from "./transaction-category-statistics-repository";
import { transactionRepository } from "./transaction-repository";

export const transactionCategoryStatisticsRepositoryInstance =
  transactionCategoryStatisticsRepository();

export const transactionRepositoryInstance = transactionRepository();
