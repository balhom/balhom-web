import { DailyTransactionStatisticsEntity } from "../entities/daily-transaction-statistics-entity";
import { MonthlyTransactionStatisticsEntity } from "../entities/monthly-transaction-statistics-entity";

export interface TransactionStatisticsState {
  dailyStatistics: DailyTransactionStatisticsEntity;
  monthlyStatistics: MonthlyTransactionStatisticsEntity;
  selectedMonth: number;
  selectedYear: number;
  isDailyStatisticsLoading: boolean;
  isMonthlyStatisticsLoading: boolean;
}
