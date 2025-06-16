import { AppError } from "../../../common/data/errors/app-error";
import HttpService from "../../../common/services/http-service";
import {
  MONTHLY_SAVINGS_STATISTICS_API_SUBPATH,
  STATISTICS_API_PATH,
} from "../data/constants/statistics-api-constants";
import {
  MonthlySavingStatisticResponseRestDto,
  monthlySavingStatisticResponseRestDtoToEntity,
} from "../data/dtos/monthly-saving-statistic-response-rest.dto";
import { MonthlySavingStatisticsEntity } from "../data/entities/monthly-saving-statistics-entity";

export interface MonthlySavingStatisticsRepository {
  get: (
    currencyProfileId: string,
    year: number
  ) => Promise<MonthlySavingStatisticsEntity>;
}

export const monthlySavingStatisticsRepository = (
  httpService: HttpService
): MonthlySavingStatisticsRepository => ({
  get: async (
    currencyProfileId: string,
    year: number
  ): Promise<MonthlySavingStatisticsEntity> => {
    try {
      const response = await httpService.getRequest<
        MonthlySavingStatisticResponseRestDto[]
      >(`${STATISTICS_API_PATH}${MONTHLY_SAVINGS_STATISTICS_API_SUBPATH}`, {
        params: {
          currencyProfileId: currencyProfileId,
          year: year,
        },
      });

      return {
        year: year,
        points: response.map(monthlySavingStatisticResponseRestDtoToEntity),
      };
    } catch (error) {
      console.log("Error fetching monthly saving statistics: ", error);
      throw new AppError("");
    }
  },
});
