import { YearlySavingPointEntity } from "../entities/yearly-saving-statistics-entity";

export interface YearlySavingStatisticResponseRestDto {
  currencyProfileId: string;
  year: number;
  savings: number;
  goal: number;
}

export function yearlySavingStatisticResponseRestDtoToEntity(
  response: YearlySavingStatisticResponseRestDto
): YearlySavingPointEntity {
  return {
    saving: response.savings,
    goal: response.goal,
    year: response.year,
  };
}
