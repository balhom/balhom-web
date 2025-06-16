import { AppError } from "../../../common/data/errors/app-error";
import HttpService from "../../../common/services/http-service";
import {
  DAILY_TRANSACTIONS_STATISTICS_API_SUBPATH,
  STATISTICS_API_PATH,
} from "../data/constants/statistics-api-constants";
import {
  DailyTransactionStatisticResponseRestDto,
  dailyTransactionStatisticResponseRestDtoToEntity,
} from "../data/dtos/daily-transaction-statistic-response-rest.dto";
import { DailyTransactionStatisticsEntity } from "../data/entities/daily-transaction-statistics-entity";

export interface DailyTransactionStatisticsRepository {
  get: (
    currencyProfileId: string,
    month: number,
    year: number
  ) => Promise<DailyTransactionStatisticsEntity>;
}

export const dailyTransactionStatisticsRepository = (
  httpService: HttpService
): DailyTransactionStatisticsRepository => ({
  get: async (
    currencyProfileId: string,
    month: number,
    year: number
  ): Promise<DailyTransactionStatisticsEntity> => {
    try {
      const response = await httpService.getRequest<
        DailyTransactionStatisticResponseRestDto[]
      >(`${STATISTICS_API_PATH}${DAILY_TRANSACTIONS_STATISTICS_API_SUBPATH}`, {
        params: {
          currencyProfileId: currencyProfileId,
          month: month,
          year: year,
        },
      });

      return {
        month: month,
        year: year,
        points: response.map(dailyTransactionStatisticResponseRestDtoToEntity),
      };
    } catch (error) {
      console.log("Error fetching daily transaction statistics: ", error);
      throw new AppError("");
    }
  },
});
