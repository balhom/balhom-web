import { AppError } from "../../../common/data/errors/app-error";
import HttpService from "../../../common/services/http-service";
import {
  STATISTICS_API_PATH,
  YEARLY_SAVINGS_STATISTICS_API_SUBPATH,
} from "../data/constants/statistics-api-constants";
import {
  YearlySavingStatisticResponseRestDto,
  yearlySavingStatisticResponseRestDtoToEntity,
} from "../data/dtos/yearly-saving-statistic-response-rest.dto";
import { YearlySavingStatisticsEntity } from "../data/entities/yearly-saving-statistics-entity";

export interface YearlySavingStatisticsRepository {
  get: (currencyProfileId: string) => Promise<YearlySavingStatisticsEntity>;
}

export const yearlySavingStatisticsRepository = (
  httpService: HttpService
): YearlySavingStatisticsRepository => ({
  get: async (
    currencyProfileId: string
  ): Promise<YearlySavingStatisticsEntity> => {
    try {
      const response = await httpService.getRequest<
        YearlySavingStatisticResponseRestDto[]
      >(`${STATISTICS_API_PATH}${YEARLY_SAVINGS_STATISTICS_API_SUBPATH}`, {
        params: {
          currencyProfileId: currencyProfileId,
        },
      });

      return {
        points: response.map(yearlySavingStatisticResponseRestDtoToEntity),
      };
    } catch (error) {
      console.log("Error fetching yearly saving statistics: ", error);
      throw new AppError("");
    }
  },
});
