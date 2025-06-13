import { DailyTransactionStatisticsEntity } from "../data/entities/daily-transaction-statistics-entity";
import { dailyTransactionStatisticsRepositoryInstance } from "../repositories/repository-instances";
import { fillDailyTransactionStatisticsPoints } from "../utils";

export const getDailyTransactionStatistics = async (
  currencyProfileId: string,
  month: number,
  year: number
): Promise<DailyTransactionStatisticsEntity> => {
  try {
    const dailyTransactionStatistics =
      await dailyTransactionStatisticsRepositoryInstance.get(
        currencyProfileId,
        month,
        year
      );

    return {
      points: fillDailyTransactionStatisticsPoints(
        dailyTransactionStatistics.points,
        dailyTransactionStatistics.month,
        dailyTransactionStatistics.year
      ),
      month: dailyTransactionStatistics.month,
      year: dailyTransactionStatistics.year,
    };
  } catch {
    return {
      points: fillDailyTransactionStatisticsPoints([], month, year),
      month: month,
      year: year,
    };
  }
};
