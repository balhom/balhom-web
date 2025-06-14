import { AppError } from "../../../common/data/errors/app-error";
import HttpService from "../../../common/services/http-service";
import {
  MONTHLY_TRANSACTIONS_STATISTICS_API_SUBPATH,
  STATISTICS_API_PATH,
} from "../data/constants/statistics-api-constants";
import {
  MonthlyTransactionStatisticResponseRestDto,
  monthlyTransactionStatisticResponseRestDtoToEntity,
} from "../data/dtos/monthly-transaction-statistic-response-rest.dto";
import { MonthlyTransactionStatisticsEntity } from "../data/entities/monthly-transaction-statistics-entity";

export interface MonthlyTransactionStatisticsRepository {
  get: (
    currencyProfileId: string,
    year: number
  ) => Promise<MonthlyTransactionStatisticsEntity>;
}

export const monthlyTransactionStatisticsRepository = (
  httpService: HttpService
): MonthlyTransactionStatisticsRepository => ({
  get: async (
    currencyProfileId: string,
    year: number
  ): Promise<MonthlyTransactionStatisticsEntity> => {
    try {
      const response = await httpService.getRequest<
        MonthlyTransactionStatisticResponseRestDto[]
      >(
        `${STATISTICS_API_PATH}${MONTHLY_TRANSACTIONS_STATISTICS_API_SUBPATH}`,
        {
          params: {
            currencyProfileId: currencyProfileId,
            year: year,
          },
        }
      );

      return {
        year: year,
        points: response.map(
          monthlyTransactionStatisticResponseRestDtoToEntity
        ),
      };
    } catch (error) {
      console.log("Error fetching currency profiles: ", error);
      throw new AppError("");
    }
  },
});
