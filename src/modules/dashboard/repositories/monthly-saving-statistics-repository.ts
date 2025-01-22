import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { mockMonthlySavingStatisticsPoints } from "../../../mocks/mock-saving-statistics";
import { MonthlySavingStatisticsEntity } from "../data/entities/monthly-saving-statistics-entity";

export interface MonthlySavingStatisticsRepository {
  get: (
    year: number
  ) => Promise<Either<AppError, MonthlySavingStatisticsEntity>>;
}

export const monthlySavingStatisticsRepository =
  (): MonthlySavingStatisticsRepository => ({
    get: async (
      year: number
    ): Promise<Either<AppError, MonthlySavingStatisticsEntity>> => {
      // TODO remove and do api call
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return Either.right({
        year: year,
        points: mockMonthlySavingStatisticsPoints,
      });
    },
  });
