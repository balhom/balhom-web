import { balhomApiHttpServiceInstance } from "../../../common/services/intances";
import { dailyTransactionStatisticsRepository } from "./daily-transaction-statistics-repository";
import { monthlySavingStatisticsRepository } from "./monthly-saving-statistics-repository";
import { monthlyTransactionStatisticsRepository } from "./monthly-transaction-statistics-repository";
import { yearlySavingStatisticsRepository } from "./yearly-saving-statistics-repository";

export const dailyTransactionStatisticsRepositoryInstance =
  dailyTransactionStatisticsRepository(balhomApiHttpServiceInstance);

export const monthlyTransactionStatisticsRepositoryInstance =
  monthlyTransactionStatisticsRepository(balhomApiHttpServiceInstance);

export const monthlySavingStatisticsRepositoryInstance =
  monthlySavingStatisticsRepository(balhomApiHttpServiceInstance);

export const yearlySavingStatisticsRepositoryInstance =
  yearlySavingStatisticsRepository(balhomApiHttpServiceInstance);
