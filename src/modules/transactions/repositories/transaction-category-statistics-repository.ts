import { Either } from "../../../common/data/either";
import { AppError } from "../../../common/data/errors/app-error";
import {
  mockExpenseCategoryStatisticsPoints,
  mockIncomeCategoryStatisticsPoints,
} from "../../../mocks/mock-transaction-category-statistics";
import {
  TransactionCategoryPointEntity,
  TransactionCategoryStatisticsEntity,
} from "../data/entities/transaction-category-statistics-entity";
import { TransactionTypeEnum } from "../data/enums/transaction-type-enum";
import { categoryToImage } from "../utils";

export interface TransactionCategoryStatisticsRepository {
  get: (
    type: TransactionTypeEnum,
    month: number,
    year: number
  ) => Promise<Either<AppError, TransactionCategoryStatisticsEntity>>;
}

export const transactionCategoryStatisticsRepository =
  (): TransactionCategoryStatisticsRepository => ({
    get: async (
      type,
      month,
      year
    ): Promise<Either<AppError, TransactionCategoryStatisticsEntity>> => {
      let points: TransactionCategoryPointEntity[] = [];

      // TODO remove and do api call
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log(month, year);
      if (type === TransactionTypeEnum.Income) {
        points = mockIncomeCategoryStatisticsPoints;
      } else {
        points = mockExpenseCategoryStatisticsPoints;
      }

      return Either.right({
        points: points.map((point) => {
          return {
            category: {
              code: point.category.code,
              image: categoryToImage(point.category.code),
            },
            value: point.value,
          };
        }),
      });
    },
  });
