import { MonthlySavingStatisticsEntity } from "../entities/monthly-saving-statistics-entity";
import { YearlySavingStatisticsEntity } from "../entities/yearly-saving-statistics-entity";

export interface SavingStatisticsState {
  monthlyStatistics: MonthlySavingStatisticsEntity;
  yearlyStatistics: YearlySavingStatisticsEntity;
  selectedYear: number;
  isMonthlyStatisticsLoading: boolean;
  isYearlyStatisticsLoading: boolean;
}
