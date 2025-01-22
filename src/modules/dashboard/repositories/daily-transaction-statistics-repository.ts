import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { mockDailyTransactionStatisticsPoints } from "../../../mocks/mock-statistics";
import { DailyTransactionStatisticsEntity } from "../data/entities/daily-transaction-statistics-entity";

export interface DailyTransactionStatisticsRepository {
  get: (
    month: number,
    year: number
  ) => Promise<Either<AppError, DailyTransactionStatisticsEntity>>;
}

export const dailyTransactionStatisticsRepository =
  (): DailyTransactionStatisticsRepository => ({
    get: async (
      month: number,
      year: number
    ): Promise<Either<AppError, DailyTransactionStatisticsEntity>> => {
      // TODO remove and do api call
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return Either.right({
        month: month,
        year: year,
        points: mockDailyTransactionStatisticsPoints,
      });
    },
  });
