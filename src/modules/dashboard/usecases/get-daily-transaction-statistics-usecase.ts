import { DailyTransactionStatisticsEntity } from "../data/entities/daily-transaction-statistics-entity";
import { dailyTransactionStatisticsRepositoryInstance } from "../repositories/repository-instances";
import { fillDailyTransactionStatisticsPoints } from "../utils";

export const getDailyTransactionStatistics = async (
  month: number,
  year: number
): Promise<DailyTransactionStatisticsEntity> => {
  return (
    await dailyTransactionStatisticsRepositoryInstance.get(month, year)
  ).fold(
    () =>
      <DailyTransactionStatisticsEntity>{
        points: fillDailyTransactionStatisticsPoints([], month, year),
        month: month,
        year: year,
      },
    (dailyTransactionStatistics: DailyTransactionStatisticsEntity) => {
      return {
        points: fillDailyTransactionStatisticsPoints(
          dailyTransactionStatistics.points,
          dailyTransactionStatistics.month,
          dailyTransactionStatistics.year
        ),
        month: dailyTransactionStatistics.month,
        year: dailyTransactionStatistics.year,
      };
    }
  );
};
