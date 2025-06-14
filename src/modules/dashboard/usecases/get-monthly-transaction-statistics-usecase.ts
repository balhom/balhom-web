import { MonthlyTransactionStatisticsEntity } from "../data/entities/monthly-transaction-statistics-entity";
import { monthlyTransactionStatisticsRepositoryInstance } from "../repositories/repository-instances";
import { fillMonthlyTransactionStatisticsPoints } from "../utils";

export const getMonthlyTransactionStatistics = async (
  currencyProfileId: string,
  year: number
): Promise<MonthlyTransactionStatisticsEntity> => {
  try {
    const monthlyTransactionStatistics =
      await monthlyTransactionStatisticsRepositoryInstance.get(
        currencyProfileId,
        year
      );
    return {
      points: fillMonthlyTransactionStatisticsPoints(
        monthlyTransactionStatistics.points
      ),
      year: monthlyTransactionStatistics.year,
    };
  } catch {
    return {
      points: fillMonthlyTransactionStatisticsPoints([]),
      year: year,
    };
  }
};
