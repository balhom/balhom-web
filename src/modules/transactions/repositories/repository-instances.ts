import { transactionCategoryStatisticsRepository } from "./transaction-category-statistics-repository";
import { transactionDocumentUrlRepository } from "./transaction-document-url-repository";
import { transactionRepository } from "./transaction-repository";

export const transactionCategoryStatisticsRepositoryInstance =
  transactionCategoryStatisticsRepository();

export const transactionRepositoryInstance = transactionRepository();

export const transactionDocumentUrlRepositoryInstance =
  transactionDocumentUrlRepository();
