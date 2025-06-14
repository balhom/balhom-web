import { MonthlySavingStatisticsEntity } from "../data/entities/monthly-saving-statistics-entity";
import { monthlySavingStatisticsRepositoryInstance } from "../repositories/repository-instances";
import { fillMonthlySavingStatisticsPoints } from "../utils";

export const getMonthlySavingStatistics = async (
  currencyProfileId: string,
  year: number
): Promise<MonthlySavingStatisticsEntity> => {
  try {
    const monthlySavingStatistics =
      await monthlySavingStatisticsRepositoryInstance.get(
        currencyProfileId,
        year
      );

    return {
      points: fillMonthlySavingStatisticsPoints(monthlySavingStatistics.points),
      year: monthlySavingStatistics.year,
    };
  } catch {
    return {
      points: fillMonthlySavingStatisticsPoints([]),
      year: year,
    };
  }
};
