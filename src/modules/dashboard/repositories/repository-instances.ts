import { dailyTransactionStatisticsRepository } from "./daily-transaction-statistics-repository";
import { monthlyTransactionStatisticsRepository } from "./monthly-transaction-statistics-repository";

export const dailyTransactionStatisticsRepositoryInstance =
  dailyTransactionStatisticsRepository();

export const monthlyTransactionStatisticsRepositoryInstance =
  monthlyTransactionStatisticsRepository();
