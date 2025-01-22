import { YearlySavingStatisticsEntity } from "../data/entities/yearly-saving-statistics-entity";
import { yearlySavingStatisticsRepositoryInstance } from "../repositories/repository-instances";
import { fillYearlySavingStatisticsPoints } from "../utils";

export const getYearlySavingStatistics =
  async (): Promise<YearlySavingStatisticsEntity> => {
    return (await yearlySavingStatisticsRepositoryInstance.get()).fold(
      () =>
        <YearlySavingStatisticsEntity>{
          points: fillYearlySavingStatisticsPoints([]),
        },
      (yearlySavingStatistics: YearlySavingStatisticsEntity) => {
        return {
          points: fillYearlySavingStatisticsPoints(
            yearlySavingStatistics.points
          ),
        };
      }
    );
  };
