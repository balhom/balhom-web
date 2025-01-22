import { MonthlyTransactionStatisticsEntity } from "../data/entities/monthly-transaction-statistics-entity";
import { monthlyTransactionStatisticsRepositoryInstance } from "../repositories/repository-instances";
import { fillMonthlyTransactionStatisticsPoints } from "../utils";

export const getMonthlyTransactionStatistics = async (
  year: number
): Promise<MonthlyTransactionStatisticsEntity> => {
  return (await monthlyTransactionStatisticsRepositoryInstance.get(year)).fold(
    () =>
      <MonthlyTransactionStatisticsEntity>{
        points: fillMonthlyTransactionStatisticsPoints([]),
        year: year,
      },
    (monthlyTransactionStatistics: MonthlyTransactionStatisticsEntity) => {
      return {
        points: fillMonthlyTransactionStatisticsPoints(
          monthlyTransactionStatistics.points
        ),
        year: monthlyTransactionStatistics.year,
      };
    }
  );
};
