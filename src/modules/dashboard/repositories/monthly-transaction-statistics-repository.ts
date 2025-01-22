import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import { mockMonthlyTransactionStatisticsPoints } from "../../../mocks/mock-transaction-statistics";
import { MonthlyTransactionStatisticsEntity } from "../data/entities/monthly-transaction-statistics-entity";

export interface MonthlyTransactionStatisticsRepository {
  get: (
    year: number
  ) => Promise<Either<AppError, MonthlyTransactionStatisticsEntity>>;
}

export const monthlyTransactionStatisticsRepository =
  (): MonthlyTransactionStatisticsRepository => ({
    get: async (
      year: number
    ): Promise<Either<AppError, MonthlyTransactionStatisticsEntity>> => {
      // TODO remove and do api call
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return Either.right({
        year: year,
        points: mockMonthlyTransactionStatisticsPoints,
      });
    },
  });
