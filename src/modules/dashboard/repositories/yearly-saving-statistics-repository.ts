import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { mockYearlySavingStatisticsPoints } from "../../../mocks/mock-saving-statistics";
import { YearlySavingStatisticsEntity } from "../data/entities/yearly-saving-statistics-entity";

export interface YearlySavingStatisticsRepository {
  get: () => Promise<Either<AppError, YearlySavingStatisticsEntity>>;
}

export const yearlySavingStatisticsRepository =
  (): YearlySavingStatisticsRepository => ({
    get: async (): Promise<Either<AppError, YearlySavingStatisticsEntity>> => {
      // TODO remove and do api call
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return Either.right({
        points: mockYearlySavingStatisticsPoints,
      });
    },
  });
