import { YearlySavingStatisticsEntity } from "../data/entities/yearly-saving-statistics-entity";
import { yearlySavingStatisticsRepositoryInstance } from "../repositories/repository-instances";
import { fillYearlySavingStatisticsPoints } from "../utils";

export const getYearlySavingStatistics = async (
  currencyProfileId: string
): Promise<YearlySavingStatisticsEntity> => {
  try {
    const yearlySavingStatistics =
      await yearlySavingStatisticsRepositoryInstance.get(currencyProfileId);

    return {
      points: fillYearlySavingStatisticsPoints(yearlySavingStatistics.points),
    };
  } catch {
    return {
      points: fillYearlySavingStatisticsPoints([]),
    };
  }
};
