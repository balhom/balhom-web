import { balhomApiServiceInstance } from "../../../common/services/intances";
import { dailyTransactionStatisticsRepository } from "./daily-transaction-statistics-repository";
import { monthlySavingStatisticsRepository } from "./monthly-saving-statistics-repository";
import { monthlyTransactionStatisticsRepository } from "./monthly-transaction-statistics-repository";
import { yearlySavingStatisticsRepository } from "./yearly-saving-statistics-repository";

export const dailyTransactionStatisticsRepositoryInstance =
  dailyTransactionStatisticsRepository(balhomApiServiceInstance);

export const monthlyTransactionStatisticsRepositoryInstance =
  monthlyTransactionStatisticsRepository();

export const monthlySavingStatisticsRepositoryInstance =
  monthlySavingStatisticsRepository();

export const yearlySavingStatisticsRepositoryInstance =
  yearlySavingStatisticsRepository();
