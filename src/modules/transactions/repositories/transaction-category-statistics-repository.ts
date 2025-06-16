import { AppError } from "../../../common/data/errors/app-error";
import HttpService from "../../../common/services/http-service";
import {
  CATEGORY_TRANSACTION_STATISTICS_API_SUBPATH,
  STATISTICS_API_PATH,
} from "../../dashboard/data/constants/statistics-api-constants";
import {
  CategoryTransactionStatisticResponseRestDto,
  categoryTransactionStatisticResponseRestDtoToEntity,
} from "../../dashboard/data/dtos/category-transaction-statistic-response-rest.dto";
import { TransactionCategoryStatisticsEntity } from "../data/entities/transaction-category-statistics-entity";
import { TransactionTypeEnum } from "../data/enums/transaction-type-enum";

export interface TransactionCategoryStatisticsRepository {
  get: (
    currencyProfileId: string,
    type: TransactionTypeEnum,
    month: number,
    year: number
  ) => Promise<TransactionCategoryStatisticsEntity>;
}

export const transactionCategoryStatisticsRepository = (
  httpService: HttpService
): TransactionCategoryStatisticsRepository => ({
  get: async (
    currencyProfileId,
    type,
    month,
    year
  ): Promise<TransactionCategoryStatisticsEntity> => {
    try {
      const response = await httpService.getRequest<
        CategoryTransactionStatisticResponseRestDto[]
      >(
        `${STATISTICS_API_PATH}${CATEGORY_TRANSACTION_STATISTICS_API_SUBPATH}`,
        {
          params: {
            currencyProfileId: currencyProfileId,
            type: type,
            month: month,
            year: year,
          },
        }
      );

      return {
        points: response.map(
          categoryTransactionStatisticResponseRestDtoToEntity
        ),
      };
    } catch (error) {
      console.log("Error fetching transaction category statistics: ", error);
      throw new AppError("");
    }
  },
});
