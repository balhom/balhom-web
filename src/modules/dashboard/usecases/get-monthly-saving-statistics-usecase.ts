import { MonthlySavingStatisticsEntity } from "../data/entities/monthly-saving-statistics-entity";
import { monthlySavingStatisticsRepositoryInstance } from "../repositories/repository-instances";
import { fillMonthlySavingStatisticsPoints } from "../utils";

export const getMonthlySavingStatistics = async (
  year: number
): Promise<MonthlySavingStatisticsEntity> => {
  return (await monthlySavingStatisticsRepositoryInstance.get(year)).fold(
    () =>
      <MonthlySavingStatisticsEntity>{
        points: fillMonthlySavingStatisticsPoints([]),
        year: year,
      },
    (monthlySavingStatistics: MonthlySavingStatisticsEntity) => {
      return {
        points: fillMonthlySavingStatisticsPoints(
          monthlySavingStatistics.points
        ),
        year: monthlySavingStatistics.year,
      };
    }
  );
};
